import { AdminHeader } from "@/components/admin/admin-header";
import { ContentBlockForm } from "@/components/admin/content-block-form";
import { CrudManager, type FieldSpec } from "@/components/admin/crud-manager";
import { contentBlueprints, type ContentKey } from "@/lib/content-config";
import { getHomeStats, getPageContents } from "@/lib/data";

const statFields: FieldSpec[] = [
  { name: "value", label: "Значение", required: true, placeholder: "12+" },
  { name: "label", label: "Подпись", required: true, full: true },
  { name: "order", label: "Порядок", type: "number" },
  { name: "isPublished", label: "Опубликовано", type: "checkbox" },
];

export default async function AdminContentPage() {
  const keys = contentBlueprints.map((item) => item.key) as ContentKey[];
  const [content, stats] = await Promise.all([getPageContents(keys, true), getHomeStats(true)]);
  return <><AdminHeader title="Тексты сайта" description="Заголовки, описания, CTA и показатели публичных страниц." />
    <section className="admin-panel"><div className="admin-panel-head"><div><h2>Текстовые блоки</h2><p className="text-muted">Изменения сразу используются на публичных страницах.</p></div></div><div className="crud-list">{contentBlueprints.map((blueprint) => <ContentBlockForm key={blueprint.key} label={blueprint.label} fields={blueprint.fields} content={content[blueprint.key]} />)}</div></section>
    <section className="admin-panel"><div className="admin-panel-head"><div><h2>Показатели главной</h2><p className="text-muted">Значение и подпись каждой метрики редактируются независимо.</p></div></div><CrudManager entity="homeStat" fields={statFields} items={stats.map((item) => ({ ...item }))} getTitle={(item) => `${item.value} — ${item.label}`} getMeta={(item) => Number(item.isPublished) ? "Опубликовано" : "Скрыто"} /></section>
  </>;
}
