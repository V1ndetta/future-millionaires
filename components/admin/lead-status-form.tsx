"use client";

import { useActionState } from "react";
import { initialAdminState, updateLeadStatus } from "@/lib/actions/admin-actions";

const labels = { NEW: "Новая", CONTACTED: "Связались", ENROLLED: "Зачислен", ARCHIVED: "Архив" } as const;

export function LeadStatusForm({ id, status }: { id: string; status: keyof typeof labels }) {
  const [state, action, pending] = useActionState(updateLeadStatus, initialAdminState);
  return <form action={action} className="lead-status-form"><input type="hidden" name="id" value={id} /><select name="status" defaultValue={status} disabled={pending}>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button className="btn btn-dark btn-small" disabled={pending}>{pending ? "…" : "Сохранить"}</button>{state.message ? <span className={`inline-message ${state.status}`}>{state.message}</span> : null}</form>;
}
