import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProgramCard } from "@/components/program-card";
import { getPrograms } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Программы обучения", description: "Шахматные программы для начинающих, продолжающих и турнирных игроков." };

export default async function ProgramsPage() {
  const items = await getPrograms();
  return <><PageHero eyebrow="Программы" title="У каждого уровня — своя задача" description="Мы не торопим ученика проходить темы. Мы строим фундамент, который выдерживает сложную игру." index="03" /><section className="section"><div className="container">{items.length ? <div className="card-grid">{items.map((program, index) => <ProgramCard key={program.id} program={program} index={index} />)}</div> : <div className="empty-state">Новые программы готовятся к публикации.</div>}<div className="section-compact split"><h2 className="heading-lg">Не знаете, с чего начать?</h2><p className="lede">На пробном занятии тренер определит текущий уровень и предложит группу, где будет достаточно интересно и достаточно сложно.</p></div></div></section></>;
}
