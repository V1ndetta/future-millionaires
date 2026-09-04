import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { getBranches, getPageContents, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Контакты", description: "Контакты и адреса шахматной школы." };

export default async function ContactsPage() {
  const [settings, items, content] = await Promise.all([getSiteSettings(), getBranches(), getPageContents(["contacts.hero", "contacts.connect", "contacts.branches"])]);
  const connect = content["contacts.connect"];
  return <><PageHero {...content["contacts.hero"]} index="08" /><section className="section"><div className="container split"><div><p className="eyebrow">{connect.eyebrow}</p><div className="contact-list">
    {settings.phone ? <div className="contact-row"><span>Телефон</span><a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>{settings.phone}</a></div> : null}
    {settings.email ? <div className="contact-row"><span>Почта</span><a href={`mailto:${settings.email}`}>{settings.email}</a></div> : null}
    {settings.address ? <div className="contact-row"><span>Адрес</span><strong>{settings.address}</strong></div> : null}
    {settings.whatsapp || settings.telegram || settings.instagram ? <div className="contact-row"><span>Социальные сети</span><div>{settings.whatsapp ? <a href={settings.whatsapp}>WhatsApp ↗</a> : null}{settings.telegram ? <><br /><a href={settings.telegram}>Telegram ↗</a></> : null}{settings.instagram ? <><br /><a href={settings.instagram}>Instagram ↗</a></> : null}</div></div> : null}
  </div></div><div><h2 className="heading-lg">{connect.title}</h2><p className="lede section-copy">{connect.description}</p><Link href="/#trial" className="btn btn-dark section-action">{connect.ctaText}<ArrowUpRight size={17} /></Link></div></div></section>
  <section className="section-compact"><div className="container"><p className="eyebrow">{content["contacts.branches"].eyebrow}</p>{content["contacts.branches"].title ? <h2 className="heading-lg section-inline-title">{content["contacts.branches"].title}</h2> : null}{items.length ? <div className="branch-grid">{items.map((branch) => <article className="branch-card" key={branch.id}><span className="card-number">{branch.district}</span><h2 className="heading-lg">{branch.name}</h2><p className="branch-address">{branch.address}<br />{branch.hours}</p>{branch.mapUrl ? <a className="text-link" href={branch.mapUrl}>Открыть на карте <ArrowUpRight size={16} /></a> : null}</article>)}</div> : <div className="empty-state">Адреса готовятся к публикации.</div>}</div></section></>;
}
