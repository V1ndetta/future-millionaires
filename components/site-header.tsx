import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { getPageContents, getSiteSettings } from "@/lib/data";

const links = [
  ["О школе", "/about"], ["Тренеры", "/coaches"], ["Программы", "/programs"], ["Расписание", "/schedule"], ["Достижения", "/achievements"], ["Новости", "/news"], ["Галерея", "/gallery"], ["Контакты", "/contacts"],
];

export async function SiteHeader() {
  const [settings, content] = await Promise.all([getSiteSettings(), getPageContents(["home.hero"])]);
  const cta = content["home.hero"].ctaText || "Пробное занятие";
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo name={settings.schoolName} shortName={settings.shortName} />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map(([label, href]) => <Link className="nav-link" href={href} key={href}>{label}</Link>)}
        </nav>
        <Link className="btn btn-dark btn-small desktop-nav" href="/#trial">{cta}<ArrowUpRight size={15} /></Link>
        <details className="mobile-menu">
          <summary>Меню</summary>
          <nav className="mobile-panel" aria-label="Мобильная навигация">
            {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <Link href="/#trial">{cta} →</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
