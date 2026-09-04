import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Будущие миллионеры — на главную">
      <svg className="brand-mark" viewBox="0 0 36 36" aria-hidden="true">
        <rect width="36" height="36" rx="9" fill="#111310" />
        <path d="M11 27h15v-3H11v3Zm2-5h11l-1.5-9H21V9h-6v4h-1.5L13 22Z" fill="#d8ff63" />
      </svg>
      {compact ? <span>БМ</span> : <span>Будущие<br />миллионеры</span>}
    </Link>
  );
}
