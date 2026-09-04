import { AdminHeader } from "@/components/admin/admin-header";
import { CrudManager, type FieldSpec } from "@/components/admin/crud-manager";
import { getPrograms } from "@/lib/data";

const fields: FieldSpec[] = [
  { name: "title", label: "Название", required: true }, { name: "slug", label: "Slug", required: true, autoSlugFrom: "title" }, { name: "ageRange", label: "Возраст", required: true }, { name: "level", label: "Уровень", required: true }, { name: "duration", label: "Режим занятий", required: true }, { name: "price", label: "Стоимость", required: true }, { name: "accent", label: "Акцент", type: "select", options: [{ label: "Лайм", value: "lime" }, { label: "Синий", value: "blue" }, { label: "Красный", value: "red" }] }, { name: "order", label: "Порядок", type: "number" }, { name: "description", label: "Описание", type: "textarea", required: true, full: true }, { name: "isPublished", label: "Опубликована", type: "checkbox" },
];

export default async function AdminProgramsPage() {
  const items = await getPrograms(true);
  return <><AdminHeader title="Программы" description="Учебные траектории, уровни и стоимость." /><CrudManager entity="program" fields={fields} items={items.map((item) => ({ ...item }))} getTitle={(item) => String(item.title)} getMeta={(item) => String(item.ageRange)} /></>;
}
