import { CubeIcon } from "@/components/brand/CubeIcon";
import { ConCiencia } from "@/components/brand/ConCiencia";
import { SITE_CONFIG } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-center text-xs text-slate-500">
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-center gap-3">
        <CubeIcon className="w-7 h-7" />
        <p className="font-display font-bold text-indigo-950 text-sm">{SITE_CONFIG.name}</p>
        <p className="text-slate-500 font-mono text-[11px]">
          Manufactura de precisión en Tarímbaro, Michoacán · © 2026 {SITE_CONFIG.name}
        </p>
        <div className="mt-2">
          <ConCiencia mode="inline" className="text-xs" />
        </div>
      </div>
    </footer>
  );
}