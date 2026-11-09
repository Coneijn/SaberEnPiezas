import Link from "next/link";
import { CubeIcon } from "@/components/brand/CubeIcon";
import { SITE_CONFIG } from "@/config/site";

export function Header() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.defaultWhatsAppMessage
  )}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <CubeIcon className="w-8 h-8" />
          <div>
            <p className="font-display font-bold leading-none text-indigo-950">
              {SITE_CONFIG.name}
            </p>
            <p className="mt-1 font-mono text-[10px] leading-none text-slate-500">
              {SITE_CONFIG.location}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link href="#productos" className="transition hover:text-indigo-950">
            Colección
          </Link>
          <Link href="#cognicion-activa" className="transition hover:text-indigo-950">
            Cognición Activa
          </Link>
          <Link href="#taller" className="transition hover:text-indigo-950">
            Nuestro Taller
          </Link>
          <Link href="#contacto" className="transition hover:text-indigo-950">
            Escuelas y Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-salvia-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-salvia-700"
          >
            <span>Mesa Pedagógica</span>
            <span className="hidden sm:inline font-mono text-[11px] opacity-80">· WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}