export function WorkshopSection() {
    return (
      <section id="taller" className="scroll-mt-24 border-t border-slate-200 py-16">
        <div className="max-w-xl">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-salvia-700">
            Infraestructura Técnica
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-indigo-950">
            Laboratorio y Taller Local
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Tecnología de manufactura digital en Michoacán. Cada kit se ensambla y calibra con tolerancias
            mecánicas de grado profesional.
          </p>
        </div>
  
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-indigo-950 p-6 text-white shadow-sm border border-indigo-900">
            <span className="font-mono rounded bg-salvia-600/30 text-salvia-50 px-2 py-1 text-[11px] font-semibold">
              Impresión 3D · PLA
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">Bambu Lab A1</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Fiabilidad de extrusión y calibración activa para prismas algebraicos, piezas fraccionarias y
              encastres volumétricos sin holguras.
            </p>
          </div>
  
          <div className="rounded-2xl bg-indigo-950 p-6 text-white shadow-sm border border-indigo-900">
            <span className="font-mono rounded bg-salvia-600/30 text-salvia-50 px-2 py-1 text-[11px] font-semibold">
              Grabado Láser · MDF
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">Creality Falcon 10W</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Corte limpio y micrograbado de bajo relieve para silabarios de lectoescritura, tableros
              didácticos y rompecabezas 3D.
            </p>
          </div>
  
          <div className="rounded-2xl bg-indigo-950 p-6 text-white shadow-sm border border-indigo-900">
            <span className="font-mono rounded bg-salvia-600/30 text-salvia-50 px-2 py-1 text-[11px] font-semibold">
              Color de Alta Resolución
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">HP SmartTank 525</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Impresión nítida para guías metodológicas, fichas de trabajo para el docente y acompañamientos
              curriculares en aula.
            </p>
          </div>
        </div>
      </section>
    );
  }