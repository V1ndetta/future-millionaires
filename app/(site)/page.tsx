import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { CoachCard } from "@/components/coach-card";
import { LeadForm } from "@/components/lead-form";
import { NewsCard } from "@/components/news-card";
import { ProgramCard } from "@/components/program-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { splitContentLines, type ContentKey } from "@/lib/content-config";
import { getAchievements, getCoaches, getHomeStats, getNews, getPageContents, getPrograms, getSiteSettings } from "@/lib/data";
import heroImage from "@/public/images/hero-academy.png";

export const dynamic = "force-dynamic";

const contentKeys = ["home.hero", "home.ticker", "home.why", "home.coaches", "home.programs", "home.achievements", "home.news", "home.trial"] as ContentKey[];

export default async function HomePage() {
  const [settings, content, stats, coachList, programList, achievementList, posts] = await Promise.all([getSiteSettings(), getPageContents(contentKeys), getHomeStats(), getCoaches(), getPrograms(), getAchievements(), getNews()]);
  const hero = content["home.hero"];
  const ticker = splitContentLines(content["home.ticker"].body);
  const heroTitle = splitContentLines(hero.title);
  return <>
    <section className="hero">
      <div className="hero-media"><Image className="hero-image" src={heroImage} alt="Шахматная партия" fill loading="eager" fetchPriority="high" sizes="100vw" /></div>
      <div className="container hero-content stagger">
        <div className="hero-tag"><span />{[hero.eyebrow, settings.city].filter(Boolean).join(" · ")}</div>
        <h1 className="display">{heroTitle.map((line, index) => <span key={`${line}-${index}`}>{line}{index < heroTitle.length - 1 ? <br /> : null}</span>)}</h1>
        <div className="hero-bottom">
          <p className="hero-copy">{hero.description}</p>
          {settings.studentsCount > 0 ? <div className="hero-stat"><strong>{settings.studentsCount}+</strong> учеников</div> : <span />}
          <Link href="#trial" className="btn btn-primary">{hero.ctaText}<ArrowUpRight size={18} /></Link>
        </div>
      </div>
      <ArrowDown aria-hidden="true" className="hero-scroll" />
    </section>

    {ticker.length ? <div className="ticker" aria-hidden="true"><div className="ticker-track">{[...ticker, ...ticker].map((item, index) => <span key={`${item}-${index}`} className="ticker-pair"><span className="ticker-item">{item}</span><span className="ticker-dot" /></span>)}</div></div> : null}

    <section className="section"><div className="container">
      <Reveal><SectionHeading eyebrow={content["home.why"].eyebrow} title={content["home.why"].title} description={content["home.why"].description} /></Reveal>
      {stats.length ? <Reveal className="editorial-grid">{stats.map((stat) => <div className="metric" key={stat.id}><strong className="metric-value">{stat.value}</strong><span className="metric-label">{stat.label}</span></div>)}</Reveal> : <div className="empty-state">Показатели готовятся к публикации.</div>}
    </div></section>

    <section className="section-compact"><div className="container">
      <Reveal><SectionHeading eyebrow={content["home.coaches"].eyebrow} title={content["home.coaches"].title} description={content["home.coaches"].description} /></Reveal>
      {coachList.length ? <div className="card-grid">{coachList.slice(0, 3).map((coach) => <CoachCard key={coach.id} coach={coach} />)}</div> : <div className="empty-state">Состав тренеров готовится к публикации.</div>}
      <div className="section-action"><Link href="/coaches" className="text-link">Все тренеры <ArrowRight className="arrow" size={17} /></Link></div>
    </div></section>

    <section className="section"><div className="container">
      <Reveal><SectionHeading eyebrow={content["home.programs"].eyebrow} title={content["home.programs"].title} description={content["home.programs"].description} /></Reveal>
      {programList.length ? <div className="card-grid">{programList.slice(0, 3).map((program, index) => <ProgramCard key={program.id} program={program} index={index} />)}</div> : <div className="empty-state">Программы готовятся к публикации.</div>}
    </div></section>

    <section className="dark-section">
      {content["home.achievements"].body ? <div className="container quote-block"><Reveal><p className="quote">{content["home.achievements"].body}</p></Reveal></div> : null}
      <div className="container section-compact">
        <SectionHeading eyebrow={content["home.achievements"].eyebrow} title={content["home.achievements"].title} description={content["home.achievements"].description} />
        {achievementList.length ? <div className="achievement-list">{achievementList.slice(0, 3).map((item) => <div className="achievement-row" key={item.id}><div><div className="achievement-result">{item.title}</div><div className="achievement-name">{item.studentName}</div></div><div className="achievement-event">{item.event}</div><div className="achievement-event">{item.description}</div><time className="achievement-date">{new Intl.DateTimeFormat("ru-RU", { year: "numeric", month: "short" }).format(item.date)}</time></div>)}</div> : <div className="empty-state">Достижения готовятся к публикации.</div>}
        <div className="section-action"><Link href="/achievements" className="btn btn-outline">Смотреть все результаты <ArrowRight className="arrow" size={17} /></Link></div>
      </div>
    </section>

    <section className="section"><div className="container">
      <Reveal><SectionHeading eyebrow={content["home.news"].eyebrow} title={content["home.news"].title} description={content["home.news"].description} /></Reveal>
      {posts.length ? <div className="card-grid">{posts.slice(0, 3).map((post) => <NewsCard key={post.id} post={post} />)}</div> : <div className="empty-state">Публикаций пока нет.</div>}
    </div></section>

    <section className="section lead-section" id="trial"><div className="container lead-layout">
      <aside className="lead-aside"><p className="eyebrow">{content["home.trial"].eyebrow}</p><h2 className="heading-xl">{content["home.trial"].title}</h2><p className="lede lead-description">{content["home.trial"].description}</p></aside>
      <LeadForm programs={programList} submitText={content["home.trial"].ctaText} />
    </div></section>
  </>;
}
