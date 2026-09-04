import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return ["", "/about", "/coaches", "/programs", "/schedule", "/achievements", "/news", "/gallery", "/contacts"].map((path) => ({ url: `${base}${path}`, changeFrequency: path === "/news" ? "weekly" : "monthly", priority: path === "" ? 1 : .7 }));
}
