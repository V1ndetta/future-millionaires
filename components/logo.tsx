import Link from "next/link";

export function Logo({ compact = false, name = "Будущие миллионеры", shortName = "БМ" }: { compact?: boolean; name?: string; shortName?: string }) {
  return (
    <Link href="/" className="brand" aria-label={`${name} — на главную`}>
      <svg className="brand-mark" viewBox="0 0 36 36" aria-hidden="true">
        <rect width="36" height="36" rx="9" fill="#111310" />
        <path d="M11 27h15v-3H11v3Zm2-5h11l-1.5-9H21V9h-6v4h-1.5L13 22Z" fill="#d8ff63" />
      </svg>
      {compact ? <span>{shortName}</span> : <span>{name.split(" ").map((part, index) => <span key={part}>{part}{index < name.split(" ").length - 1 ? <br /> : null}</span>)}</span>}
    </Link>
  );
}
