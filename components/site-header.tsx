import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  ["О школе", "/about"], ["Тренеры", "/coaches"], ["Программы", "/programs"], ["Расписание", "/schedule"], ["Достижения", "/achievements"], ["Новости", "/news"], ["Галерея", "/gallery"], ["Контакты", "/contacts"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map(([label, href]) => <Link className="nav-link" href={href} key={href}>{label}</Link>)}
        </nav>
        <Link className="btn btn-dark btn-small desktop-nav" href="/#trial">Пробное занятие <ArrowUpRight size={15} /></Link>
        <details className="mobile-menu">
          <summary>Меню</summary>
          <nav className="mobile-panel" aria-label="Мобильная навигация">
            {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <Link href="/#trial">Записаться →</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
