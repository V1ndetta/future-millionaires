export const contentBlueprints = [
  { key: "home.hero", label: "Главная · Hero", fields: ["eyebrow", "title", "description", "ctaText"] },
  { key: "home.ticker", label: "Главная · Бегущая строка", fields: ["body"] },
  { key: "home.why", label: "Главная · Почему мы", fields: ["eyebrow", "title", "description"] },
  { key: "home.coaches", label: "Главная · Тренеры", fields: ["eyebrow", "title", "description"] },
  { key: "home.programs", label: "Главная · Программы", fields: ["eyebrow", "title", "description"] },
  { key: "home.achievements", label: "Главная · Достижения", fields: ["eyebrow", "title", "description", "body"] },
  { key: "home.news", label: "Главная · Новости", fields: ["eyebrow", "title", "description"] },
  { key: "home.trial", label: "Главная · Пробное занятие", fields: ["eyebrow", "title", "description", "body", "ctaText"] },
  { key: "about.hero", label: "О школе · Hero", fields: ["eyebrow", "title", "description"] },
  { key: "about.story", label: "О школе · История", fields: ["eyebrow", "title", "body"] },
  { key: "about.principles", label: "О школе · Принципы", fields: ["eyebrow", "title", "description"] },
  { key: "about.principle.1", label: "О школе · Принцип 1", fields: ["eyebrow", "title", "description"] },
  { key: "about.principle.2", label: "О школе · Принцип 2", fields: ["eyebrow", "title", "description"] },
  { key: "about.principle.3", label: "О школе · Принцип 3", fields: ["eyebrow", "title", "description"] },
  { key: "about.cta", label: "О школе · CTA", fields: ["title", "description", "ctaText"] },
  { key: "coaches.hero", label: "Тренеры · Hero", fields: ["eyebrow", "title", "description"] },
  { key: "programs.hero", label: "Программы · Hero", fields: ["eyebrow", "title", "description"] },
  { key: "programs.cta", label: "Программы · Подбор", fields: ["title", "description"] },
  { key: "schedule.hero", label: "Расписание · Hero", fields: ["eyebrow", "title", "description", "ctaText"] },
  { key: "achievements.hero", label: "Достижения · Hero", fields: ["eyebrow", "title", "description"] },
  { key: "achievements.feature", label: "Достижения · Итог", fields: ["eyebrow", "title", "description"] },
  { key: "news.hero", label: "Новости · Hero", fields: ["eyebrow", "title", "description"] },
  { key: "gallery.hero", label: "Галерея · Hero", fields: ["eyebrow", "title", "description"] },
  { key: "contacts.hero", label: "Контакты · Hero", fields: ["eyebrow", "title", "description"] },
  { key: "contacts.connect", label: "Контакты · Связаться", fields: ["eyebrow", "title", "description", "ctaText"] },
  { key: "contacts.branches", label: "Контакты · Филиалы", fields: ["eyebrow", "title", "description"] },
] as const;

export type ContentKey = (typeof contentBlueprints)[number]["key"];
export type ContentField = "eyebrow" | "title" | "description" | "body" | "ctaText";

export type EditablePageContent = {
  contentKey: string;
  eyebrow: string;
  title: string;
  description: string;
  body: string;
  ctaText: string;
};

export const emptyPageContent = (key: string): EditablePageContent => ({
  contentKey: key,
  eyebrow: "",
  title: "Информация готовится к публикации",
  description: "",
  body: "",
  ctaText: "Подробнее",
});

export function splitContentLines(value: string) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}
