import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { getGallery } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Галерея", description: "Занятия, турниры и жизнь шахматной школы в фотографиях." };

export default async function GalleryPage() {
  const images = await getGallery();
  return <><PageHero eyebrow="Галерея" title="Концентрация выглядит именно так" description="Занятия, клубные вечера и турниры без постановки — моменты, в которых рождается игра." index="07" /><section className="section"><div className="container">{images.length ? <div className="gallery-grid">{images.map((item, index) => <figure className="gallery-item" key={item.id}><Image src={item.imageUrl} alt={item.alt} fill loading={index === 0 ? "eager" : undefined} sizes="(max-width: 640px) 100vw, 60vw" /><figcaption className="gallery-caption"><span>{item.title}</span><span className="text-muted">{item.category}</span></figcaption></figure>)}</div> : <div className="empty-state">Галерея скоро будет опубликована.</div>}</div></section></>;
}
