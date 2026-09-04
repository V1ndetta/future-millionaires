import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProgramCard({ program, index }: { program: { title: string; ageRange: string; level: string; description: string; duration: string; price: string; accent: string }; index: number }) {
  return (
    <article className="card program-card" data-accent={program.accent}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}><span className="card-number">0{index + 1}</span><span className="program-chip">{program.ageRange}</span></div>
      <h3 className="heading-md">{program.title}</h3>
      <p className="program-description">{program.description}</p>
      <div className="card-meta"><span>{program.level}</span><span>{program.duration}</span><span>{program.price}</span></div>
      <Link href="/#trial" className="text-link" style={{ marginTop: "1.5rem", alignSelf: "flex-start", position: "relative", zIndex: 2 }}>Выбрать программу <ArrowRight className="arrow" size={17} /></Link>
    </article>
  );
}
