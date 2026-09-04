"use client";

import { useActionState, useState } from "react";
import { adminMutation, initialAdminState } from "@/lib/actions/admin-actions";
import type { FieldSpec } from "@/components/admin/crud-manager";
import { ImageUploadField } from "@/components/admin/image-upload-field";

function fieldValue(item: Record<string, unknown> | undefined, field: FieldSpec) {
  const value = item?.[field.name];
  if (value instanceof Date) return value.toISOString().slice(0, field.type === "date" ? 10 : 16);
  if (typeof value === "string" && (field.type === "date" || field.type === "datetime-local")) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, field.type === "date" ? 10 : 16);
  }
  return value == null ? "" : String(value);
}

function slugify(value: string) {
  const map: Record<string, string> = { а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya" };
  return value.toLowerCase().split("").map((char) => map[char] ?? char).join("").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120);
}

function FormFields({ fields, item, entity, fieldErrors }: { fields: FieldSpec[]; item?: Record<string, unknown>; entity: string; fieldErrors?: Record<string, string[]> }) {
  const sourceField = fields.find((field) => fields.some((candidate) => candidate.autoSlugFrom === field.name));
  const slugField = fields.find((field) => field.autoSlugFrom);
  const [sourceValue, setSourceValue] = useState(sourceField ? fieldValue(item, sourceField) : "");
  const [slugValue, setSlugValue] = useState(slugField ? fieldValue(item, slugField) : "");
  const [slugEdited, setSlugEdited] = useState(Boolean(item));

  return <>{fields.map((field) => {
    const inputId = `${String(item?.id ?? "new")}-${field.name}`;
    const value = fieldValue(item, field);
    const error = fieldErrors?.[field.name]?.[0];
    if (field.type === "checkbox") return <label className="checkbox-field" key={field.name}><input type="checkbox" name={field.name} defaultChecked={item ? Boolean(item[field.name]) : true} />{field.label}</label>;
    if (field.type === "image") return <ImageUploadField key={field.name} name={field.name} label={field.label} initialValue={value} entity={entity as "coach" | "news" | "achievement" | "gallery"} error={error} />;

    const shared = { id: inputId, name: field.name, required: field.required, placeholder: field.placeholder, "aria-invalid": Boolean(error), "aria-describedby": error ? `${inputId}-error` : undefined };
    const isSource = field.name === sourceField?.name;
    const isSlug = field.name === slugField?.name;
    return <div className={`field ${field.full ? "field-full" : ""}`} key={field.name}>
      <label htmlFor={inputId}>{field.label}</label>
      {field.type === "textarea" ? <textarea {...shared} defaultValue={value} /> : field.type === "select" ? <select {...shared} defaultValue={value}>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : isSource ? <input {...shared} type={field.type ?? "text"} value={sourceValue} onChange={(event) => { const next = event.target.value; setSourceValue(next); if (!slugEdited) setSlugValue(slugify(next)); }} /> : isSlug ? <input {...shared} type="text" value={slugValue} onChange={(event) => { setSlugEdited(true); setSlugValue(slugify(event.target.value)); }} /> : <input {...shared} type={field.type ?? "text"} defaultValue={value} />}
      {error ? <span className="field-error" id={`${inputId}-error`}>{error}</span> : null}
    </div>;
  })}</>;
}

export function AdminRecordForm({ entity, fields, mode, item }: { entity: string; fields: FieldSpec[]; mode: "create" | "update"; item?: Record<string, unknown> }) {
  const [state, action, pending] = useActionState(adminMutation, initialAdminState);
  return <form action={action} className="admin-form">
    {item?.id ? <input type="hidden" name="id" value={String(item.id)} /> : null}
    <fieldset className="admin-form-fields" disabled={pending}>
      <FormFields fields={fields} item={item} entity={entity} fieldErrors={state.fieldErrors} />
      {state.message ? <p className={`form-message ${state.status}`} role={state.status === "error" ? "alert" : "status"}>{state.message}</p> : null}
      <div className="admin-actions">
        <button className="btn btn-dark btn-small" name="_intent" value={`${mode}:${entity}`} disabled={pending}>{pending ? "Сохраняем…" : mode === "create" ? "Создать" : "Сохранить"}</button>
        {mode === "update" ? <button className="btn btn-outline btn-small danger" name="_intent" value={`delete:${entity}`} disabled={pending} onClick={(event) => { if (!window.confirm("Удалить запись? Это действие нельзя отменить.")) event.preventDefault(); }}>Удалить</button> : null}
      </div>
    </fieldset>
  </form>;
}
