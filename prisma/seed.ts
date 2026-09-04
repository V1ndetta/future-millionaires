import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { achievements, branches, coaches, galleryImages, homeStats, newsPosts, pageContents, programs, schedules, siteSettings } from "../lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  const production = process.env.NODE_ENV === "production";
  if (process.env.SEED_DEMO_CONTENT !== "true") {
    throw new Error("Demo seed is disabled. Set SEED_DEMO_CONTENT=true only for an intentional demo environment.");
  }
  if (production && process.env.ALLOW_PRODUCTION_SEED !== "true") {
    throw new Error("Production seed is disabled. Set ALLOW_PRODUCTION_SEED=true only for an intentional one-time seed.");
  }

  const login = process.env.SEED_ADMIN_LOGIN ?? "";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "";
  if (!login || !password || password.length < 12) {
    throw new Error("SEED_ADMIN_LOGIN and a SEED_ADMIN_PASSWORD of at least 12 characters are required.");
  }
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({ where: { login }, update: { passwordHash, name: "Директор школы" }, create: { login, name: "Директор школы", passwordHash } });
  await prisma.siteSettings.upsert({ where: { id: "main" }, update: siteSettings, create: siteSettings });
  for (const content of pageContents) await prisma.pageContent.upsert({ where: { key: content.key }, update: content, create: content });
  for (const stat of homeStats) await prisma.homeStat.upsert({ where: { id: stat.id }, update: stat, create: stat });

  for (const coach of coaches) await prisma.coach.upsert({ where: { id: coach.id }, update: coach, create: coach });
  for (const program of programs) await prisma.program.upsert({ where: { slug: program.slug }, update: program, create: program });
  for (const branch of branches) await prisma.branch.upsert({ where: { id: branch.id }, update: branch, create: branch });
  for (const schedule of schedules) await prisma.schedule.upsert({ where: { id: schedule.id }, update: schedule, create: schedule });
  for (const achievement of achievements) await prisma.studentAchievement.upsert({ where: { id: achievement.id }, update: achievement, create: achievement });
  for (const post of newsPosts) await prisma.newsPost.upsert({ where: { slug: post.slug }, update: post, create: post });
  for (const image of galleryImages) await prisma.galleryImage.upsert({ where: { id: image.id }, update: image, create: image });

  console.log(`Seed complete. Admin login: ${login}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
