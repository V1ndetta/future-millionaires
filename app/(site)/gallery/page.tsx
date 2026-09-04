import type { Metadata } from "next";
import { MediaImage } from "@/components/media-image";
import { PageHero } from "@/components/page-hero";
import { getGallery, getPageContents } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Галерея", description: "Жизнь шахматной школы в фотографиях." };

export default async function GalleryPage() {
  const [images, content] = await Promise.all([getGallery(), getPageContents(["gallery.hero"])]);
  return <><PageHero {...content["gallery.hero"]} index="07" /><section className="section"><div className="container">{images.length ? <div className="gallery-grid">{images.map((item, index) => <figure className="gallery-item" key={item.id}><MediaImage src={item.imageUrl} alt={item.alt} eager={index === 0} sizes="(max-width: 640px) 100vw, 60vw" /><figcaption className="gallery-caption"><span>{item.title}</span><span className="text-muted">{item.category}</span></figcaption></figure>)}</div> : <div className="empty-state">Галерея готовится к публикации.</div>}</div></section></>;
}
