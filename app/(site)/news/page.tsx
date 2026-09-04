import type { Metadata } from "next";
import { NewsCard } from "@/components/news-card";
import { PageHero } from "@/components/page-hero";
import { getNews } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Новости и турниры", description: "Турниры, наборы и методические материалы шахматной школы." };

export default async function NewsPage() {
  const posts = await getNews();
  return <><PageHero eyebrow="Журнал школы" title="Новости, турниры, разборы" description="Всё, что помогает быть внутри шахматной жизни школы." index="06" /><section className="section"><div className="container">{posts.length ? <div className="card-grid">{posts.map((post, index) => <NewsCard key={post.id} post={post} eager={index === 0} />)}</div> : <div className="empty-state">Публикаций пока нет.</div>}</div></section></>;
}
