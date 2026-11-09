export function MethodologySection() {
    return (
      <section id="cognicion-activa" className="scroll-mt-24 border-t border-slate-200 py-16">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-salvia-700">
            Fundamento Metodológico
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-indigo-950">
            ¿Por qué aprender con las manos?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Nuestros materiales se basan en la <strong>cognición encarnada</strong> (<em>embodied cognition</em>):
            el cerebro asimila patrones complejos y estructuras lógicas con mayor profundidad cuando el
            sistema motor participa directamente en el proceso.
          </p>
        </div>
  
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <span className="text-2xl" role="img" aria-label="Táctil">✋</span>
            <h3 className="mt-3 font-display text-base font-bold text-indigo-950">
              Memoria Muscular del Trazo
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              El MDF de 2.5mm ofrece la masa, peso y resistencia idónea para que los dedos reconozcan
              límites físicos, fijando la lectoescritura y las formas geométricas en la memoria cinestésica.
            </p>
          </div>
  
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <span className="text-2xl" role="img" aria-label="Geometría">📐</span>
            <h3 className="mt-3 font-display text-base font-bold text-indigo-950">
              Abstracción Tangible
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              El PLA calibrado permite tolerancias exactas. Superponer piezas de fracciones o encastrar
              el cubo algebraico convierte el álgebra abstracta en una evidencia geométrica comprobable.
            </p>
          </div>
  
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <span className="text-2xl" role="img" aria-label="Cognición">🧠</span>
            <h3 className="mt-3 font-display text-base font-bold text-indigo-950">
              Función Ejecutiva y Foco
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Armar y clasificar piezas modulares fortalece la planeación secuencial, la atención
              sostenida y la tolerancia a la frustración tanto en alumnos regulares como con necesidades específicas.
            </p>
          </div>
  
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <span className="text-2xl" role="img" aria-label="Ubicación">📍</span>
            <h3 className="mt-3 font-display text-base font-bold text-indigo-950">
              Fabricación de Cercanía
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Operamos en Tarímbaro con tecnología propia (Bambu Lab A1 y Creality Falcon 10W), permitiendo
              personalizaciones directas para el programa de estudios de cada escuela sin intermediarios.
            </p>
          </div>
        </div>
      </section>
    );
  }