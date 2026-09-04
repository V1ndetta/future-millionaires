import "server-only";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  achievements,
  branches,
  coaches,
  galleryImages,
  newsPosts,
  programs,
  schedules,
  siteSettings,
} from "@/lib/demo-data";

export async function getSiteSettings() {
  try {
    return (await prisma.siteSettings.findUnique({ where: { id: "main" } })) ?? siteSettings;
  } catch {
    return siteSettings;
  }
}

export async function getCoaches(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.coach.findMany({ where: all ? {} : { isPublished: true }, orderBy: { order: "asc" } });
  } catch {
    return coaches;
  }
}

export async function getPrograms(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.program.findMany({ where: all ? {} : { isPublished: true }, orderBy: { order: "asc" } });
  } catch {
    return programs;
  }
}

export async function getBranches(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.branch.findMany({ where: all ? {} : { isPublished: true }, orderBy: { order: "asc" } });
  } catch {
    return branches;
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

export async function getSchedules(): Promise<ScheduleView[]> {
  try {
    return await prisma.schedule.findMany({ include: { coach: true, program: true, branch: true }, orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }] });
  } catch {
    return schedules.map((schedule) => ({
      ...schedule,
      coach: coaches.find((item) => item.id === schedule.coachId)!,
      program: programs.find((item) => item.id === schedule.programId)!,
      branch: branches.find((item) => item.id === schedule.branchId)!,
    }));
  }
}

export async function getAchievements(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.studentAchievement.findMany({ where: all ? {} : { isPublished: true }, orderBy: [{ order: "asc" }, { date: "desc" }] });
  } catch {
    return achievements;
  }
}

export async function getNews(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.newsPost.findMany({ where: all ? {} : { isPublished: true }, orderBy: { publishedAt: "desc" } });
  } catch {
    return newsPosts;
  }
}

export async function getNewsPost(slug: string) {
  try {
    return await prisma.newsPost.findFirst({ where: { slug, isPublished: true } });
  } catch {
    return newsPosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getGallery(all = false) {
  if (all) await requireAdmin();
  try {
    return await prisma.galleryImage.findMany({ where: all ? {} : { isPublished: true }, orderBy: { order: "asc" } });
  } catch {
    return galleryImages;
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
