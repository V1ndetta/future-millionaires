import "server-only";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

type RateLimitRow = { count: number; windowStart: Date };

export async function requestFingerprint(scope: string) {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || requestHeaders.get("x-real-ip") || "unknown";
  const salt = process.env.AUTH_SECRET || "development-rate-limit";
  return `${scope}:${createHash("sha256").update(`${salt}:${ip}`).digest("hex")}`;
}

export async function consumeRateLimit(key: string, limit: number, windowMs: number) {
  const now = new Date();
  const cutoff = new Date(now.getTime() - windowMs);
  const rows = await prisma.$queryRaw<RateLimitRow[]>`
    INSERT INTO "RateLimitBucket" ("key", "count", "windowStart", "updatedAt")
    VALUES (${key}, 1, ${now}, ${now})
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN "RateLimitBucket"."windowStart" < ${cutoff} THEN 1
        ELSE "RateLimitBucket"."count" + 1
      END,
      "windowStart" = CASE
        WHEN "RateLimitBucket"."windowStart" < ${cutoff} THEN ${now}
        ELSE "RateLimitBucket"."windowStart"
      END,
      "updatedAt" = ${now}
    RETURNING "count", "windowStart"
  `;
  const bucket = rows[0];
  return {
    allowed: Boolean(bucket && bucket.count <= limit),
    retryAfterSeconds: bucket ? Math.max(1, Math.ceil((bucket.windowStart.getTime() + windowMs - now.getTime()) / 1000)) : 1,
  };
}

export async function resetRateLimit(key: string) {
  await prisma.rateLimitBucket.deleteMany({ where: { key } });
}
