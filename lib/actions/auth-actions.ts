"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminSession, clearAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit, requestFingerprint, resetRateLimit } from "@/lib/rate-limit";

export type AuthState = { error?: string };

const credentialsSchema = z.object({
  login: z.string().trim().min(3).max(80),
  password: z.string().min(8).max(200),
});

const DUMMY_HASH = "$2b$12$7Jq4H4qdLiXKD0KIYCh3.OJHw4QNB5qAlTxWELFrQCZ6q8TZnTdse";

export async function loginAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const rateLimitKey = await requestFingerprint("admin-login");
  try {
    const rateLimit = await consumeRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) return { error: `Слишком много попыток. Повторите через ${Math.ceil(rateLimit.retryAfterSeconds / 60)} мин.` };
  } catch {
    return { error: "Сервис авторизации временно недоступен." };
  }

  const parsed = credentialsSchema.safeParse({ login: formData.get("login"), password: formData.get("password") });
  if (!parsed.success) return { error: "Проверьте логин и пароль." };

  let user = null;
  try {
    user = await prisma.adminUser.findUnique({ where: { login: parsed.data.login } });
  } catch {
    return { error: "База данных недоступна. Проверьте DATABASE_URL и миграции." };
  }

  const valid = await bcrypt.compare(parsed.data.password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !valid) return { error: "Неверный логин или пароль." };

  await resetRateLimit(rateLimitKey);
  await createAdminSession(user.id);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
