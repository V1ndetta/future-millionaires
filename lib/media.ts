import "server-only";

import { del } from "@vercel/blob";

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"] as const;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function isManagedBlobUrl(value: string | null | undefined) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export function isSafeImageUrl(value: string | null | undefined) {
  if (!value) return true;
  return value.startsWith("/images/") || isManagedBlobUrl(value);
}

export async function deleteManagedBlob(value: string | null | undefined) {
  if (!isManagedBlobUrl(value) || !process.env.BLOB_READ_WRITE_TOKEN) return;
  await del(value!);
}
