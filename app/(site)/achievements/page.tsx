import type { Metadata } from "next";
import Image from "next/image";
import { MediaImage } from "@/components/media-image";
import { PageHero } from "@/components/page-hero";
import { getAchievements, getPageContents } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Достижения", description: "Результаты и истории роста учеников шахматной школы." };

export default async function AchievementsPage() {
  const [items, content] = await Promise.all([getAchievements(), getPageContents(["achievements.hero", "achievements.feature"])]);
  const feature = content["achievements.feature"];
  return <>
    <PageHero {...content["achievements.hero"]} index="05" />
    <section className="section dark-section"><div className="container">
      {items.length ? <div className="achievement-list">{items.map((item) => <article className="achievement-row" key={item.id}>
        <div className="achievement-primary">{item.imageUrl ? <div className="achievement-thumb"><MediaImage src={item.imageUrl} alt={item.studentName} sizes="80px" /></div> : null}<div><div className="achievement-result">{item.title}</div><div className="achievement-name">{item.studentName}</div></div></div>
        <div className="achievement-event">{item.event}<br />{item.place}</div><div>{item.description}</div><time className="achievement-date">{new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "short", year: "numeric" }).format(item.date)}</time>
      </article>)}</div> : <div className="empty-state">Результаты готовятся к публикации.</div>}
    </div></section>
    <section className="section"><div className="container split"><div><p className="eyebrow">{feature.eyebrow}</p><h2 className="heading-lg">{feature.title}</h2>{feature.description ? <p className="lede section-copy">{feature.description}</p> : null}</div><div className="feature-image"><Image src="/images/hero-academy.png" alt="Анализ шахматной позиции" fill sizes="(max-width: 980px) 100vw, 50vw" /></div></div></section>
  </>;
}
