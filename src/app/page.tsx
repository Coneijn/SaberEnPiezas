import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface ProductItem {
id?: string;
sku: string;
title: string;
slug: string;
material: string;
stage: string;
description: string;
price: number;
inventory?: {
stockOnHand: number;
stockReserved: number;
} | null;
}

const FALLBACK_PRODUCTS: ProductItem[] = [
{
sku: "SIL-MDF-01",
title: "Silabario Didáctico",
slug: "silabario-didactico",
material: "MDF 2.5mm · Grabado Láser",
stage: "Lectoescritura · 3+ años",
description:
"Piezas táctiles con encastre de precisión para formar sílabas y palabras. Activa la memoria muscular y la conciencia fonológica desde edades tempranas.",
price: 280,
inventory: null,
},
{
sku: "PUZ-3D-01",
title: "Rompecabezas Estructural 3D",
slug: "rompecabezas-3d",
material: "MDF 2.5mm · Corte Láser",
stage: "Razonamiento espacial · 6+ años",
description:
"Estructuras tridimensionales autoensamblables sin adhesivos. Estimula la percepción viso-espacial, la planeación ejecutiva y la estabilidad geométrica.",
price: 320,
inventory: null,
},
{
sku: "MAT-FRAC-01",
title: "Kit de Fracciones Tangibles",
slug: "kit-de-fracciones",
material: "PLA · Impresión 3D FDM",
stage: "Aritmética · 8+ años",
description:
"Módulos fraccionarios de 1/1 a 6/6 superponibles. Transforma conceptos aritméticos abstractos en evidencia física e intuitiva para el alumno.",
price: 350,
inventory: null,
},
{
sku: "ALG-TRIN-01",
title: "Kit Trinomio Cuadrado",
slug: "kit-trinomio-cuadrado",
material: "PLA · Prismas Codificados",
stage: "Álgebra Montessori · 12+ años",
description:
"Representación volumétrica de (a+b+c)². Permite verificar la expansión algebraica construyendo cada término geométrico con prismas de color.",
price: 490,
inventory: null,
},
{
sku: "ALG-BIN-01",
title: "Kit Binomio al Cubo",
slug: "kit-binomio-al-cubo",
material: "PLA · Precisión 3D",
stage: "Álgebra y Volumen · 14+ años",
description:
"Demostración geométrica tridimensional de (a+b)³. Hace comprensible el paso al grado 3 mediante la descomposición física del cubo en prismas congruentes.",
price: 520,
inventory: null,
},
{
sku: "CUS-PUZ-01",
title: "Rompecabezas Pedagógico Personalizado",
slug: "rompecabezas-personalizado",
material: "MDF 2.5mm + Impresión HD",
stage: "Memoria e Identidad · Todas las edades",
description:
"Elaboración sobre pedido para proyectos curriculares de colegios: cartografía de Michoacán, tablas periódicas, biología o efemérides institucionales.",
price: 380,
inventory: null,
},
];

async function getProducts(): Promise<ProductItem[]> {
"use cache";

try {
const dbProducts = await prisma.product.findMany({
where: { isActive: true },
include: { inventory: true },
orderBy: { createdAt: "asc" },
});

if (dbProducts.length === 0) return FALLBACK_PRODUCTS;

return dbProducts.map((p) => {
  const fallback = FALLBACK_PRODUCTS.find((f) => f.sku === p.sku);
  return {
    id: p.id,
    sku: p.sku,
    title: p.title,
    slug: p.slug,
    material: fallback?.material ?? "Fabricación Local",
    stage: fallback?.stage ?? "Educativo",
    description: p.description ?? fallback?.description ?? "",
    price: Number(p.basePrice),
    inventory: p.inventory
      ? {
          stockOnHand: p.inventory.stockOnHand,
          stockReserved: p.inventory.stockReserved,
        }
      : null,
  };
});


} catch (error) {
console.error("Error al consultar la base de datos:", error);
return FALLBACK_PRODUCTS;
}
}

/

Componente modular con[ciencia] bajo la norma de marca de la Ruta 3.

Admite modo 'modular' (con bloque rígido biselado) o 'inline' (salto tipográfico directo).
*/
function ConCiencia({
mode = "modular",
className = "",
}: {
mode?: "modular" | "inline";
className?: string;
}) {
if (mode === "inline") {
return (
<span className={inline-flex items-baseline font-display ${className}}>
con
ciencia

);
}

return (
<span className={inline-flex items-baseline font-display ${className}}>
con

ciencia


);
}

/

Isotipo Cúbico Isométrico (3 Caras: Salvia, Índigo, Ámbar)
/
function CubeIcon({ className = "w-9 h-9" }: { className?: string }) {
return (

{/ Cara Superior: Verde Salvia /}

{/ Cara Izquierda: Índigo Profundo /}

{/ Cara Derecha: Ámbar Pedagógico /}

{/ Muesca Central de Acoplamiento */}


);
}

export default async function HomePage() {
const products = await getProducts();
const whatsappNumber = "525582045284";
const contactEmail = "alexis@alexiscerda.com.mx";

return (

{/* Header Institucional */}







Saber En Piezas




Tarímbaro · Michoacán




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
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "¡Hola! Me gustaría cotizar material didáctico de Saber En Piezas para mi institución escolar."
          )}`}
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

  <main className="mx-auto max-w-6xl px-6">
    {/* Hero Section: Enfoque B2B y Cognición Activa */}
    <section className="py-16 md:py-24">
      <div className="inline-flex items-center gap-2 rounded-full border border-salvia-600/20 bg-salvia-50 px-3.5 py-1 text-xs font-semibold text-salvia-700">
        <span className="w-2 h-2 rounded-full bg-salvia-600 animate-pulse" />
        <span className="font-mono uppercase text-[11px] tracking-wider">
          Ingeniería Didáctica &amp; Manufactura Local
        </span>
      </div>

      <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-indigo-950 sm:text-5xl md:text-6xl md:leading-[1.12]">
        Recursos Didácticos con Verdadera{" "}
        <ConCiencia mode="modular" className="align-middle" />
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
        Kits matemáticos tangibles, silabarios y rompecabezas estructurales fabricados en Tarímbaro.
        Diseñamos herramientas que permiten al docente convertir conceptos abstractos en evidencia
        física e interactiva dentro del aula.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Link
          href="#productos"
          className="rounded-xl bg-indigo-950 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-900"
        >
          Explorar Catálogo Curricular
        </Link>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "¡Hola! Soy director/docente en Michoacán y me interesa conocer materiales y paquetes por lote para mi colegio."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-indigo-950 shadow-xs transition hover:border-salvia-600 hover:bg-slate-50"
        >
          Asesoría para Escuelas (Lotes)
        </a>
      </div>

      {/* Métricas / Respaldos del Taller */}
      <div className="mt-14 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-4">
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
    </section>

    {/* Catálogo de Productos */}
    <section id="productos" className="scroll-mt-24 border-t border-slate-200 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-xl">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-salvia-700">
            Colección en Taller · Tarímbaro
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-indigo-950">
            Herramientas Diseñadas para Explorar
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Cada kit activa la motricidad, la formulación espacial y la comprobación tangible desde
            preescolar hasta educación media superior.
          </p>
        </div>
        <span className="font-mono text-xs text-slate-500">
          Precios transparentes en MXN · Facturación B2B
        </span>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => {
          const availableStock = item.inventory
            ? item.inventory.stockOnHand - item.inventory.stockReserved
            : null;

          return (
            <div
              key={item.sku}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-salvia-600/60 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600 font-medium">
                    {item.material}
                  </span>
                  {availableStock !== null ? (
                    availableStock > 0 ? (
                      <span className="font-semibold text-salvia-700">
                        {availableStock} en taller
                      </span>
                    ) : (
                      <span className="font-semibold text-ambar-600">Corte bajo pedido</span>
                    )
                  ) : (
                    <span className="text-slate-400">Tarímbaro, Mich.</span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-indigo-950 group-hover:text-salvia-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-ambar-700 font-medium">{item.stage}</p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    Inversión Unitaria
                  </span>
                  <p className="font-mono text-lg font-bold text-indigo-950">
                    ${item.price.toFixed(2)} MXN
                  </p>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hola, me interesa solicitar el material "${item.title}" (${item.sku}) de Saber En Piezas.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-indigo-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-salvia-700"
                >
                  Pedir pieza
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>

    {/* Pedagogía Activa / Cognición Encarnada */}
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

    {/* Nuestro Taller */}
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

    {/* Contacto / CTA Institucional */}
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
            Saber En Piezas · Taller de Diseño Didáctico
          </div>
          <div className="text-slate-600 font-mono text-xs">
            Tarímbaro, Michoacán, México
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hola Alexis, me interesa cotizar material didáctico para una escuela."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-semibold text-salvia-700 hover:text-salvia-600 hover:underline"
          >
            WhatsApp: +52 (558) 204-5284
          </a>
          <a
            href={`mailto:${contactEmail}`}
            className="font-mono text-slate-600 hover:text-indigo-950 hover:underline"
          >
            {contactEmail}
          </a>
        </div>
      </div>
    </section>
  </main>

  {/* Footer */}
  <footer className="border-t border-slate-200 bg-white py-12 text-center text-xs text-slate-500">
    <div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-center gap-3">
      <CubeIcon className="w-7 h-7" />
      <p className="font-display font-bold text-indigo-950 text-sm">Saber En Piezas</p>
      <p className="text-slate-500 font-mono text-[11px]">
        Manufactura de precisión en Tarímbaro, Michoacán · © 2026 Saber En Piezas
      </p>
      <div className="mt-2">
        <ConCiencia mode="inline" className="text-xs" />
      </div>
    </div>
  </footer>
</div>


);
}