import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/logo";
import { getSessionUserId } from "@/lib/auth";

export const metadata: Metadata = { title: "Вход в админ-панель", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (await getSessionUserId()) redirect("/admin");
  return <main className="login-page"><div className="login-visual"><Image src="/images/tournament.png" alt="" fill priority sizes="50vw" /></div><div className="login-panel"><div className="login-card"><Logo /><p className="eyebrow">Закрытый раздел</p><h1 className="heading-lg">Панель директора</h1><p className="text-muted">Управление сайтом, расписанием и заявками.</p><LoginForm /></div></div></main>;
}
