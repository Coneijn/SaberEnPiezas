import Link from "next/link";
import { ConCiencia } from "@/components/brand/ConCiencia";
import { SITE_CONFIG } from "@/config/site";
import { SomaCubeHero } from "@/components/hero/SomaCubeHero";

export function HeroSection() {
  const inquiryUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "¡Hola! Soy director/docente en Michoacán y me interesa conocer materiales y paquetes por lote para mi colegio."
  )}`;

  return (
    <section className="relative min-h-[660px] lg:min-h-[720px] overflow-hidden py-14 md:py-20 lg:py-24 flex flex-col justify-between">
      {/* Fondo Three.js interactivo */}
      <div className="absolute inset-0 z-0">
        <SomaCubeHero />
      </div>

      {/* Degradado tenue a la izquierda */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-white via-white/70 to-transparent z-5" />

      {/* Contenido en primer plano */}
      <div className="relative z-10 pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl lg:max-w-xl xl:max-w-2xl">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-salvia-600/20 bg-salvia-50/90 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold text-salvia-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-salvia-600 animate-pulse" />
            <span className="font-mono uppercase text-[11px] tracking-wider">
              Ingeniería Didáctica &amp; Manufactura Local
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-indigo-950 sm:text-5xl md:text-6xl md:leading-[1.12]">
            Recursos Didácticos con Verdadera <ConCiencia mode="modular" />
          </h1>

          {/* Ancho acotado + contorno perimetral blanco de protección */}
          <p className="mt-6 max-w-md lg:max-w-lg text-base leading-relaxed font-medium text-slate-800 sm:text-lg [text-shadow:_1px_1px_0_#ffffff,_-1px_-1px_0_#ffffff,_1px_-1px_0_#ffffff,_-1px_1px_0_#ffffff,_0_0_8px_rgba(255,255,255,0.95)]">
            Kits matemáticos tangibles, silabarios y rompecabezas estructurales fabricados en Tarímbaro.
            Diseñamos herramientas que permiten al docente convertir conceptos abstractos en evidencia
            física e interactiva dentro del aula.
          </p>

          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#productos"
              className="rounded-xl bg-indigo-950 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-900"
            >
              Explorar Catálogo Curricular
            </Link>
            <a
              href={inquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 bg-white/95 backdrop-blur-xs px-6 py-3.5 text-sm font-semibold text-indigo-950 shadow-xs transition hover:border-salvia-600 hover:bg-slate-50"
            >
              Asesoría para Escuelas (Lotes)
            </a>
          </div>
        </div>

        {/* Métricas / Respaldos del Taller */}
        <div className="pointer-events-auto mt-16 md:mt-24 grid grid-cols-2 gap-4 border-t border-slate-200/80 bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:grid-cols-4 shadow-2xs">
          <div>
            <p className="font-mono text-xs font-medium text-slate-500 uppercase">Enfoque</p>
            <p className="font-display font-semibold text-indigo-950 mt-1">Montessori &amp; STEAM</p>
          </div>
          <div>
            <p className="font-mono text-xs font-medium text-slate-500 uppercase">Tolerancia</p>
            <p className="font-mono font-semibold text-indigo-950 mt-1">±0.15 mm Precisión</p>
          </div>
          <div>
            <p className="font-mono text-xs font-medium text-slate-500 uppercase">Materiales</p>
            <p className="font-display font-semibold text-indigo-950 mt-1">MDF 2.5mm &amp; PLA</p>
          </div>
          <div>
            <p className="font-mono text-xs font-medium text-slate-500 uppercase">Origen</p>
            <p className="font-display font-semibold text-salvia-700 mt-1">Tarímbaro, Mich.</p>
          </div>
        </div>
      </div>
    </section>
  );
}