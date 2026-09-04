import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProgramCard } from "@/components/program-card";
import { getPageContents, getPrograms } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Программы обучения", description: "Программы обучения шахматной школы." };

export default async function ProgramsPage() {
  const [items, content] = await Promise.all([getPrograms(), getPageContents(["programs.hero", "programs.cta"])]);
  return <><PageHero {...content["programs.hero"]} index="03" /><section className="section"><div className="container">{items.length ? <div className="card-grid">{items.map((program, index) => <ProgramCard key={program.id} program={program} index={index} />)}</div> : <div className="empty-state">Программы готовятся к публикации.</div>}<div className="section-compact split"><h2 className="heading-lg">{content["programs.cta"].title}</h2><p className="lede">{content["programs.cta"].description}</p></div></div></section></>;
}
