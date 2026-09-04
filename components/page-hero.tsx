export function PageHero({ eyebrow, title, description, index }: { eyebrow: string; title: string; description: string; index: string }) {
  return (
    <header className="page-hero">
      <div className="container page-hero-grid">
        <div><p className="eyebrow">{eyebrow}</p><h1 className="heading-xl">{title}</h1><p className="lede">{description}</p></div>
        <div className="page-hero-index" aria-hidden="true">{index}</div>
      </div>
    </header>
  );
}
