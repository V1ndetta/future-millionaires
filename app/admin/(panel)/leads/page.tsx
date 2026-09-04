import { AdminHeader } from "@/components/admin/admin-header";
import { LeadStatusForm } from "@/components/admin/lead-status-form";
import { getLeads } from "@/lib/data";

export default async function AdminLeadsPage() {
  const leads = await getLeads();
  return <><AdminHeader title="Заявки" description="Обращения с формы пробного занятия." /><section className="admin-panel">{leads.length ? <div className="table-scroll"><table className="lead-table"><thead><tr><th>Контакт</th><th>Ученик</th><th>Запрос</th><th>Комментарий</th><th>Статус</th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.id}><td><strong>{lead.name}</strong><br /><a href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}>{lead.phone}</a><br /><span className="text-muted">{new Intl.DateTimeFormat("ru-RU", { dateStyle: "short", timeStyle: "short" }).format(lead.createdAt)}</span></td><td>{lead.studentAge} лет<br /><span className="text-muted">{lead.level}</span></td><td>{lead.program}</td><td>{lead.comment || "—"}</td><td><LeadStatusForm id={lead.id} status={lead.status} /></td></tr>)}</tbody></table></div> : <div className="empty-state"><strong>Заявок пока нет</strong><span>Новые обращения с публичной формы появятся здесь.</span></div>}</section></>;
}
