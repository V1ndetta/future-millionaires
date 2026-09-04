import { AdminHeader } from "@/components/admin/admin-header";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <><AdminHeader title="Настройки" description="Идентичность школы, контакты, город и социальные сети." /><section className="admin-panel"><SettingsForm settings={settings} /></section></>;
}
