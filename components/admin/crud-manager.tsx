import { adminMutation } from "@/lib/actions/admin-actions";

export type FieldOption = { label: string; value: string };
export type FieldSpec = { name: string; label: string; type?: "text" | "number" | "textarea" | "date" | "datetime-local" | "checkbox" | "select"; required?: boolean; full?: boolean; options?: FieldOption[]; placeholder?: string };

function fieldValue(item: Record<string, unknown> | undefined, field: FieldSpec) {
  const value = item?.[field.name];
  if (value instanceof Date) return value.toISOString().slice(0, field.type === "date" ? 10 : 16);
  return value == null ? "" : String(value);
}

function EditorFields({ fields, item }: { fields: FieldSpec[]; item?: Record<string, unknown> }) {
  return <>{fields.map((field) => {
    const value = fieldValue(item, field);
    if (field.type === "checkbox") return <label className="checkbox-field" key={field.name}><input type="checkbox" name={field.name} defaultChecked={item ? Boolean(item[field.name]) : true} />{field.label}</label>;
    return <div className={`field ${field.full ? "field-full" : ""}`} key={field.name}><label htmlFor={`${item?.id ?? "new"}-${field.name}`}>{field.label}</label>{field.type === "textarea" ? <textarea id={`${item?.id ?? "new"}-${field.name}`} name={field.name} required={field.required} defaultValue={value} placeholder={field.placeholder} /> : field.type === "select" ? <select id={`${item?.id ?? "new"}-${field.name}`} name={field.name} required={field.required} defaultValue={value}>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input id={`${item?.id ?? "new"}-${field.name}`} name={field.name} type={field.type ?? "text"} required={field.required} defaultValue={value} placeholder={field.placeholder} />}</div>;
  })}</>;
}

export function CrudManager({ entity, fields, items, getTitle, getMeta }: { entity: string; fields: FieldSpec[]; items: Record<string, unknown>[]; getTitle: (item: Record<string, unknown>) => string; getMeta?: (item: Record<string, unknown>) => string }) {
  return <div><details className="crud-create"><summary>＋ Добавить запись</summary><form action={adminMutation} className="admin-form"><EditorFields fields={fields} /><div className="admin-actions"><button className="btn btn-dark btn-small" name="_intent" value={`create:${entity}`}>Создать</button></div></form></details>{items.length ? <div className="crud-list">{items.map((item) => <details className="crud-item" key={String(item.id)}><summary><span className="crud-name">{getTitle(item)}</span><span className="crud-meta">{getMeta?.(item) ?? "Изменить"}</span></summary><form action={adminMutation} className="admin-form"><input type="hidden" name="id" value={String(item.id)} /><EditorFields fields={fields} item={item} /><div className="admin-actions"><button className="btn btn-dark btn-small" name="_intent" value={`update:${entity}`}>Сохранить</button><button className="btn btn-outline btn-small danger" name="_intent" value={`delete:${entity}`}>Удалить</button></div></form></details>)}</div> : <div className="empty-state">Пока нет записей. Добавьте первую.</div>}</div>;
}
