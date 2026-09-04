import Link from "next/link";
import { getSiteSettings } from "@/lib/data";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">{settings.schoolName.split(" ").map((part, index, parts) => <span key={`${part}-${index}`}>{part}{index < parts.length - 1 ? <br /> : null}</span>)}</div>
          <nav className="footer-nav" aria-label="Разделы сайта">
            <Link href="/about">О школе</Link><Link href="/coaches">Тренеры</Link><Link href="/programs">Программы</Link><Link href="/schedule">Расписание</Link><Link href="/achievements">Достижения</Link>
          </nav>
          <nav className="footer-nav" aria-label="Контакты">
            {settings.phone ? <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>{settings.phone}</a> : null}
            {settings.email ? <a href={`mailto:${settings.email}`}>{settings.email}</a> : null}
            {settings.address ? <span className="text-muted">{settings.address}</span> : null}
            <Link href="/admin">Вход для директора</Link>
          </nav>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {settings.tagline} «{settings.schoolName}»</span><span>{[settings.city, settings.country].filter(Boolean).join(" · ")}</span></div>
      </div>
    </footer>
  );
}
