import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MediaImage } from "@/components/media-image";
import { getNewsPost } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "Публикация не найдена" };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();
  return <article><header className="page-hero"><div className="container"><Link href="/news" className="text-link"><ArrowLeft size={16} />К новостям</Link><div className="article-heading"><span className="category">{post.category}</span><h1 className="heading-xl">{post.title}</h1><p className="lede">{post.excerpt}</p></div></div></header><div className="container section"><div className="feature-image article-image"><MediaImage src={post.imageUrl} alt="" eager sizes="100vw" /></div><div className="prose"><time>{new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(post.publishedAt)}</time>{post.content.split("\n").map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>)}</div></div></article>;
}
