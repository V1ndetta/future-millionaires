import { AdminHeader } from "@/components/admin/admin-header";
import { CrudManager, type FieldSpec } from "@/components/admin/crud-manager";
import { getNews } from "@/lib/data";

const fields: FieldSpec[] = [
  { name: "title", label: "Заголовок", required: true, full: true }, { name: "slug", label: "Slug", required: true }, { name: "category", label: "Категория", required: true }, { name: "publishedAt", label: "Дата публикации", type: "datetime-local", required: true }, { name: "imageUrl", label: "URL изображения", required: true, full: true }, { name: "excerpt", label: "Анонс", type: "textarea", required: true, full: true }, { name: "content", label: "Текст", type: "textarea", required: true, full: true }, { name: "isPublished", label: "Опубликована", type: "checkbox" },
];

export default async function AdminNewsPage() {
  const items = await getNews(true);
  return <><AdminHeader title="Новости" description="Публикации, турниры и объявления." /><CrudManager entity="news" fields={fields} items={items.map((item) => ({ ...item }))} getTitle={(item) => String(item.title)} getMeta={(item) => String(item.category)} /></>;
}
