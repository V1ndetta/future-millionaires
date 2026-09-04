import Link from "next/link";
import { getSiteSettings } from "@/lib/data";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">Будущие<br />миллионеры</div>
          <nav className="footer-nav" aria-label="Разделы сайта">
            <Link href="/about">О школе</Link><Link href="/coaches">Тренеры</Link><Link href="/programs">Программы</Link><Link href="/schedule">Расписание</Link><Link href="/achievements">Достижения</Link>
          </nav>
          <nav className="footer-nav" aria-label="Контакты">
            <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>{settings.phone}</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <span className="text-muted">{settings.address}</span>
            <Link href="/admin">Вход для директора</Link>
          </nav>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Шахматная школа «Будущие миллионеры»</span><span>Алматы · Казахстан</span></div>
      </div>
    </footer>
  );
}
