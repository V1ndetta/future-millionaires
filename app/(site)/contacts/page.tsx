import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { getBranches, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Контакты", description: "Адреса филиалов, телефон и способы связи с шахматной школой." };

export default async function ContactsPage() {
  const [settings, items] = await Promise.all([getSiteSettings(), getBranches()]);
  return <><PageHero eyebrow="Контакты" title="Приходите посмотреть, как мы работаем" description="Можно начать с экскурсии, знакомства с тренером или сразу с пробного занятия." index="08" /><section className="section"><div className="container split"><div><p className="eyebrow">Связаться</p><div className="contact-list"><div className="contact-row"><span>Телефон</span><a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>{settings.phone}</a></div><div className="contact-row"><span>Почта</span><a href={`mailto:${settings.email}`}>{settings.email}</a></div><div className="contact-row"><span>Мессенджеры</span><div>{settings.whatsapp ? <a href={settings.whatsapp}>WhatsApp ↗</a> : null}{settings.telegram ? <><br /><a href={settings.telegram}>Telegram ↗</a></> : null}</div></div></div></div><div><h2 className="heading-lg">Ответим в течение рабочего дня</h2><p className="lede" style={{ marginTop: "1.5rem" }}>Если вопрос срочный, звоните. Для подбора группы удобнее оставить заявку: администратор уточнит возраст, опыт и расписание.</p><Link href="/#trial" className="btn btn-dark" style={{ marginTop: "2rem" }}>Оставить заявку <ArrowUpRight size={17} /></Link></div></div></section><section className="section-compact"><div className="container"><p className="eyebrow">Филиалы</p>{items.length ? <div className="branch-grid">{items.map((branch) => <article className="branch-card" key={branch.id}><span className="card-number">{branch.district}</span><h2 className="heading-lg">{branch.name}</h2><p className="branch-address">{branch.address}<br />{branch.hours}</p><a className="text-link" href={branch.mapUrl ?? "#"}>Открыть на карте <ArrowUpRight size={16} /></a></article>)}</div> : <div className="empty-state">Адреса уточняются.</div>}</div></section></>;
}
