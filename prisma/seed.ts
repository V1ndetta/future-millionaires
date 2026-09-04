import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { achievements, branches, coaches, galleryImages, newsPosts, programs, schedules, siteSettings } from "../lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  const login = process.env.SEED_ADMIN_LOGIN ?? "director";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({ where: { login }, update: { passwordHash, name: "Директор школы" }, create: { login, name: "Директор школы", passwordHash } });
  await prisma.siteSettings.upsert({ where: { id: "main" }, update: siteSettings, create: siteSettings });

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
