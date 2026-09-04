import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { splitContentLines, type ContentKey } from "@/lib/content-config";
import { getPageContents } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "О школе", description: "Подход и принципы шахматной школы." };

const keys = ["about.hero", "about.story", "about.principles", "about.principle.1", "about.principle.2", "about.principle.3", "about.cta"] as ContentKey[];

export default async function AboutPage() {
  const content = await getPageContents(keys);
  const story = content["about.story"];
  const principles = [content["about.principle.1"], content["about.principle.2"], content["about.principle.3"]];
  const cta = content["about.cta"];
  return <>
    <PageHero {...content["about.hero"]} index="01" />
    <section className="section"><div className="container split">
      <div className="feature-image"><Image src="/images/tournament.png" alt="Шахматный турнир" fill loading="eager" sizes="(max-width: 980px) 100vw, 50vw" /></div>
      <div><p className="eyebrow">{story.eyebrow}</p><h2 className="heading-lg">{story.title}</h2><div className="prose story-copy">{splitContentLines(story.body).map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>)}</div></div>
    </div></section>
    <section className="section-compact"><div className="container"><p className="eyebrow">{content["about.principles"].eyebrow}</p>{content["about.principles"].title ? <h2 className="heading-lg section-inline-title">{content["about.principles"].title}</h2> : null}<div className="principles">{principles.map((principle) => <article className="principle" key={principle.contentKey}><span className="card-number">{principle.eyebrow}</span><h3 className="heading-md">{principle.title}</h3><p>{principle.description}</p></article>)}</div></div></section>
    <section className="section dark-section"><div className="container split"><h2 className="heading-xl">{cta.title}</h2><div><p className="lede">{cta.description}</p><Link href="/#trial" className="btn btn-primary section-action">{cta.ctaText}<ArrowUpRight size={18} /></Link></div></div></section>
  </>;
}
