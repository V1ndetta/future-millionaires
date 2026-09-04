import { AdminHeader } from "@/components/admin/admin-header";
import { CrudManager, type FieldSpec } from "@/components/admin/crud-manager";
import { getBranches } from "@/lib/data";

const fields: FieldSpec[] = [
  { name: "name", label: "Название", required: true }, { name: "district", label: "Район", required: true }, { name: "address", label: "Адрес", required: true, full: true }, { name: "phone", label: "Телефон", required: true }, { name: "hours", label: "Часы работы", required: true }, { name: "mapUrl", label: "Ссылка на карту", full: true }, { name: "order", label: "Порядок", type: "number" }, { name: "isPublished", label: "Опубликован", type: "checkbox" },
];

export default async function AdminBranchesPage() {
  const items = await getBranches(true);
  return <><AdminHeader title="Филиалы" description="Адреса, контакты и часы работы." /><CrudManager entity="branch" fields={fields} items={items.map((item) => ({ ...item }))} getTitle={(item) => String(item.name)} getMeta={(item) => String(item.address)} /></>;
}
