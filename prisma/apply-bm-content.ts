import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pageContents = [
  {
    key: "home.hero",
    eyebrow: "Шахматная школа · Астана",
    title: "Будущие\nмиллионеры",
    description: "BM Chess объединяет онлайн- и офлайн-обучение: на официальном сайте школа сообщает о 1000+ учениках из 10 стран мира.",
    body: "",
    ctaText: "Бесплатное пробное занятие",
  },
  {
    key: "home.why",
    eyebrow: "BM Chess",
    title: "Своя методика. Своя платформа.",
    description: "Школа сочетает занятия с тренерами, турнирную практику и собственную шахматную платформу с видеоуроками. Обучение строится для начинающих, любителей и игроков спортивного уровня.",
    body: "",
    ctaText: "",
  },
  {
    key: "home.coaches",
    eyebrow: "Тренерский состав",
    title: "Сильная шахматная база",
    description: "В составе преподавателей BM Chess есть гроссмейстеры, международные мастера, мастера FIDE и кандидаты в мастера спорта. Ключевые специалисты школы представлены ниже.",
    body: "",
    ctaText: "",
  },
  {
    key: "home.programs",
    eyebrow: "Тарифы",
    title: "Онлайн и офлайн занятия",
    description: "На официальном сайте BM Chess опубликованы три основных тарифа. Каждый включает регулярные занятия и отдельные игровые дни.",
    body: "",
    ctaText: "",
  },
  {
    key: "home.achievements",
    eyebrow: "Ученики BM Chess",
    title: "Результаты на турнирах",
    description: "На официальном сайте школа отмечает призёров чемпионатов Казахстана, Азии и Австрии, а также победителя Финала детского Кубка Казахстана.",
    body: "Элиана Спади — 3 место на Чемпионате Австрии\nАкылжан Мейржанулы — победитель Финала детского Кубка Казахстана\nДэниель Фойген — бронзовый призёр чемпионата Азии\nАяулым Калдыбек — 3 место на турнире РК",
    ctaText: "",
  },
  {
    key: "home.trial",
    eyebrow: "Бесплатный урок",
    title: "Пробное занятие — 1 час",
    description: "На пробном занятии ответят на вопросы, определят текущий уровень, подберут подходящую группу и сыграют первую партию.",
    body: "Заявка принята. Мы свяжемся с вами в течение рабочего дня.",
    ctaText: "Записаться бесплатно",
  },
  {
    key: "about.hero",
    eyebrow: "О школе",
    title: "BM Chess — онлайн и офлайн",
    description: "Шахматная школа из Астаны с собственной обучающей платформой, международной аудиторией и сильным тренерским составом.",
    body: "",
    ctaText: "",
  },
  {
    key: "programs.hero",
    eyebrow: "Тарифы",
    title: "Выберите комфортный период обучения",
    description: "Тарифы BM Chess рассчитаны на регулярные занятия и игровые дни. Формат обучения — онлайн или офлайн.",
    body: "",
    ctaText: "",
  },
  {
    key: "programs.cta",
    eyebrow: "",
    title: "Не знаете, какой вариант выбрать?",
    description: "Начните с бесплатного пробного занятия: школа определит уровень и поможет подобрать группу и формат.",
    body: "",
    ctaText: "",
  },
  {
    key: "achievements.hero",
    eyebrow: "Наши чемпионы",
    title: "Результаты учеников BM Chess",
    description: "Достижения, которые школа публикует на своём официальном сайте.",
    body: "",
    ctaText: "",
  },
  {
    key: "achievements.feature",
    eyebrow: "Ученики школы",
    title: "От Казахстана до международных стартов",
    description: "BM Chess отмечает результаты своих учеников на национальных и международных соревнованиях.",
    body: "Элиана Спади — 3 место на Чемпионате Австрии\nАкылжан Мейржанулы — победитель Финала детского Кубка Казахстана\nДэниель Фойген — бронзовый призёр чемпионата Азии\nАяулым Калдыбек — 3 место на турнире РК",
    ctaText: "",
  },
  {
    key: "contacts.connect",
    eyebrow: "Связаться",
    title: "+7 747 683 9373",
    description: "Запись на бесплатное пробное занятие, подбор группы, расписание и вопросы по обучению. Почта школы: chessleader.school@gmail.com.",
    body: "",
    ctaText: "Оставить заявку",
  },
];

const programs = [
  {
    slug: "beginner",
    title: "1 месяц",
    ageRange: "Онлайн / офлайн",
    level: "Все уровни",
    description: "8 занятий и 4 игровых дня.",
    duration: "1 месяц",
    price: "25 000 ₸",
    accent: "red",
    order: 1,
    isPublished: true,
  },
  {
    slug: "development",
    title: "3 месяца",
    ageRange: "Онлайн / офлайн",
    level: "Все уровни",
    description: "24 занятия и 12 игровых дней.",
    duration: "3 месяца",
    price: "70 000 ₸",
    accent: "red",
    order: 2,
    isPublished: true,
  },
  {
    slug: "tournament",
    title: "6 месяцев",
    ageRange: "Онлайн / офлайн",
    level: "Все уровни",
    description: "48 занятий и 24 игровых дня.",
    duration: "6 месяцев",
    price: "130 000 ₸",
    accent: "red",
    order: 3,
    isPublished: true,
  },
];

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {
      schoolName: "Будущие миллионеры",
      shortName: "BM Chess",
      tagline: "Шахматная школа",
      description: "Шахматная школа BM Chess в Астане: онлайн- и офлайн-обучение, собственная платформа и сильный тренерский состав.",
      city: "Астана",
      country: "Казахстан",
      phone: "+7 747 683 9373",
      email: "chessleader.school@gmail.com",
      address: "Астана, ул. Нурмагамбетова, 25",
      instagram: "https://www.instagram.com/bm.chess/",
      whatsapp: "https://wa.me/77476839373",
      telegram: null,
      foundedYear: 0,
      studentsCount: 1000,
    },
    create: {
      id: "main",
      schoolName: "Будущие миллионеры",
      shortName: "BM Chess",
      tagline: "Шахматная школа",
      description: "Шахматная школа BM Chess в Астане: онлайн- и офлайн-обучение, собственная платформа и сильный тренерский состав.",
      city: "Астана",
      country: "Казахстан",
      phone: "+7 747 683 9373",
      email: "chessleader.school@gmail.com",
      address: "Астана, ул. Нурмагамбетова, 25",
      instagram: "https://www.instagram.com/bm.chess/",
      whatsapp: "https://wa.me/77476839373",
      telegram: null,
      foundedYear: 0,
      studentsCount: 1000,
    },
  });

  for (const content of pageContents) {
    await prisma.pageContent.upsert({ where: { key: content.key }, update: content, create: content });
  }

  await prisma.homeStat.deleteMany();
  await prisma.homeStat.createMany({
    data: [
      { id: "stat-students", value: "1000+", label: "успешных учеников онлайн и офлайн", order: 1, isPublished: true },
      { id: "stat-countries", value: "10", label: "стран, где занимаются ученики школы", order: 2, isPublished: true },
      { id: "stat-levels", value: "GM · IM · FM · КМС", label: "уровни квалификации преподавателей", order: 3, isPublished: true },
      { id: "stat-formats", value: "02", label: "формата обучения: онлайн и офлайн", order: 4, isPublished: true },
    ],
  });

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: program,
      create: { ...program, id: `program-${program.slug}` },
    });
  }

  // Старые демо-достижения убираем. Подтвержденные результаты без точных дат
  // показываются через редактируемые блоки PageContent, чтобы не выдумывать даты.
  await prisma.studentAchievement.deleteMany();

  console.log("BM Chess official-site content applied.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
