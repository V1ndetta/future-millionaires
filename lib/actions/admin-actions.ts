"use server";

import { LeadStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const int = (form: FormData, key: string, fallback = 0) => Number.parseInt(text(form, key), 10) || fallback;
const bool = (form: FormData, key: string) => form.get(key) === "on" || form.get(key) === "true";

function refreshAll() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function adminMutation(formData: FormData) {
  await requireAdmin();
  const [operation, entity] = text(formData, "_intent").split(":");
  const id = text(formData, "id");

  if (operation === "delete") {
    if (!id) return;
    if (entity === "coach") await prisma.coach.delete({ where: { id } });
    if (entity === "program") await prisma.program.delete({ where: { id } });
    if (entity === "branch") await prisma.branch.delete({ where: { id } });
    if (entity === "schedule") await prisma.schedule.delete({ where: { id } });
    if (entity === "achievement") await prisma.studentAchievement.delete({ where: { id } });
    if (entity === "news") await prisma.newsPost.delete({ where: { id } });
    if (entity === "gallery") await prisma.galleryImage.delete({ where: { id } });
    refreshAll();
    return;
  }

  const dataByEntity = {
    coach: {
      name: text(formData, "name"), role: text(formData, "role"), rank: text(formData, "rank"), bio: text(formData, "bio"), imageUrl: text(formData, "imageUrl"), experience: int(formData, "experience"), achievements: text(formData, "achievements"), order: int(formData, "order"), isPublished: bool(formData, "isPublished"),
    },
    program: {
      title: text(formData, "title"), slug: text(formData, "slug"), ageRange: text(formData, "ageRange"), level: text(formData, "level"), description: text(formData, "description"), duration: text(formData, "duration"), price: text(formData, "price"), accent: text(formData, "accent") || "lime", order: int(formData, "order"), isPublished: bool(formData, "isPublished"),
    },
    branch: {
      name: text(formData, "name"), address: text(formData, "address"), district: text(formData, "district"), phone: text(formData, "phone"), hours: text(formData, "hours"), mapUrl: text(formData, "mapUrl") || null, order: int(formData, "order"), isPublished: bool(formData, "isPublished"),
    },
    schedule: {
      dayOfWeek: text(formData, "dayOfWeek"), startTime: text(formData, "startTime"), endTime: text(formData, "endTime"), groupName: text(formData, "groupName"), spotsLeft: int(formData, "spotsLeft"), coachId: text(formData, "coachId"), programId: text(formData, "programId"), branchId: text(formData, "branchId"),
    },
    achievement: {
      studentName: text(formData, "studentName"), title: text(formData, "title"), event: text(formData, "event"), date: new Date(text(formData, "date")), place: text(formData, "place"), imageUrl: text(formData, "imageUrl") || null, description: text(formData, "description"), order: int(formData, "order"), isPublished: bool(formData, "isPublished"),
    },
    news: {
      title: text(formData, "title"), slug: text(formData, "slug"), excerpt: text(formData, "excerpt"), content: text(formData, "content"), category: text(formData, "category"), imageUrl: text(formData, "imageUrl"), publishedAt: new Date(text(formData, "publishedAt")), isPublished: bool(formData, "isPublished"),
    },
    gallery: {
      title: text(formData, "title"), alt: text(formData, "alt"), imageUrl: text(formData, "imageUrl"), category: text(formData, "category"), order: int(formData, "order"), isPublished: bool(formData, "isPublished"),
    },
  };

  if (!(entity in dataByEntity)) return;

  if (entity === "coach") { if (operation === "create") await prisma.coach.create({ data: dataByEntity.coach }); else await prisma.coach.update({ where: { id }, data: dataByEntity.coach }); }
  if (entity === "program") { if (operation === "create") await prisma.program.create({ data: dataByEntity.program }); else await prisma.program.update({ where: { id }, data: dataByEntity.program }); }
  if (entity === "branch") { if (operation === "create") await prisma.branch.create({ data: dataByEntity.branch }); else await prisma.branch.update({ where: { id }, data: dataByEntity.branch }); }
  if (entity === "schedule") { if (operation === "create") await prisma.schedule.create({ data: dataByEntity.schedule }); else await prisma.schedule.update({ where: { id }, data: dataByEntity.schedule }); }
  if (entity === "achievement") { if (operation === "create") await prisma.studentAchievement.create({ data: dataByEntity.achievement }); else await prisma.studentAchievement.update({ where: { id }, data: dataByEntity.achievement }); }
  if (entity === "news") { if (operation === "create") await prisma.newsPost.create({ data: dataByEntity.news }); else await prisma.newsPost.update({ where: { id }, data: dataByEntity.news }); }
  if (entity === "gallery") { if (operation === "create") await prisma.galleryImage.create({ data: dataByEntity.gallery }); else await prisma.galleryImage.update({ where: { id }, data: dataByEntity.gallery }); }
  refreshAll();
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const status = text(formData, "status") as LeadStatus;
  if (!Object.values(LeadStatus).includes(status)) return;
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  const data = {
    schoolName: text(formData, "schoolName"), shortName: text(formData, "shortName"), tagline: text(formData, "tagline"), description: text(formData, "description"), phone: text(formData, "phone"), email: text(formData, "email"), address: text(formData, "address"), telegram: text(formData, "telegram") || null, instagram: text(formData, "instagram") || null, whatsapp: text(formData, "whatsapp") || null, foundedYear: int(formData, "foundedYear"), studentsCount: int(formData, "studentsCount"),
  };
  await prisma.siteSettings.upsert({ where: { id: "main" }, update: data, create: { id: "main", ...data } });
  refreshAll();
}
