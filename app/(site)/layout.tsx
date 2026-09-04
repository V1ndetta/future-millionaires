import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#main">Перейти к содержанию</a><SiteHeader /><main id="main">{children}</main><SiteFooter /></>;
}
