"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit, requestFingerprint } from "@/lib/rate-limit";

export type LeadState = { status: "idle" | "success" | "error"; message?: string; fieldErrors?: Record<string, string[]> };

const levels = ["Не играл раньше", "Знает правила", "Есть турнирный опыт", "Есть рейтинг FIDE"] as const;

const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(7, "Укажите телефон").max(30).refine((value) => value.replace(/\D/g, "").length >= 7 && value.replace(/\D/g, "").length <= 15, "Проверьте номер телефона"),
  studentAge: z.coerce.number().int().min(4).max(99),
  level: z.enum(levels),
  program: z.string().trim().min(1),
  comment: z.string().trim().max(1000).optional(),
  website: z.string().max(0).optional(),
});

export async function submitLead(_: LeadState, formData: FormData): Promise<LeadState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    studentAge: formData.get("studentAge"),
    level: formData.get("level"),
    program: formData.get("program"),
    comment: formData.get("comment") || undefined,
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) return { status: "error", message: "Проверьте отмеченные поля.", fieldErrors: parsed.error.flatten().fieldErrors };

  try {
    const rateLimitKey = await requestFingerprint("public-lead");
    const rateLimit = await consumeRateLimit(rateLimitKey, 5, 60 * 60 * 1000);
    if (!rateLimit.allowed) return { status: "error", message: "Слишком много заявок с этого устройства. Попробуйте позже или свяжитесь со школой напрямую." };

    const programExists = await prisma.program.count({ where: { title: parsed.data.program, isPublished: true } });
    if (!programExists) return { status: "error", message: "Выбранная программа больше недоступна. Обновите страницу." };

    const { website: _website, ...lead } = parsed.data;
    void _website;
    await prisma.lead.create({ data: lead });
    const content = await prisma.pageContent.findUnique({ where: { key: "home.trial" }, select: { body: true } });
    return { status: "success", message: content?.body || "Заявка принята. Мы свяжемся с вами." };
  } catch {
    return { status: "error", message: "Не удалось сохранить заявку. Попробуйте ещё раз или свяжитесь со школой напрямую." };
  }
}
