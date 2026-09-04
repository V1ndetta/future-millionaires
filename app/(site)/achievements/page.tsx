import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { getAchievements } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Достижения", description: "Турнирные результаты и истории роста учеников шахматной школы." };

export default async function AchievementsPage() {
  const items = await getAchievements();
  return <><PageHero eyebrow="Достижения" title="Прогресс, который можно измерить" description="Мы ценим медали. Но особенно — путь, который делает ученика сильнее после каждой партии." index="05" /><section className="section dark-section"><div className="container">
    {items.length ? <div className="achievement-list">{items.map((item) => <article className="achievement-row" key={item.id}><div><div className="achievement-result">{item.title}</div><div className="achievement-name">{item.studentName}</div></div><div className="achievement-event">{item.event}<br />{item.place}</div><div>{item.description}</div><time className="achievement-date">{new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "short", year: "numeric" }).format(item.date)}</time></article>)}</div> : <div className="empty-state">Первые результаты сезона скоро появятся.</div>}
  </div></section><section className="section"><div className="container split"><div><p className="eyebrow">Главный результат</p><h2 className="heading-lg">После партии ребёнок спрашивает: «Что я могу улучшить?»</h2></div><div className="feature-image"><Image src="/images/hero-academy.png" alt="Ученик анализирует позицию" fill sizes="(max-width: 980px) 100vw, 50vw" /></div></div></section></>;
}
