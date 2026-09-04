import { AdminHeader } from "@/components/admin/admin-header";
import { CrudManager, type FieldSpec } from "@/components/admin/crud-manager";
import { getGallery } from "@/lib/data";

const fields: FieldSpec[] = [
  { name: "title", label: "Название", required: true }, { name: "category", label: "Категория", required: true }, { name: "imageUrl", label: "Изображение", type: "image", full: true }, { name: "alt", label: "Описание для доступности", required: true, full: true }, { name: "order", label: "Порядок", type: "number" }, { name: "isPublished", label: "Опубликовано", type: "checkbox" },
];

export default async function AdminGalleryPage() {
  const items = await getGallery(true);
  return <><AdminHeader title="Галерея" description="Фотографии занятий и турниров." /><CrudManager entity="gallery" fields={fields} items={items.map((item) => ({ ...item }))} getTitle={(item) => String(item.title)} getMeta={(item) => String(item.category)} /></>;
}
