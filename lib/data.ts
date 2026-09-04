import "server-only";
import { cache } from "react";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  achievements,
  branches,
  coaches,
  galleryImages,
  homeStats,
  newsPosts,
  pageContents,
  programs,
  schedules,
  siteSettings,
} from "@/lib/demo-data";
import { emptyPageContent, type ContentKey, type EditablePageContent } from "@/lib/content-config";

const useDemoContent = process.env.NODE_ENV !== "production";

const emptySettings = {
  id: "main",
  schoolName: "Будущие миллионеры",
  shortName: "БМ",
  tagline: "Шахматная школа",
  description: "",
  city: "",
  country: "",
  phone: "",
  email: "",
  address: "",
  telegram: null,
  instagram: null,
  whatsapp: null,
  foundedYear: new Date().getFullYear(),
  studentsCount: 0,
  updatedAt: new Date(0),
};

function databaseFallback<T>(fallback: T, error: unknown): T {
  if (useDemoContent) return fallback;
  throw error;
}

export const getSiteSettings = cache(async function getSiteSettings() {
  try {
    return (await prisma.siteSettings.findUnique({ where: { id: "main" } })) ?? (useDemoContent ? siteSettings : emptySettings);
  } catch (error) {
    return databaseFallback(siteSettings, error);
  }
});

export async function getPageContents(keys: ContentKey[], admin = false): Promise<Record<ContentKey, EditablePageContent>> {
  if (admin) await requireAdmin();
  let records: { key: string; eyebrow: string; title: string; description: string; body: string; ctaText: string }[];
  try {
    records = await prisma.pageContent.findMany({ where: { key: { in: keys } } });
  } catch (error) {
    records = databaseFallback(pageContents.filter((item) => keys.includes(item.key as ContentKey)), error);
  }

  const byKey = new Map(records.map(({ key, ...record }) => [key, { contentKey: key, ...record }]));
  return Object.fromEntries(keys.map((key) => {
    const demo = useDemoContent ? pageContents.find((item) => item.key === key) : undefined;
    const demoContent = demo ? { contentKey: demo.key, eyebrow: demo.eyebrow, title: demo.title, description: demo.description, body: demo.body, ctaText: demo.ctaText } : undefined;
    return [key, byKey.get(key) ?? demoContent ?? emptyPageContent(key)];
  })) as Record<ContentKey, EditablePageContent>;
}

export async function getHomeStats(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.homeStat.findMany({ where: all ? {} : { isPublished: true }, orderBy: { order: "asc" } });
  } catch (error) {
    return databaseFallback(homeStats, error);
  }
}

export async function getCoaches(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.coach.findMany({ where: all ? {} : { isPublished: true }, orderBy: { order: "asc" } });
  } catch (error) {
    return databaseFallback(coaches, error);
  }
}

export async function getPrograms(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.program.findMany({ where: all ? {} : { isPublished: true }, orderBy: { order: "asc" } });
  } catch (error) {
    return databaseFallback(programs, error);
  }
}

export async function getBranches(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.branch.findMany({ where: all ? {} : { isPublished: true }, orderBy: { order: "asc" } });
  } catch (error) {
    return databaseFallback(branches, error);
  }
}

export type ScheduleView = {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  groupName: string;
  spotsLeft: number;
  coachId: string;
  programId: string;
  branchId: string;
  coach: { id: string; name: string };
  program: { id: string; title: string };
  branch: { id: string; name: string };
};

export async function getSchedules(all = false): Promise<ScheduleView[]> {
  if (all) await requireAdmin();
  try {
    return await prisma.schedule.findMany({
      where: all ? {} : { coach: { isPublished: true }, program: { isPublished: true }, branch: { isPublished: true } },
      include: { coach: true, program: true, branch: true },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    });
  } catch (error) {
    return databaseFallback(schedules.map((schedule) => ({
      ...schedule,
      coach: coaches.find((item) => item.id === schedule.coachId)!,
      program: programs.find((item) => item.id === schedule.programId)!,
      branch: branches.find((item) => item.id === schedule.branchId)!,
    })), error);
  }
}

export async function getAchievements(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.studentAchievement.findMany({ where: all ? {} : { isPublished: true }, orderBy: [{ order: "asc" }, { date: "desc" }] });
  } catch (error) {
    return databaseFallback(achievements, error);
  }
}

export async function getNews(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.newsPost.findMany({ where: all ? {} : { isPublished: true }, orderBy: { publishedAt: "desc" } });
  } catch (error) {
    return databaseFallback(newsPosts, error);
  }
}

export async function getNewsPost(slug: string) {
  try {
    return await prisma.newsPost.findFirst({ where: { slug, isPublished: true } });
  } catch (error) {
    return databaseFallback(newsPosts.find((post) => post.slug === slug) ?? null, error);
  }
}

export async function getGallery(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.galleryImage.findMany({ where: all ? {} : { isPublished: true }, orderBy: { order: "asc" } });
  } catch (error) {
    return databaseFallback(galleryImages, error);
  }
}

export async function getLeads() {
  await requireAdmin();
  try {
    return await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}
