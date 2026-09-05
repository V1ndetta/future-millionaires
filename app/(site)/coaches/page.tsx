import type { Metadata } from "next";
import { CoachCard } from "@/components/coach-card";
import { MediaImage } from "@/components/media-image";
import { PageHero } from "@/components/page-hero";
import { getCoaches, getPageContents } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Тренеры", description: "Тренерский состав шахматной школы BM Chess в Астане." };

export default async function CoachesPage() {
  const [items, content] = await Promise.all([getCoaches(), getPageContents(["coaches.hero"])]);
  const featured = items.slice(0, 2);
  const rest = items.slice(2);

  return <>
    <PageHero {...content["coaches.hero"]} index="02" />
    <section className="section">
      <div className="container">
        {featured.length ? <div className="coach-profile-list">{featured.map((coach, index) => (
          <article className="coach-profile" key={coach.id}>
            <div className="coach-profile-media"><MediaImage src={coach.imageUrl} alt={coach.name} eager={index === 0} sizes="(max-width: 820px) 100vw, 40vw" /></div>
            <div className="coach-profile-copy">
              <p className="eyebrow">{coach.role}</p>
              <h2 className="heading-lg">{coach.name}</h2>
              <p className="coach-profile-rank">{coach.rank}</p>
              <p className="lede coach-profile-bio">{coach.bio}</p>
              <div className="coach-profile-facts">
                {coach.experience > 0 ? <div><strong>Тренерский опыт</strong><p>{coach.experience}+ лет</p></div> : null}
                {coach.achievements ? <div><strong>Ключевые достижения</strong><p>{coach.achievements}</p></div> : null}
              </div>
            </div>
          </article>
        ))}</div> : <div className="empty-state">Состав тренеров готовится к публикации.</div>}

        {rest.length ? <div className="card-grid" style={{ marginTop: "1.5rem" }}>{rest.map((coach) => <CoachCard key={coach.id} coach={coach} />)}</div> : null}
      </div>
    </section>
  </>;
}
