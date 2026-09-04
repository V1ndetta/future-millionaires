import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const formatter = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "long", year: "numeric" });

export function NewsCard({ post, eager = false }: { post: { title: string; slug: string; excerpt: string; category: string; imageUrl: string; publishedAt: Date }; eager?: boolean }) {
  return (
    <article className="card news-card">
      <div className="media-frame"><Image src={post.imageUrl} alt="" fill loading={eager ? "eager" : undefined} sizes="(max-width: 640px) 100vw, 50vw" /></div>
      <div className="card-body">
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}><span className="category">{post.category}</span><time className="card-number" dateTime={post.publishedAt.toISOString()}>{formatter.format(post.publishedAt)}</time></div>
        <h3 className="heading-md">{post.title}</h3><p className="text-muted">{post.excerpt}</p>
        <Link className="text-link" href={`/news/${post.slug}`}>Читать <ArrowRight className="arrow" size={17} /></Link>
      </div>
    </article>
  );
}
