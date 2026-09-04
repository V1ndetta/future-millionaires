export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="section-head">
      <div><p className="eyebrow">{eyebrow}</p><h2 className="heading-xl">{title}</h2></div>
      {description ? <p className="lede">{description}</p> : null}
    </div>
  );
}
