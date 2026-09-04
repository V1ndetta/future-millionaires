import Link from "next/link";

export default function NotFound() {
  return <main className="container section"><p className="eyebrow">404</p><h1 className="heading-xl">Такой страницы нет</h1><p className="lede" style={{ margin: "1.5rem 0" }}>Похоже, этот вариант не вошёл в партию.</p><Link href="/" className="btn btn-dark">На главную</Link></main>;
}
