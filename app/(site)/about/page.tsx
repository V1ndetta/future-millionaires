import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "О школе", description: "Подход, история и принципы шахматной школы «Будущие миллионеры»." };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="О школе" title="Учимся думать на несколько ходов вперёд" description="Мы создали среду, где амбиция не давит, а дисциплина не отменяет любопытство." index="01" />
      <section className="section"><div className="container split">
        <div className="feature-image"><Image src="/images/tournament.png" alt="Турнирный зал школы" fill priority sizes="(max-width: 980px) 100vw, 50vw" /></div>
        <div><p className="eyebrow">С 2018 года</p><h2 className="heading-lg">Шахматы как способ понимать мир</h2><div className="prose" style={{ marginTop: "2rem" }}><p>«Будущие миллионеры» начинались с одной небольшой группы и простой идеи: сильный игрок растёт там, где ему задают сильные вопросы.</p><p>Сегодня в двух филиалах занимаются более 480 учеников. Мы соединяем классическую шахматную школу, регулярную практику и современную аналитику. Каждый семестр заканчивается не формальной оценкой, а персональной картой прогресса.</p></div></div>
      </div></section>
      <section className="section-compact"><div className="container"><p className="eyebrow">Наши принципы</p><div className="principles">
        <article className="principle"><span className="card-number">01 / Ясность</span><h3 className="heading-md">Понимать, а не запоминать</h3><p>Тренер раскрывает логику позиции и помогает ученику найти собственный аргумент.</p></article>
        <article className="principle"><span className="card-number">02 / Практика</span><h3 className="heading-md">Играть в реальных условиях</h3><p>Турниры, часы, стресс и разбор — безопасная среда для настоящего опыта.</p></article>
        <article className="principle"><span className="card-number">03 / Характер</span><h3 className="heading-md">Отвечать за решение</h3><p>Мы учим спокойно принимать последствия хода и двигаться дальше без страха ошибки.</p></article>
      </div></div></section>
      <section className="section dark-section"><div className="container split"><h2 className="heading-xl">Пора сделать первый ход</h2><div><p className="lede">Пробное занятие поможет понять уровень ученика и выбрать подходящую группу.</p><Link href="/#trial" className="btn btn-primary" style={{ marginTop: "2rem" }}>Записаться <ArrowUpRight size={18} /></Link></div></div></section>
    </>
  );
}
