import { AdminHeader } from "@/components/admin/admin-header";
import { CrudManager, type FieldSpec } from "@/components/admin/crud-manager";
import { getCoaches } from "@/lib/data";

const fields: FieldSpec[] = [
  { name: "name", label: "Имя", required: true }, { name: "role", label: "Роль", required: true }, { name: "rank", label: "Звание", required: true }, { name: "experience", label: "Опыт, лет", type: "number", required: true }, { name: "imageUrl", label: "URL изображения", required: true, full: true }, { name: "achievements", label: "Ключевые достижения", required: true, full: true }, { name: "bio", label: "Биография", type: "textarea", required: true, full: true }, { name: "order", label: "Порядок", type: "number" }, { name: "isPublished", label: "Опубликован", type: "checkbox" },
];

export default async function AdminCoachesPage() {
  const items = await getCoaches(true);
  return <><AdminHeader title="Тренеры" description="Команда и порядок отображения на сайте." /><CrudManager entity="coach" fields={fields} items={items.map((item) => ({ ...item }))} getTitle={(item) => String(item.name)} getMeta={(item) => String(item.rank)} /></>;
}
