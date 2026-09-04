import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AdminHeader({ title, description }: { title: string; description: string }) {
  return <header className="admin-header"><div><h1 className="admin-title">{title}</h1><p className="admin-subtitle">{description}</p></div><Link className="btn btn-outline btn-small" href="/" target="_blank">Открыть сайт <ArrowUpRight size={15} /></Link></header>;
}
