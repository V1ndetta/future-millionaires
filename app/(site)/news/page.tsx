import type { Metadata } from "next";
import { NewsCard } from "@/components/news-card";
import { PageHero } from "@/components/page-hero";
import { getNews, getPageContents } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Новости и турниры", description: "Новости, турниры и материалы шахматной школы." };

export default async function NewsPage() {
  const [posts, content] = await Promise.all([getNews(), getPageContents(["news.hero"])]);
  return <><PageHero {...content["news.hero"]} index="06" /><section className="section"><div className="container">{posts.length ? <div className="card-grid">{posts.map((post, index) => <NewsCard key={post.id} post={post} eager={index === 0} />)}</div> : <div className="empty-state">Публикаций пока нет.</div>}</div></section></>;
}
