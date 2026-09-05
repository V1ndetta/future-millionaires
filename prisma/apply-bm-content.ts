import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const phone = "+7 747 683 9373";

const pageContents = [
  { key: "home.hero", eyebrow: "Шахматная школа", title: "Будущие\nмиллионеры", description: "Шахматная школа в Астане с сильной спортивной базой, системной подготовкой и тренерами с большим соревновательным опытом.", body: "", ctaText: "Записаться на пробное" },
  { key: "home.ticker", eyebrow: "", title: "Бегущая строка", description: "", body: "Системная подготовка\nТурнирная практика\nСильные тренеры\nИндивидуальный прогресс", ctaText: "" },
  { key: "home.why", eyebrow: "BM Chess", title: "Шахматы как школа решений", description: "В BM Chess ребёнок учится считать варианты, принимать решения под давлением, разбирать ошибки и последовательно расти от занятия к занятию.", body: "", ctaText: "" },
  { key: "home.coaches", eyebrow: "Тренерский состав", title: "Опыт, который передают ученикам", description: "Школу возглавляет международный мастер и международный арбитр FIDE Рустам Кайырбеков. В числе ведущих тренеров — КМС Андрей Кван, чемпион Казахстана среди юношей до 16 лет.", body: "", ctaText: "" },
  { key: "home.programs", eyebrow: "Обучение", title: "Подготовка под уровень и цель", description: "Начинающие, продолжающие, турнирная подготовка и индивидуальная работа. Точную группу, нагрузку и расписание администратор подбирает после знакомства с учеником.", body: "", ctaText: "" },
  { key: "home.achievements", eyebrow: "Спортивная база", title: "Сильный результат начинается с системы", description: "У школы сильный тренерский фундамент: игровой опыт, работа с разрядниками и практика подготовки к соревнованиям.", body: "Думать глубже. Играть смелее. Расти системно.", ctaText: "" },
  { key: "home.news", eyebrow: "Жизнь школы", title: "Новости и турниры", description: "Турниры, события школы и результаты учеников. Актуальные материалы также публикуются в Instagram @bm.chess.", body: "", ctaText: "" },
  { key: "home.trial", eyebrow: "Первый шаг", title: "Пробное занятие", description: "Оставьте контакты — администратор уточнит возраст и уровень ученика, подберёт подходящую площадку и формат занятий.", body: "Заявка принята. Мы свяжемся с вами в течение рабочего дня.", ctaText: "Отправить заявку" },
  { key: "about.hero", eyebrow: "О школе", title: "BM Chess — шахматная школа в Астане", description: "Несколько площадок в городе, сильный тренерский состав и системный подход к развитию шахматиста.", body: "", ctaText: "" },
  { key: "about.story", eyebrow: "Основатель школы", title: "Рустам Кайырбеков", description: "", body: "Кайырбеков Рустам Байтурсынович — основатель и директор шахматной школы «Будущие миллионеры», международный мастер (IM) и международный арбитр FIDE (IA). Профессиональный шахматист, тренер и организатор с опытом преподавания более 10 лет.\n\nВ тренерской работе делает акцент на системной подготовке и спортивном результате. Среди его учеников — чемпион Казахстана среди юношей, победители и призёры международных турниров. Имеет сертификат курса подготовки тренеров FIDE, проводит занятия на казахском, русском и английском языках.\n\nСудейский опыт включает работу на соревнованиях международного уровня FIDE. В актуальной базе арбитров FIDE Рустам Кайырбеков имеет звание International Arbiter.", ctaText: "" },
  { key: "about.principles", eyebrow: "Подход", title: "", description: "", body: "", ctaText: "" },
  { key: "about.principle.1", eyebrow: "01 / Система", title: "Понимать позицию, а не заучивать ходы", description: "Тренировка строится вокруг логики решений, расчёта вариантов и понимания типовых позиций.", body: "", ctaText: "" },
  { key: "about.principle.2", eyebrow: "02 / Практика", title: "Готовиться к реальной игре", description: "Турнирная практика, работа с часами, разбор партий и привычка спокойно действовать в сложных позициях.", body: "", ctaText: "" },
  { key: "about.principle.3", eyebrow: "03 / Рост", title: "Двигаться от уровня к уровню", description: "Задача тренера — видеть текущую точку ученика и давать нагрузку, которая приводит к следующему шагу.", body: "", ctaText: "" },
  { key: "about.cta", eyebrow: "", title: "Начните с пробного занятия", description: "Администратор поможет выбрать площадку и подходящий формат обучения.", body: "", ctaText: "Записаться" },
  { key: "coaches.hero", eyebrow: "Команда", title: "Тренеры с серьёзной шахматной школой", description: "На этой странице собраны ключевые специалисты BM Chess. Остальной тренерский состав будет дополнен после финального наполнения сайта.", body: "", ctaText: "" },
  { key: "programs.hero", eyebrow: "Программы", title: "От первых партий до турнирной подготовки", description: "Формат и нагрузка подбираются с учётом возраста, текущего уровня и целей ученика.", body: "", ctaText: "" },
  { key: "programs.cta", eyebrow: "", title: "Не знаете, какая группа подойдёт?", description: "Оставьте заявку — администратор уточнит уровень и предложит подходящий вариант.", body: "", ctaText: "" },
  { key: "schedule.hero", eyebrow: "Расписание", title: "Выберите удобную площадку", description: "Актуальное расписание групп и наличие мест уточняйте у администратора школы.", body: "", ctaText: "Записаться на пробное" },
  { key: "achievements.hero", eyebrow: "Достижения", title: "Результаты BM Chess", description: "Раздел будет пополняться актуальными достижениями учеников и результатами школы.", body: "", ctaText: "" },
  { key: "achievements.feature", eyebrow: "Подход", title: "Каждая партия — материал для следующего шага", description: "", body: "", ctaText: "" },
  { key: "news.hero", eyebrow: "Новости", title: "Турниры и жизнь школы", description: "Следите за актуальными событиями BM Chess на сайте и в Instagram @bm.chess.", body: "", ctaText: "" },
  { key: "gallery.hero", eyebrow: "Галерея", title: "BM Chess изнутри", description: "Фотографии занятий, турниров и мероприятий будут добавлены при финальном наполнении сайта.", body: "", ctaText: "" },
  { key: "contacts.hero", eyebrow: "Контакты", title: "BM Chess в Астане", description: "Выберите удобную площадку или свяжитесь с администратором школы.", body: "", ctaText: "" },
  { key: "contacts.connect", eyebrow: "Связаться", title: "+7 747 683 9373", description: "По этому номеру можно уточнить расписание, стоимость, наличие мест и записаться на пробное занятие.", body: "", ctaText: "Оставить заявку" },
  { key: "contacts.branches", eyebrow: "Площадки", title: "7 локаций в Астане", description: "Головной филиал — ул. Нурмагамбетова, 25.", body: "", ctaText: "" },
];

const coaches = [
  { id: "coach-rustam-kaiyrbekov", name: "Кайырбеков Рустам Байтурсынович", role: "Основатель и директор BM Chess", rank: "Международный мастер (IM) · Международный арбитр FIDE (IA)", bio: "Профессиональный шахматист, тренер и организатор. Более 10 лет занимается преподаванием шахмат и подготовкой учеников на спортивный результат. Среди воспитанников — чемпион Казахстана среди юношей, победители и призёры международных турниров. Имеет сертификат курса подготовки тренеров FIDE; проводит занятия на казахском, русском и английском языках. Судит соревнования международного уровня FIDE.", imageUrl: null, experience: 10, achievements: "Международный мастер • Международный арбитр FIDE • тренер чемпиона Казахстана среди юношей • подготовка победителей и призёров международных турниров • опыт работы на международных соревнованиях FIDE", order: 1, isPublished: true },
  { id: "coach-andrey-kvan", name: "Кван Андрей Висарионович", role: "Ведущий тренер BM Chess", rank: "Кандидат в мастера спорта", bio: "Сильный практик и опытный детский тренер. Чемпион Казахстана до 16 лет (2000), многократный призёр детских чемпионатов Казахстана (1999, 2001, 2002), победитель и призёр городских и республиканских соревнований. Продолжает активно играть в рейтинговых турнирах и сохраняет высокий практический уровень.", imageUrl: null, experience: 0, achievements: "Чемпион РК до 16 лет — 2000 • призёр детских чемпионатов РК — 1999, 2001, 2002 • призёр Pavlodar Open до 2100 — 2012 и 2014 • Мемориал Уфимцева: 3-е место — 2013, 1-е место — 2014 • победитель «Весенней Астаны» по быстрым шахматам и блицу — 2014", order: 2, isPublished: true },
];

const programs = [
  { id: "program-beginner", title: "Начальная подготовка", slug: "beginner", ageRange: "Возраст уточняется", level: "Начальный", description: "Правила, базовая тактика, развитие шахматного мышления и первые самостоятельные партии.", duration: "Расписание уточняйте", price: "Стоимость уточняйте", accent: "red", order: 1, isPublished: true },
  { id: "program-development", title: "Продолжающие", slug: "development", ageRange: "По уровню", level: "Базовый / средний", description: "Тактика, стратегия, эндшпиль, анализ партий и последовательный рост игрового уровня.", duration: "Расписание уточняйте", price: "Стоимость уточняйте", accent: "red", order: 2, isPublished: true },
  { id: "program-tournament", title: "Турнирная подготовка", slug: "tournament", ageRange: "По уровню", level: "Спортивный", description: "Подготовка к соревнованиям, работа над дебютом, практическими решениями и разбор сыгранных партий.", duration: "Расписание уточняйте", price: "Стоимость уточняйте", accent: "red", order: 3, isPublished: true },
  { id: "program-individual", title: "Индивидуальные занятия", slug: "individual", ageRange: "Индивидуально", level: "Любой", description: "Персональная программа под конкретные цели ученика и задачи подготовки.", duration: "По договорённости", price: "Стоимость уточняйте", accent: "red", order: 4, isPublished: true },
];

const branches = [
  { id: "branch-nurmagambetova", name: "Головной филиал", address: "ул. Нурмагамбетова, 25", district: "Астана", phone, hours: "По предварительной записи", mapUrl: null, order: 1, isPublished: true },
  { id: "branch-maylina", name: "Филиал Майлина", address: "ул. Майлина, 22А", district: "Астана", phone, hours: "По предварительной записи", mapUrl: null, order: 2, isPublished: true },
  { id: "branch-mangilik", name: "Филиал Мәңгілік Ел", address: "пр. Мәңгілік Ел, 57", district: "Астана", phone, hours: "По предварительной записи", mapUrl: null, order: 3, isPublished: true },
  { id: "branch-baitursynov", name: "BINOM им. А. Байтурсынова", address: "BINOM им. А. Байтурсынова", district: "Астана", phone, hours: "По предварительной записи", mapUrl: null, order: 4, isPublished: true },
  { id: "branch-bokeikhan", name: "Филиал Бокейхана", address: "ул. Бокейхана, 10", district: "Астана", phone, hours: "По предварительной записи", mapUrl: null, order: 5, isPublished: true },
  { id: "branch-satbaev", name: "BINOM им. К. Сатбаева", address: "BINOM им. К. Сатбаева", district: "Астана", phone, hours: "По предварительной записи", mapUrl: null, order: 6, isPublished: true },
  { id: "branch-quantum", name: "Quantum Tech School", address: "Quantum Tech School", district: "Астана", phone, hours: "По предварительной записи", mapUrl: null, order: 7, isPublished: true },
];

async function main() {
  await prisma.siteSettings.upsert({ where: { id: "main" }, update: { schoolName: "Будущие миллионеры", shortName: "BM Chess", tagline: "Шахматная школа", description: "Шахматная школа BM Chess в Астане. Системная подготовка, турнирная практика и сильный тренерский состав.", city: "Астана", country: "Казахстан", phone, email: "", address: "Астана, ул. Нурмагамбетова, 25", telegram: null, instagram: "https://www.instagram.com/bm.chess/", whatsapp: "https://wa.me/77476839373", foundedYear: 0, studentsCount: 0 }, create: { id: "main", schoolName: "Будущие миллионеры", shortName: "BM Chess", tagline: "Шахматная школа", description: "Шахматная школа BM Chess в Астане. Системная подготовка, турнирная практика и сильный тренерский состав.", city: "Астана", country: "Казахстан", phone, email: "", address: "Астана, ул. Нурмагамбетова, 25", telegram: null, instagram: "https://www.instagram.com/bm.chess/", whatsapp: "https://wa.me/77476839373", foundedYear: 0, studentsCount: 0 } });
  for (const content of pageContents) await prisma.pageContent.upsert({ where: { key: content.key }, update: content, create: content });

  await prisma.homeStat.updateMany({ data: { isPublished: false } });
  for (const stat of [
    { id: "bm-stat-locations", value: "7", label: "площадок BM Chess в Астане", order: 1, isPublished: true },
    { id: "bm-stat-im", value: "IM", label: "международный мастер — основатель школы", order: 2, isPublished: true },
    { id: "bm-stat-ia", value: "IA", label: "международный арбитр FIDE — основатель школы", order: 3, isPublished: true },
    { id: "bm-stat-languages", value: "3", label: "языка преподавания у основателя школы", order: 4, isPublished: true },
  ]) await prisma.homeStat.upsert({ where: { id: stat.id }, update: stat, create: stat });

  await prisma.coach.updateMany({ data: { isPublished: false } });
  await prisma.program.updateMany({ data: { isPublished: false } });
  await prisma.branch.updateMany({ data: { isPublished: false } });
  await prisma.studentAchievement.updateMany({ data: { isPublished: false } });
  await prisma.newsPost.updateMany({ data: { isPublished: false } });
  await prisma.galleryImage.updateMany({ data: { isPublished: false } });

  for (const coach of coaches) await prisma.coach.upsert({ where: { id: coach.id }, update: coach, create: coach });
  for (const program of programs) await prisma.program.upsert({ where: { slug: program.slug }, update: program, create: program });
  for (const branch of branches) await prisma.branch.upsert({ where: { id: branch.id }, update: branch, create: branch });

  console.log("BM Chess production content applied.");
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => prisma.$disconnect());
