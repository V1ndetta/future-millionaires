import { AdminHeader } from "@/components/admin/admin-header";
import { updateSettings } from "@/lib/actions/admin-actions";
import { getSiteSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <><AdminHeader title="Настройки" description="Контакты и основная информация школы." /><section className="admin-panel"><form action={updateSettings} className="admin-form" style={{ border: 0, padding: 0 }}>
    <div className="field"><label htmlFor="schoolName">Название</label><input id="schoolName" name="schoolName" defaultValue={settings.schoolName} required /></div><div className="field"><label htmlFor="shortName">Короткое название</label><input id="shortName" name="shortName" defaultValue={settings.shortName} required /></div>
    <div className="field field-full"><label htmlFor="tagline">Подпись</label><input id="tagline" name="tagline" defaultValue={settings.tagline} required /></div><div className="field field-full"><label htmlFor="description">Описание</label><textarea id="description" name="description" defaultValue={settings.description} required /></div>
    <div className="field"><label htmlFor="phone">Телефон</label><input id="phone" name="phone" defaultValue={settings.phone} required /></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" defaultValue={settings.email} required /></div>
    <div className="field field-full"><label htmlFor="address">Основной адрес</label><input id="address" name="address" defaultValue={settings.address} required /></div><div className="field"><label htmlFor="telegram">Telegram</label><input id="telegram" name="telegram" defaultValue={settings.telegram ?? ""} /></div><div className="field"><label htmlFor="instagram">Instagram</label><input id="instagram" name="instagram" defaultValue={settings.instagram ?? ""} /></div><div className="field"><label htmlFor="whatsapp">WhatsApp</label><input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp ?? ""} /></div>
    <div className="field"><label htmlFor="foundedYear">Год основания</label><input id="foundedYear" name="foundedYear" type="number" defaultValue={settings.foundedYear} required /></div><div className="field"><label htmlFor="studentsCount">Количество учеников</label><input id="studentsCount" name="studentsCount" type="number" defaultValue={settings.studentsCount} required /></div>
    <div className="admin-actions"><button className="btn btn-dark">Сохранить настройки</button></div>
  </form></section></>;
}
