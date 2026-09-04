import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Будущие миллионеры — шахматная школа", template: "%s | Будущие миллионеры" },
  description: "Официальный сайт шахматной школы «Будущие миллионеры».",
  keywords: ["шахматная школа", "обучение шахматам", "шахматный тренер"],
  openGraph: { title: "Будущие миллионеры — шахматная школа", description: "Официальный сайт шахматной школы.", locale: "ru_RU", type: "website", images: [{ url: "/images/hero-academy.png", width: 1536, height: 1024, alt: "Шахматная партия" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
