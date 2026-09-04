"use client";

import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const maxSize = 5 * 1024 * 1024;

function safeFilename(name: string) {
  const extension = name.split(".").pop()?.toLowerCase() || "jpg";
  const basename = name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";
  return `${basename.slice(0, 60)}.${extension}`;
}

export function ImageUploadField({ name, label, initialValue, entity, error }: { name: string; label: string; initialValue: string; entity: "coach" | "news" | "achievement" | "gallery"; error?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [localPreview, setLocalPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function removeEphemeral(url: string) {
    if (!url || url === initialValue || !url.includes(".public.blob.vercel-storage.com")) return;
    await fetch("/api/admin/media", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ url }) }).catch(() => undefined);
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setMessage("");
    if (!allowedTypes.includes(file.type)) { setMessage("Поддерживаются JPG, PNG, WebP и AVIF."); return; }
    if (file.size > maxSize) { setMessage("Файл больше 5 МБ. Уменьшите изображение."); return; }
    const preview = URL.createObjectURL(file);
    setLocalPreview(preview);
    setUploading(true);
    try {
      const previous = value;
      const blob = await upload(`media/${entity}/${Date.now()}-${safeFilename(file.name)}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/media",
        clientPayload: JSON.stringify({ entity }),
        contentType: file.type,
      });
      setValue(blob.url);
      await removeEphemeral(previous);
      setMessage("Изображение загружено. Сохраните запись, чтобы применить его.");
    } catch (uploadError) {
      setMessage(uploadError instanceof Error ? uploadError.message : "Не удалось загрузить изображение.");
    } finally {
      setUploading(false);
      URL.revokeObjectURL(preview);
      setLocalPreview("");
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove() {
    const previous = value;
    setValue("");
    setMessage(initialValue === previous ? "Изображение будет удалено после сохранения записи." : "Изображение удалено.");
    await removeEphemeral(previous);
  }

  const preview = localPreview || value;
  return <div className="field field-full image-upload-field">
    <label>{label}</label>
    <input type="hidden" name={name} value={value} />
    <input ref={inputRef} className="sr-only" type="file" accept={allowedTypes.join(",")} onChange={(event) => void handleFile(event.target.files?.[0])} disabled={uploading} />
    <div className="image-upload-shell">
      <div className="image-upload-preview">{preview ? <Image src={preview} alt="Предпросмотр" fill unoptimized sizes="240px" /> : <ImagePlus aria-hidden="true" size={30} />}</div>
      <div className="image-upload-controls">
        <p>JPG, PNG, WebP или AVIF · до 5 МБ</p>
        <div className="admin-actions">
          <button className="btn btn-dark btn-small" type="button" onClick={() => inputRef.current?.click()} disabled={uploading}>{uploading ? <><RefreshCw className="spin" size={15} />Загрузка…</> : <><ImagePlus size={15} />{value ? "Заменить" : "Загрузить"}</>}</button>
          {value ? <button className="btn btn-outline btn-small danger" type="button" onClick={() => void remove()} disabled={uploading}><Trash2 size={15} />Удалить</button> : null}
        </div>
      </div>
    </div>
    {message ? <span className={message.startsWith("Не") || message.startsWith("Файл") || message.startsWith("Поддерживаются") ? "field-error" : "field-hint"}>{message}</span> : null}
    {error ? <span className="field-error">{error}</span> : null}
  </div>;
}
