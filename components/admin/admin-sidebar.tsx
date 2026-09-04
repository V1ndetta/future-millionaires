import Link from "next/link";
import { Award, BookOpen, CalendarDays, Contact, FileText, GalleryHorizontal, LayoutDashboard, MapPin, Newspaper, Settings, Users } from "lucide-react";
import { Logo } from "@/components/logo";
import { logoutAction } from "@/lib/actions/auth-actions";

const links = [
  ["Обзор", "/admin", LayoutDashboard], ["Заявки", "/admin/leads", Contact], ["Тексты сайта", "/admin/content", FileText], ["Тренеры", "/admin/coaches", Users], ["Программы", "/admin/programs", BookOpen], ["Расписание", "/admin/schedule", CalendarDays], ["Филиалы", "/admin/branches", MapPin], ["Достижения", "/admin/achievements", Award], ["Новости", "/admin/news", Newspaper], ["Галерея", "/admin/gallery", GalleryHorizontal], ["Настройки", "/admin/settings", Settings],
] as const;

export function AdminSidebar({ user }: { user: { name: string; login: string } }) {
  return <aside className="admin-sidebar"><Logo compact /><nav className="admin-nav" aria-label="Админ-панель">{links.map(([label, href, Icon]) => <Link href={href} key={href}><Icon size={16} />{label}</Link>)}</nav><div className="admin-user"><strong>{user.name}</strong><span>@{user.login}</span><form action={logoutAction}><button className="btn btn-outline btn-small" style={{ marginTop: ".8rem", color: "inherit" }}>Выйти</button></form></div></aside>;
}
