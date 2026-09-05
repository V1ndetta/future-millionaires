import { MediaImage } from "@/components/media-image";

export function CoachCard({ coach, eager = false }: { coach: { name: string; role: string; rank: string; bio: string; imageUrl: string | null; experience: number; achievements: string }; eager?: boolean }) {
  return (
    <article className="card coach-card">
      <div className="media-frame"><MediaImage src={coach.imageUrl} alt={coach.name} eager={eager} sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" /></div>
      <div className="card-body">
        <span className="card-number">{coach.rank}</span>
        <h3 className="heading-md" style={{ marginTop: ".75rem" }}>{coach.name}</h3>
        <p className="text-muted">{coach.role}{coach.experience > 0 ? ` · ${coach.experience}+ лет опыта` : ""}</p>
        <p>{coach.bio}</p>
        {coach.achievements ? <p className="coach-achievements">{coach.achievements}</p> : null}
      </div>
    </article>
  );
}
