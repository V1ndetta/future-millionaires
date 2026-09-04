"use client";

import { useActionState } from "react";
import { initialAdminState, updateSettings } from "@/lib/actions/admin-actions";

type SettingsValue = {
  schoolName: string; shortName: string; tagline: string; description: string; city: string; country: string;
  phone: string; email: string; address: string; telegram: string | null; instagram: string | null; whatsapp: string | null;
  foundedYear: number; studentsCount: number;
};

export function SettingsForm({ settings }: { settings: SettingsValue }) {
  const [state, action, pending] = useActionState(updateSettings, initialAdminState);
  const error = (name: string) => state.fieldErrors?.[name]?.[0];
  const field = (name: keyof SettingsValue, label: string, type = "text") => <div className="field"><label htmlFor={String(name)}>{label}</label><input id={String(name)} name={String(name)} type={type} defaultValue={String(settings[name] ?? "")} required={!["telegram", "instagram", "whatsapp"].includes(String(name))} aria-invalid={Boolean(error(String(name)))} />{error(String(name)) ? <span className="field-error">{error(String(name))}</span> : null}</div>;
  return <form action={action} className="admin-form settings-form">
    <fieldset className="admin-form-fields" disabled={pending}>
      {field("schoolName", "Название")}{field("shortName", "Короткое название")}
      {field("tagline", "Подпись")}
      <div className="field"><label htmlFor="city">Город</label><input id="city" name="city" defaultValue={settings.city} required />{error("city") ? <span className="field-error">{error("city")}</span> : null}</div>
      {field("country", "Страна")}
      <div className="field field-full"><label htmlFor="description">Краткое описание школы</label><textarea id="description" name="description" defaultValue={settings.description} required />{error("description") ? <span className="field-error">{error("description")}</span> : null}</div>
      {field("phone", "Телефон", "tel")}{field("email", "Email", "email")}
      <div className="field field-full"><label htmlFor="address">Основной адрес</label><input id="address" name="address" defaultValue={settings.address} required />{error("address") ? <span className="field-error">{error("address")}</span> : null}</div>
      {field("telegram", "Telegram URL", "url")}{field("instagram", "Instagram URL", "url")}{field("whatsapp", "WhatsApp URL", "url")}
      {field("foundedYear", "Год основания", "number")}{field("studentsCount", "Количество учеников", "number")}
      {state.message ? <p className={`form-message ${state.status}`} role={state.status === "error" ? "alert" : "status"}>{state.message}</p> : null}
      <div className="admin-actions"><button className="btn btn-dark" disabled={pending}>{pending ? "Сохраняем…" : "Сохранить настройки"}</button></div>
    </fieldset>
  </form>;
}
