import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { CoachCard } from "@/components/coach-card";
import { LeadForm } from "@/components/lead-form";
import { NewsCard } from "@/components/news-card";
import { ProgramCard } from "@/components/program-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getAchievements, getCoaches, getNews, getPrograms, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, coachList, programList, achievementList, posts] = await Promise.all([getSiteSettings(), getCoaches(), getPrograms(), getAchievements(), getNews()]);
  const ticker = ["Системное мышление", "Турнирная практика", "Сильные тренеры", "Индивидуальный прогресс", "Алматы · 2 филиала"];
  return (
    <>
      <section className="hero">
        <div className="hero-media"><Image className="hero-image" src="/images/hero-academy.png" alt="Ученик шахматной школы за шахматной доской" fill priority sizes="100vw" /></div>
        <div className="container hero-content stagger">
          <div className="hero-tag"><span />Шахматная школа · Алматы</div>
          <h1 className="display">Будущие<br />миллионеры</h1>
          <div className="hero-bottom">
            <p className="hero-copy">Не обещаем лёгких побед. Учим думать глубже, выбирать точнее и отвечать за свой ход.</p>
            <div className="hero-stat"><strong>{settings.studentsCount}+</strong> учеников</div>
            <Link href="#trial" className="btn btn-primary">Записаться на пробное <ArrowUpRight size={18} /></Link>
          </div>
        </div>
        <ArrowDown aria-hidden="true" style={{ position: "absolute", zIndex: 2, right: "1.5rem", bottom: "1.5rem", color: "#d8ff63" }} />
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[...ticker, ...ticker].map((item, index) => <span key={`${item}-${index}`} style={{ display: "contents" }}><span className="ticker-item">{item}</span><span className="ticker-dot" /></span>)}</div></div>

      <section className="section">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Почему мы" title="Интеллект — это навык" description="Шахматы для нас — не самоцель, а точная модель принятия решений. Ребёнок учится анализировать, спокойно действовать под давлением и превращать ошибки в рабочий материал." /></Reveal>
          <Reveal className="editorial-grid">
            <div className="metric"><strong className="metric-value">08</strong><span className="metric-label">лет развиваем шахматную культуру в Алматы</span></div>
            <div className="metric"><strong className="metric-value">26</strong><span className="metric-label">учеников с международным рейтингом</span></div>
            <div className="metric"><strong className="metric-value">91%</strong><span className="metric-label">семей продолжают обучение после первого сезона</span></div>
            <div className="metric"><strong className="metric-value">04</strong><span className="metric-label">игровых формата каждую неделю</span></div>
          </Reveal>
        </div>
      </section>

      <section className="section-compact">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Тренерский состав" title="Люди, которые видят потенциал" description="Спортивная квалификация важна. Но ещё важнее — способность объяснить сложное, услышать ученика и построить путь, который работает именно для него." /></Reveal>
          <div className="card-grid">{coachList.slice(0, 3).map((coach) => <CoachCard key={coach.id} coach={coach} />)}</div>
          <div style={{ marginTop: "2rem" }}><Link href="/coaches" className="text-link">Все тренеры <ArrowRight className="arrow" size={17} /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Программы" title="Маршрут от интереса до мастерства" description="Группы формируются не только по возрасту. Мы учитываем опыт, темп мышления и цель: уверенная игра, первый турнир или рост рейтинга." /></Reveal>
          <div className="card-grid">{programList.slice(0, 3).map((program, index) => <ProgramCard key={program.id} program={program} index={index} />)}</div>
        </div>
      </section>

      <section className="dark-section">
        <div className="container quote-block"><Reveal><p className="quote">«Талант даёт хороший старт. <em>Система</em> приводит к результату».</p></Reveal></div>
        <div className="container section-compact">
          <SectionHeading eyebrow="Результаты" title="Достижения учеников" description="За каждым местом и рейтингом — сотни принятых решений, разобранных ошибок и партий, которые хотелось сыграть лучше." />
          <div className="achievement-list">{achievementList.slice(0, 3).map((item) => <div className="achievement-row" key={item.id}><div><div className="achievement-result">{item.title}</div><div className="achievement-name">{item.studentName}</div></div><div className="achievement-event">{item.event}</div><div className="achievement-event">{item.description}</div><time className="achievement-date">{new Intl.DateTimeFormat("ru-RU", { year: "numeric", month: "short" }).format(item.date)}</time></div>)}</div>
          <div style={{ marginTop: "2rem" }}><Link href="/achievements" className="btn btn-outline">Смотреть все результаты <ArrowRight className="arrow" size={17} /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Жизнь школы" title="Новости и турниры" description="Ближайшие старты, истории роста и методические заметки наших тренеров." /></Reveal>
          <div className="card-grid">{posts.slice(0, 3).map((post) => <NewsCard key={post.id} post={post} />)}</div>
        </div>
      </section>

      <section className="section lead-section" id="trial">
        <div className="container lead-layout">
          <aside className="lead-aside"><p className="eyebrow">Первый шаг</p><h2 className="heading-xl">Пробное занятие</h2><p className="lede" style={{ marginTop: "1.5rem", color: "#303329" }}>Тренер определит уровень, проведёт короткую партию и предложит понятную траекторию обучения.</p></aside>
          <LeadForm programs={programList} />
        </div>
      </section>
    </>
  );
}
