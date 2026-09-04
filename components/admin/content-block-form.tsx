"use client";

import { useActionState } from "react";
import { initialAdminState, updatePageContent } from "@/lib/actions/admin-actions";
import type { ContentField, EditablePageContent } from "@/lib/content-config";

const labels: Record<ContentField, string> = {
  eyebrow: "Надзаголовок",
  title: "Заголовок",
  description: "Описание",
  body: "Основной текст / элементы (по одному с новой строки)",
  ctaText: "Текст кнопки",
};

export function ContentBlockForm({ label, content, fields }: { label: string; content: EditablePageContent; fields: readonly ContentField[] }) {
  const [state, action, pending] = useActionState(updatePageContent, initialAdminState);
  return <details className="crud-item content-item">
    <summary><span className="crud-name">{label}</span><span className="crud-meta">{content.title || "Настроить"}</span></summary>
    <form action={action} className="admin-form">
      <fieldset className="admin-form-fields" disabled={pending}>
        <input type="hidden" name="key" value={content.contentKey} />
        {(["eyebrow", "title", "description", "body", "ctaText"] as ContentField[]).map((field) => fields.includes(field) ? <div className={`field ${field === "description" || field === "body" ? "field-full" : ""}`} key={field}>
          <label htmlFor={`${content.contentKey}-${field}`}>{labels[field]}</label>
          {field === "description" || field === "body" ? <textarea id={`${content.contentKey}-${field}`} name={field} defaultValue={content[field]} /> : <input id={`${content.contentKey}-${field}`} name={field} defaultValue={content[field]} />}
          {state.fieldErrors?.[field]?.[0] ? <span className="field-error">{state.fieldErrors[field][0]}</span> : null}
        </div> : <input type="hidden" name={field} value={content[field]} key={field} />)}
        {state.message ? <p className={`form-message ${state.status}`} role={state.status === "error" ? "alert" : "status"}>{state.message}</p> : null}
        <div className="admin-actions"><button className="btn btn-dark btn-small" disabled={pending}>{pending ? "Сохраняем…" : "Сохранить блок"}</button></div>
      </fieldset>
    </form>
  </details>;
}
