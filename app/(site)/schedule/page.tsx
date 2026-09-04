import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getPageContents, getSchedules } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Расписание", description: "Актуальное расписание занятий шахматной школы." };

export default async function SchedulePage() {
  const [items, content] = await Promise.all([getSchedules(), getPageContents(["schedule.hero"])]);
  const grouped = Map.groupBy(items, (item) => item.dayOfWeek);
  const branches = Array.from(new Set(items.map((item) => item.branch.name)));
  const hero = content["schedule.hero"];
  return <><PageHero {...hero} index="04" /><section className="section"><div className="container">
    {branches.length ? <div className="schedule-filters" aria-label="Филиалы в расписании"><span className="btn btn-dark btn-small">Все группы</span>{branches.map((branch) => <span className="btn btn-outline btn-small" key={branch}>{branch}</span>)}</div> : null}
    {items.length ? Array.from(grouped).map(([day, rows]) => <section className="schedule-day" key={day}><h2 className="heading-md schedule-day-title">{day}</h2>{rows.map((row) => <article className="schedule-row" key={row.id}><time className="schedule-time">{row.startTime}—{row.endTime}</time><div><strong>{row.groupName}</strong><div className="text-muted">{row.program.title}</div></div><div>{row.coach.name}</div><div className="text-muted">{row.branch.name}</div><span className="spots">{row.spotsLeft ? `${row.spotsLeft} места` : "лист ожидания"}</span></article>)}</section>) : <div className="empty-state">Расписание уточняется. Оставьте заявку, и мы подберём время.</div>}
    <div className="section-action"><Link className="btn btn-primary" href="/#trial">{hero.ctaText}</Link></div>
  </div></section></>;
}
