import { AdminHeader } from "@/components/admin/admin-header";
import { updateLeadStatus } from "@/lib/actions/admin-actions";
import { getLeads } from "@/lib/data";

const labels = { NEW: "Новая", CONTACTED: "Связались", ENROLLED: "Зачислен", ARCHIVED: "Архив" } as const;

export default async function AdminLeadsPage() {
  const leads = await getLeads();
  return <><AdminHeader title="Заявки" description="Обращения с формы пробного занятия." /><section className="admin-panel">{leads.length ? <table className="lead-table"><thead><tr><th>Контакт</th><th>Ученик</th><th>Запрос</th><th>Комментарий</th><th>Статус</th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.id}><td><strong>{lead.name}</strong><br /><a href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}>{lead.phone}</a><br /><span className="text-muted">{new Intl.DateTimeFormat("ru-RU", { dateStyle: "short", timeStyle: "short" }).format(lead.createdAt)}</span></td><td>{lead.studentAge} лет<br /><span className="text-muted">{lead.level}</span></td><td>{lead.program}</td><td>{lead.comment || "—"}</td><td><form action={updateLeadStatus}><input type="hidden" name="id" value={lead.id} /><select name="status" defaultValue={lead.status} onChange={undefined}>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button className="btn btn-dark btn-small" style={{ marginTop: ".5rem" }}>Сохранить</button></form></td></tr>)}</tbody></table> : <div className="empty-state">Заявок пока нет. Новые обращения появятся здесь.</div>}</section></>;
}
