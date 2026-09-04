import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getSchedules } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Расписание", description: "Актуальное расписание занятий в филиалах шахматной школы." };

export default async function SchedulePage() {
  const items = await getSchedules();
  const grouped = Map.groupBy(items, (item) => item.dayOfWeek);
  return <><PageHero eyebrow="Расписание" title="Ритм, который работает" description="Выберите удобный день и филиал. Перед первым посещением администратор подтвердит наличие места." index="04" /><section className="section"><div className="container">
    <div className="schedule-filters"><span className="btn btn-dark btn-small">Все группы</span><span className="btn btn-outline btn-small">Esentai</span><span className="btn btn-outline btn-small">Dostyk</span></div>
    {items.length ? Array.from(grouped).map(([day, rows]) => <section className="schedule-day" key={day}><h2 className="heading-md" style={{ marginBottom: "1.25rem" }}>{day}</h2>{rows.map((row) => <article className="schedule-row" key={row.id}><time className="schedule-time">{row.startTime}—{row.endTime}</time><div><strong>{row.groupName}</strong><div className="text-muted">{row.program.title}</div></div><div>{row.coach.name}</div><div className="text-muted">{row.branch.name}</div><span className="spots">{row.spotsLeft ? `${row.spotsLeft} места` : "лист ожидания"}</span></article>)}</section>) : <div className="empty-state">Расписание уточняется. Оставьте заявку, и мы подберём время.</div>}
    <div style={{ marginTop: "3rem" }}><Link className="btn btn-primary" href="/#trial">Записаться на пробное</Link></div>
  </div></section></>;
}
