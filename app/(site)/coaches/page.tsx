import type { Metadata } from "next";
import { CoachCard } from "@/components/coach-card";
import { PageHero } from "@/components/page-hero";
import { getCoaches, getPageContents } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Тренеры", description: "Тренерский состав шахматной школы." };

export default async function CoachesPage() {
  const [items, content] = await Promise.all([getCoaches(), getPageContents(["coaches.hero"])]);
  return <><PageHero {...content["coaches.hero"]} index="02" /><section className="section"><div className="container">{items.length ? <div className="card-grid">{items.map((coach, index) => <CoachCard key={coach.id} coach={coach} eager={index === 0} />)}</div> : <div className="empty-state">Состав тренеров готовится к публикации.</div>}</div></section></>;
}
