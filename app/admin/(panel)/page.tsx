import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { getAchievements, getCoaches, getLeads, getNews, getPrograms, getSchedules } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [leads, coaches, programs, schedules, achievements, news] = await Promise.all([getLeads(), getCoaches(true), getPrograms(true), getSchedules(), getAchievements(true), getNews(true)]);
  const stats = [["Новые заявки", leads.filter((lead) => lead.status === "NEW").length], ["Тренеры", coaches.length], ["Активные группы", schedules.length], ["Публикации", news.length]];
  return <><AdminHeader title="Обзор" description="Главное о работе школы сегодня." /><div className="admin-grid">{stats.map(([label, value]) => <div className="admin-stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><section className="admin-panel"><div className="admin-panel-head"><h2>Последние заявки</h2><Link className="text-link" href="/admin/leads">Все заявки →</Link></div>{leads.length ? <table className="lead-table"><tbody>{leads.slice(0, 5).map((lead) => <tr key={lead.id}><td><strong>{lead.name}</strong><br /><span className="text-muted">{lead.phone}</span></td><td>{lead.studentAge} лет</td><td>{lead.program}</td><td><span className="status">{lead.status}</span></td></tr>)}</tbody></table> : <div className="empty-state">Новых заявок пока нет.</div>}</section><section className="admin-panel"><div className="admin-panel-head"><h2>Контент</h2></div><p className="text-muted">{programs.length} программ · {achievements.length} достижений · {news.length} публикаций</p></section></>;
}
