import { AdminHeader } from "@/components/admin/admin-header";
import { CrudManager, type FieldSpec } from "@/components/admin/crud-manager";
import { getAchievements } from "@/lib/data";

const fields: FieldSpec[] = [
  { name: "studentName", label: "Ученик", required: true }, { name: "title", label: "Результат", required: true }, { name: "event", label: "Событие", required: true }, { name: "place", label: "Место", required: true }, { name: "date", label: "Дата", type: "date", required: true }, { name: "imageUrl", label: "Фотография", type: "image", full: true }, { name: "description", label: "Описание", type: "textarea", required: true, full: true }, { name: "order", label: "Порядок", type: "number" }, { name: "isPublished", label: "Опубликовано", type: "checkbox" },
];

export default async function AdminAchievementsPage() {
  const items = await getAchievements(true);
  return <><AdminHeader title="Достижения" description="Турнирные результаты и истории роста." /><CrudManager entity="achievement" fields={fields} items={items.map((item) => ({ ...item }))} getTitle={(item) => `${item.studentName} — ${item.title}`} getMeta={(item) => String(item.event)} /></>;
}
