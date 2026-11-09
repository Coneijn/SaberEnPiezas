import { SITE_CONFIG } from "@/config/site";

export function ContactSection() {
  const contactWhatsAppUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hola Alexis, me interesa cotizar material didáctico para una escuela."
  )}`;

  return (
    <section
      id="contacto"
      className="scroll-mt-24 my-16 rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-salvia-700">
            Atención a Colegios e Instituciones
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-indigo-950">
            Equipa tu aula con nosotros
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Solicita cotizaciones por volumen, muestras de materiales o el diseño de kits pedagógicos
            a la medida de tu plan de estudios en Tarímbaro, Morelia y toda la República Mexicana.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3.5 text-sm font-medium">
          <div className="font-display font-bold text-base text-indigo-950">
            {SITE_CONFIG.name} · Taller de Diseño Didáctico
          </div>
          <div className="text-slate-600 font-mono text-xs">
            {SITE_CONFIG.location}, México
          </div>
          <a
            href={contactWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-semibold text-salvia-700 hover:text-salvia-600 hover:underline"
          >
            WhatsApp: +52 (558) 204-5284
          </a>
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}`}
            className="font-mono text-slate-600 hover:text-indigo-950 hover:underline"
          >
            {SITE_CONFIG.contactEmail}
          </a>
        </div>
      </div>
    </section>
  );
}