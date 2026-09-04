"use server";

import { LeadStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { contentBlueprints } from "@/lib/content-config";
import { deleteManagedBlob, isSafeImageUrl } from "@/lib/media";
import { prisma } from "@/lib/prisma";

export type AdminActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export const initialAdminState: AdminActionState = { status: "idle" };

const text = (label: string, max = 500) => z.string().trim().min(1, `${label}: заполните поле`).max(max, `${label}: слишком длинное значение`);
const optionalText = (max = 1000) => z.string().trim().max(max).optional().default("");
const integer = (label: string, min = 0, max = 100000) => z.coerce.number().int(`${label}: укажите целое число`).min(min).max(max);
const checkbox = z.preprocess((value) => value === "on" || value === "true", z.boolean());
const id = z.string().trim().min(1).max(100);
const slug = z.string().trim().min(2, "Slug слишком короткий").max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Используйте строчные латинские буквы, цифры и дефисы");
const date = z.string().trim().min(1, "Укажите дату").refine((value) => !Number.isNaN(Date.parse(value)), "Некорректная дата").transform((value) => new Date(value));
const time = z.string().trim().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Используйте формат ЧЧ:ММ");
const imageUrl = z.string().trim().max(2048).refine(isSafeImageUrl, "Загрузите изображение через защищённое хранилище").transform((value) => value || null);
const optionalWebUrl = z.string().trim().max(2048).refine((value) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || (process.env.NODE_ENV !== "production" && url.protocol === "http:");
  } catch {
    return false;
  }
}, "Укажите корректный HTTPS URL").transform((value) => value || null);

const coachSchema = z.object({
  name: text("Имя", 120), role: text("Роль", 120), rank: text("Звание", 160), bio: text("Биография", 3000), imageUrl,
  experience: integer("Опыт", 0, 80), achievements: text("Достижения", 1000), order: integer("Порядок", 0, 10000), isPublished: checkbox,
});
const programSchema = z.object({
  title: text("Название", 160), slug, ageRange: text("Возраст", 80), level: text("Уровень", 120), description: text("Описание", 2000),
  duration: text("Режим занятий", 160), price: text("Стоимость", 120), accent: z.enum(["lime", "blue", "red"]), order: integer("Порядок", 0, 10000), isPublished: checkbox,
});
const branchSchema = z.object({
  name: text("Название", 160), address: text("Адрес", 300), district: text("Район", 160), phone: text("Телефон", 40), hours: text("Часы работы", 160),
  mapUrl: optionalWebUrl, order: integer("Порядок", 0, 10000), isPublished: checkbox,
});
const scheduleSchema = z.object({
  dayOfWeek: z.enum(["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]),
  startTime: time, endTime: time, groupName: text("Группа", 160), spotsLeft: integer("Свободные места", 0, 1000), coachId: id, programId: id, branchId: id,
}).superRefine((value, context) => {
  if (value.startTime >= value.endTime) context.addIssue({ code: "custom", path: ["endTime"], message: "Окончание должно быть позже начала" });
});
const achievementSchema = z.object({
  studentName: text("Ученик", 160), title: text("Результат", 160), event: text("Событие", 240), date, place: text("Место", 160), imageUrl,
  description: text("Описание", 2000), order: integer("Порядок", 0, 10000), isPublished: checkbox,
});
const newsSchema = z.object({
  title: text("Заголовок", 240), slug, excerpt: text("Анонс", 1000), content: text("Текст", 15000), category: text("Категория", 80), imageUrl,
  publishedAt: date, isPublished: checkbox,
});
const gallerySchema = z.object({
  title: text("Название", 200), alt: text("Описание изображения", 300), imageUrl, category: text("Категория", 100), order: integer("Порядок", 0, 10000), isPublished: checkbox,
});
const homeStatSchema = z.object({ value: text("Значение", 24), label: text("Подпись", 240), order: integer("Порядок", 0, 10000), isPublished: checkbox });

const settingsSchema = z.object({
  schoolName: text("Название", 160), shortName: text("Короткое название", 20), tagline: text("Подпись", 160), description: text("Описание", 2000),
  city: text("Город", 120), country: text("Страна", 120), phone: text("Телефон", 40), email: z.string().trim().email("Некорректный email").max(200),
  address: text("Адрес", 300), telegram: optionalWebUrl, instagram: optionalWebUrl, whatsapp: optionalWebUrl,
  foundedYear: integer("Год основания", 1800, 2200), studentsCount: integer("Количество учеников", 0, 1000000),
});

const pageContentKeys = new Set(contentBlueprints.map((item) => item.key));
const pageContentSchema = z.object({
  key: z.string().refine((value) => pageContentKeys.has(value as never), "Неизвестный блок страницы"),
  eyebrow: optionalText(160), title: optionalText(300), description: optionalText(3000), body: optionalText(10000), ctaText: optionalText(120),
});

function formObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

function validationError(error: z.ZodError): AdminActionState {
  return { status: "error", message: "Проверьте отмеченные поля.", fieldErrors: error.flatten().fieldErrors };
}

function mutationError(error: unknown): AdminActionState {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return { status: "error", message: "Запись с таким slug или уникальным значением уже существует." };
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
    return { status: "error", message: "Сначала выберите существующие связанные записи." };
  }
  return { status: "error", message: "Не удалось сохранить изменения. Повторите попытку." };
}

function refreshAll() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

async function cleanupReplacedImage(previous: string | null | undefined, next: string | null | undefined) {
  if (previous && previous !== next) await deleteManagedBlob(previous).catch(() => undefined);
}

async function deleteRecord(entity: string, recordId: string) {
  let previousImage: string | null | undefined;
  if (entity === "coach") { previousImage = (await prisma.coach.findUnique({ where: { id: recordId }, select: { imageUrl: true } }))?.imageUrl; await prisma.coach.delete({ where: { id: recordId } }); }
  else if (entity === "program") await prisma.program.delete({ where: { id: recordId } });
  else if (entity === "branch") await prisma.branch.delete({ where: { id: recordId } });
  else if (entity === "schedule") await prisma.schedule.delete({ where: { id: recordId } });
  else if (entity === "achievement") { previousImage = (await prisma.studentAchievement.findUnique({ where: { id: recordId }, select: { imageUrl: true } }))?.imageUrl; await prisma.studentAchievement.delete({ where: { id: recordId } }); }
  else if (entity === "news") { previousImage = (await prisma.newsPost.findUnique({ where: { id: recordId }, select: { imageUrl: true } }))?.imageUrl; await prisma.newsPost.delete({ where: { id: recordId } }); }
  else if (entity === "gallery") { previousImage = (await prisma.galleryImage.findUnique({ where: { id: recordId }, select: { imageUrl: true } }))?.imageUrl; await prisma.galleryImage.delete({ where: { id: recordId } }); }
  else if (entity === "homeStat") await prisma.homeStat.delete({ where: { id: recordId } });
  else throw new Error("UNKNOWN_ENTITY");
  await cleanupReplacedImage(previousImage, null);
}

export async function adminMutation(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const intent = z.string().regex(/^(create|update|delete):(coach|program|branch|schedule|achievement|news|gallery|homeStat)$/).safeParse(formData.get("_intent"));
  const recordId = z.string().trim().max(100).safeParse(formData.get("id") || "");
  if (!intent.success) return { status: "error", message: "Неизвестная операция." };
  const [operation, entity] = intent.data.split(":") as [string, string];
  const entityId = recordId.success ? recordId.data : "";
  if (operation !== "create" && !entityId) return { status: "error", message: "Запись не найдена." };

  try {
    if (operation === "delete") {
      await deleteRecord(entity, entityId);
      refreshAll();
      return { status: "success", message: "Запись удалена." };
    }

    const raw = formObject(formData);
    if (entity === "coach") {
      const parsed = coachSchema.safeParse(raw); if (!parsed.success) return validationError(parsed.error);
      const previous = operation === "update" ? await prisma.coach.findUnique({ where: { id: entityId }, select: { imageUrl: true } }) : null;
      if (operation === "create") await prisma.coach.create({ data: parsed.data }); else await prisma.coach.update({ where: { id: entityId }, data: parsed.data });
      await cleanupReplacedImage(previous?.imageUrl, parsed.data.imageUrl);
    } else if (entity === "program") {
      const parsed = programSchema.safeParse(raw); if (!parsed.success) return validationError(parsed.error);
      if (operation === "create") await prisma.program.create({ data: parsed.data }); else await prisma.program.update({ where: { id: entityId }, data: parsed.data });
    } else if (entity === "branch") {
      const parsed = branchSchema.safeParse(raw); if (!parsed.success) return validationError(parsed.error);
      if (operation === "create") await prisma.branch.create({ data: parsed.data }); else await prisma.branch.update({ where: { id: entityId }, data: parsed.data });
    } else if (entity === "schedule") {
      const parsed = scheduleSchema.safeParse(raw); if (!parsed.success) return validationError(parsed.error);
      if (operation === "create") await prisma.schedule.create({ data: parsed.data }); else await prisma.schedule.update({ where: { id: entityId }, data: parsed.data });
    } else if (entity === "achievement") {
      const parsed = achievementSchema.safeParse(raw); if (!parsed.success) return validationError(parsed.error);
      const previous = operation === "update" ? await prisma.studentAchievement.findUnique({ where: { id: entityId }, select: { imageUrl: true } }) : null;
      if (operation === "create") await prisma.studentAchievement.create({ data: parsed.data }); else await prisma.studentAchievement.update({ where: { id: entityId }, data: parsed.data });
      await cleanupReplacedImage(previous?.imageUrl, parsed.data.imageUrl);
    } else if (entity === "news") {
      const parsed = newsSchema.safeParse(raw); if (!parsed.success) return validationError(parsed.error);
      const previous = operation === "update" ? await prisma.newsPost.findUnique({ where: { id: entityId }, select: { imageUrl: true } }) : null;
      if (operation === "create") await prisma.newsPost.create({ data: parsed.data }); else await prisma.newsPost.update({ where: { id: entityId }, data: parsed.data });
      await cleanupReplacedImage(previous?.imageUrl, parsed.data.imageUrl);
    } else if (entity === "gallery") {
      const parsed = gallerySchema.safeParse(raw); if (!parsed.success) return validationError(parsed.error);
      const previous = operation === "update" ? await prisma.galleryImage.findUnique({ where: { id: entityId }, select: { imageUrl: true } }) : null;
      if (operation === "create") await prisma.galleryImage.create({ data: parsed.data }); else await prisma.galleryImage.update({ where: { id: entityId }, data: parsed.data });
      await cleanupReplacedImage(previous?.imageUrl, parsed.data.imageUrl);
    } else if (entity === "homeStat") {
      const parsed = homeStatSchema.safeParse(raw); if (!parsed.success) return validationError(parsed.error);
      if (operation === "create") await prisma.homeStat.create({ data: parsed.data }); else await prisma.homeStat.update({ where: { id: entityId }, data: parsed.data });
    }
    refreshAll();
    return { status: "success", message: operation === "create" ? "Запись создана." : "Изменения сохранены." };
  } catch (error) {
    return mutationError(error);
  }
}

export async function updateLeadStatus(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = z.object({ id, status: z.nativeEnum(LeadStatus) }).safeParse(formObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  try {
    await prisma.lead.update({ where: { id: parsed.data.id }, data: { status: parsed.data.status } });
    revalidatePath("/admin/leads");
    return { status: "success", message: "Статус обновлён." };
  } catch (error) {
    return mutationError(error);
  }
}

export async function updateSettings(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = settingsSchema.safeParse(formObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  try {
    await prisma.siteSettings.upsert({ where: { id: "main" }, update: parsed.data, create: { id: "main", ...parsed.data } });
    refreshAll();
    return { status: "success", message: "Настройки сайта сохранены." };
  } catch (error) {
    return mutationError(error);
  }
}

export async function updatePageContent(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = pageContentSchema.safeParse(formObject(formData));
  if (!parsed.success) return validationError(parsed.error);
  try {
    const { key, ...data } = parsed.data;
    await prisma.pageContent.upsert({ where: { key }, update: data, create: { key, ...data } });
    refreshAll();
    return { status: "success", message: "Текстовый блок сохранён." };
  } catch (error) {
    return mutationError(error);
  }
}
