import Image from "next/image";
import { Crown } from "lucide-react";

export function MediaImage({ src, alt, eager = false, sizes }: { src: string | null | undefined; alt: string; eager?: boolean; sizes: string }) {
  return src ? <Image src={src} alt={alt} fill loading={eager ? "eager" : undefined} sizes={sizes} /> : <div className="media-placeholder" role="img" aria-label={alt || "Изображение не добавлено"}><Crown aria-hidden="true" size={34} /></div>;
}
