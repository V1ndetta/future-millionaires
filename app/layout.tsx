import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Будущие миллионеры — шахматная школа", template: "%s | Будущие миллионеры" },
  description: "Современная шахматная школа в Алматы: системное обучение, турнирная практика и индивидуальная траектория роста.",
  keywords: ["шахматная школа", "шахматы для детей", "Алматы", "шахматный тренер", "детские шахматы"],
  openGraph: { title: "Будущие миллионеры — шахматная школа", description: "Школа мышления для тех, кто готов видеть дальше одного хода.", locale: "ru_KZ", type: "website", images: [{ url: "/images/hero-academy.png", width: 1536, height: 1024, alt: "Ученик шахматной школы за игрой" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
