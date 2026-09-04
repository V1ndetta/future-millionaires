import { AdminRecordForm } from "@/components/admin/admin-record-form";

export type FieldOption = { label: string; value: string };
export type FieldSpec = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "date" | "datetime-local" | "checkbox" | "select" | "image";
  required?: boolean;
  full?: boolean;
  options?: FieldOption[];
  placeholder?: string;
  autoSlugFrom?: string;
};

export function CrudManager({ entity, fields, items, getTitle, getMeta }: { entity: string; fields: FieldSpec[]; items: Record<string, unknown>[]; getTitle: (item: Record<string, unknown>) => string; getMeta?: (item: Record<string, unknown>) => string }) {
  return <div>
    <details className="crud-create">
      <summary>＋ Добавить запись</summary>
      <AdminRecordForm entity={entity} fields={fields} mode="create" />
    </details>
    {items.length ? <div className="crud-list">{items.map((item) => <details className="crud-item" key={String(item.id)}>
      <summary><span className="crud-name">{getTitle(item)}</span><span className="crud-meta">{getMeta?.(item) ?? "Изменить"}</span></summary>
      <AdminRecordForm entity={entity} fields={fields} mode="update" item={item} />
    </details>)}</div> : <div className="empty-state"><strong>Записей пока нет</strong><span>Откройте форму выше и добавьте первую запись.</span></div>}
  </div>;
}
