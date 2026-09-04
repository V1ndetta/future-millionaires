import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const login = process.env.ADMIN_BOOTSTRAP_LOGIN?.trim();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  const name = process.env.ADMIN_BOOTSTRAP_NAME?.trim() || "Директор школы";

  if (!login || !password || password.length < 12) {
    throw new Error("ADMIN_BOOTSTRAP_LOGIN and ADMIN_BOOTSTRAP_PASSWORD (at least 12 characters) are required.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { login },
    update: { name, passwordHash },
    create: { login, name, passwordHash },
  });
  console.log(`Administrator ${login} is ready.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
