import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "BM Chess — шахматная школа «Будущие миллионеры»", template: "%s | BM Chess" },
  description: "Шахматная школа «Будущие миллионеры» (BM Chess) в Астане: обучение, турнирная подготовка и сильный тренерский состав.",
  keywords: ["BM Chess", "Будущие миллионеры", "шахматная школа Астана", "обучение шахматам", "шахматный тренер Астана"],
  openGraph: {
    title: "BM Chess — шахматная школа в Астане",
    description: "Шахматная школа «Будущие миллионеры»: системная подготовка, турнирная практика и сильные тренеры.",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/images/hero-academy.png", width: 1536, height: 1024, alt: "BM Chess — шахматная школа" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
