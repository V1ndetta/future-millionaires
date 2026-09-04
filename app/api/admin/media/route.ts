import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminUser } from "@/lib/auth";
import { deleteManagedBlob, IMAGE_TYPES, isManagedBlobUrl, MAX_IMAGE_SIZE } from "@/lib/media";

const uploadPayloadSchema = z.object({
  entity: z.enum(["coach", "news", "achievement", "gallery"]),
});

const deleteSchema = z.object({ url: z.string().url() });

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Недопустимый источник запроса." }, { status: 403 });

  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const admin = await getAdminUser();
        if (!admin) throw new Error("UNAUTHORIZED");
        const payload = uploadPayloadSchema.safeParse(JSON.parse(clientPayload || "{}"));
        if (!payload.success) throw new Error("INVALID_UPLOAD_TARGET");
        if (!pathname.startsWith(`media/${payload.data.entity}/`) || pathname.includes("..")) throw new Error("INVALID_UPLOAD_PATH");
        return {
          allowedContentTypes: [...IMAGE_TYPES],
          maximumSizeInBytes: MAX_IMAGE_SIZE,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ entity: payload.data.entity, adminId: admin.id }),
        };
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "UPLOAD_ERROR";
    const status = message === "UNAUTHORIZED" ? 401 : 400;
    return NextResponse.json({ error: status === 401 ? "Требуется вход в админ-панель." : "Не удалось загрузить изображение." }, { status });
  }
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Недопустимый источник запроса." }, { status: 403 });
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Требуется вход в админ-панель." }, { status: 401 });

  const parsed = deleteSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !isManagedBlobUrl(parsed.data.url)) {
    return NextResponse.json({ error: "Некорректный URL изображения." }, { status: 400 });
  }
  try {
    await deleteManagedBlob(parsed.data.url);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Не удалось удалить изображение из хранилища." }, { status: 500 });
  }
}
