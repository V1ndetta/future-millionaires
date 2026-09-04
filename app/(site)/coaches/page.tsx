import type { Metadata } from "next";
import { CoachCard } from "@/components/coach-card";
import { PageHero } from "@/components/page-hero";
import { getCoaches } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Тренеры", description: "Тренеры шахматной школы: международные мастера, турнирные наставники и педагоги младших групп." };

export default async function CoachesPage() {
  const items = await getCoaches();
  return <><PageHero eyebrow="Команда" title="Требовательные. Внимательные. Настоящие." description="Наши тренеры умеют побеждать — и, что важнее, умеют передавать способ мышления." index="02" /><section className="section"><div className="container">{items.length ? <div className="card-grid">{items.map((coach, index) => <CoachCard key={coach.id} coach={coach} eager={index === 0} />)}</div> : <div className="empty-state">Скоро здесь появится состав тренеров.</div>}</div></section></>;
}
