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
    material: "MDF 2.5mm · Grabado",
    stage: "Lectoescritura · 3+ años",
    description:
      "Piezas táctiles para formar sílabas y palabras. Activa la conciencia fonológica y la memoria muscular mientras el niño toca, arma y descubre.",
    price: 280,
    inventory: null,
  },
  {
    sku: "PUZ-3D-01",
    title: "Rompecabezas 3D",
    slug: "rompecabezas-3d",
    material: "MDF 2.5mm · 3D",
    stage: "Razonamiento espacial · 6+ años",
    description:
      "Construye estructuras y figuras tridimensionales. Desarrolla la percepción viso-espacial y la planeación, ideal para futuros ingenieros.",
    price: 320,
    inventory: null,
  },
  {
    sku: "MAT-FRAC-01",
    title: "Kit de Fracciones",
    slug: "kit-de-fracciones",
    material: "PLA · Impresión 3D",
    stage: "Matemáticas · 8+ años",
    description:
      "Piezas de 1/1 a 6/6 para superponer y comparar. Convierte la aritmética abstracta en una evidencia física que el niño puede tocar.",
    price: 350,
    inventory: null,
  },
  {
    sku: "ALG-TRIN-01",
    title: "Kit Trinomio Cuadrado",
    slug: "kit-trinomio-cuadrado",
    material: "PLA · Algebraico",
    stage: "Álgebra · 12+ años",
    description:
      "Basado en Montessori. Permite visualizar (a+b+c)² en piezas de colores. El estudiante comprende la fórmula porque la construye.",
    price: 490,
    inventory: null,
  },
  {
    sku: "ALG-BIN-01",
    title: "Kit Binomio al Cubo",
    slug: "kit-binomio-al-cubo",
    material: "PLA · Algebraico",
    stage: "Álgebra · 14+ años",
    description:
      "Demostración volumétrica de (a+b)³. Al armar el cubo y sus prismas, el alumno descubre la expansión algebraica de forma sensorial.",
    price: 520,
    inventory: null,
  },
  {
    sku: "CUS-PUZ-01",
    title: "Rompecabezas Personalizado",
    slug: "rompecabezas-personalizado",
    material: "MDF 2.5mm · A pedido",
    stage: "Memoria y enfoque · Todas las edades",
    description:
      "Convierte cualquier imagen (mapas, fotos, arte) en un puzzle único. Fomenta la concentración y la resolución de problemas.",
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

export default async function HomePage() {
  const products = await getProducts();
  const whatsappNumber = "525582045284";
  const contactEmail = "alexis@alexiscerda.com.mx";

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 antialiased selection:bg-amber-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#faf8f5]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <Link href="/" className="text-xl font-black tracking-tight text-amber-900">
              Saber En Piezas
            </Link>
            <p className="text-[11px] font-medium uppercase tracking-wider text-amber-800/70">
              Hecho en Tarímbaro · Michoacán
            </p>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-600 sm:flex">
            <Link href="#productos" className="transition hover:text-amber-800">
              Productos
            </Link>
            <Link href="#valor-didactico" className="transition hover:text-amber-800">
              Valor Didáctico
            </Link>
            <Link href="#taller" className="transition hover:text-amber-800">
              Nuestro Taller
            </Link>
            <Link href="#contacto" className="transition hover:text-amber-800">
              Contacto
            </Link>
          </nav>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "¡Hola! Me gustaría cotizar material didáctico de Saber En Piezas."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-amber-800 px-4 py-2 text-xs font-bold text-amber-50 shadow-sm transition hover:bg-amber-900"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100/60 px-3 py-1 text-xs font-semibold text-amber-900">
            <span>🖐️</span>
            <span>Aprender con las manos</span>
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
            Recursos Didácticos con{" "}
            <span className="text-amber-800 underline decoration-amber-400 decoration-wavy underline-offset-4">
              Verdadera Conciencia
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
            Silabarios, rompecabezas 3D y kits matemáticos fabricados en Tarímbaro. Cada pieza está
            diseñada para convertir conceptos abstractos en experiencias táctiles inolvidables.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#productos"
              className="rounded-xl bg-amber-800 px-6 py-3.5 text-sm font-bold text-white shadow transition hover:bg-amber-900"
            >
              Ver colección
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "¡Hola! Soy docente en Michoacán y me interesa conocer materiales para mi escuela."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50"
            >
              Asesoría para Escuelas
            </a>
          </div>
        </section>

        {/* Catálogo de Productos */}
        <section id="productos" className="scroll-mt-24 border-t border-stone-200 py-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Saber En Piezas · Tarímbaro
            </span>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-stone-900">
              Diseñados para Explorar
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              Cada recurso está pensado para activar la motricidad, la lógica y la comprensión
              profunda, desde preescolar hasta preparatoria.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((item) => {
              const availableStock = item.inventory
                ? item.inventory.stockOnHand - item.inventory.stockReserved
                : null;

              return (
                <div
                  key={item.sku}
                  className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="rounded bg-stone-100 px-2 py-0.5 text-stone-600">
                        {item.material}
                      </span>
                      {availableStock !== null ? (
                        availableStock > 0 ? (
                          <span className="font-semibold text-emerald-700">
                            {availableStock} en taller
                          </span>
                        ) : (
                          <span className="font-semibold text-amber-700">Corte bajo pedido</span>
                        )
                      ) : (
                        <span className="text-stone-400">Tarímbaro</span>
                      )}
                    </div>

                    <h3 className="mt-4 text-xl font-bold tracking-tight text-stone-900 group-hover:text-amber-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-amber-800">{item.stage}</p>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400">
                        Inversión
                      </span>
                      <p className="text-lg font-black text-stone-900">
                        ${item.price.toFixed(2)} MXN
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hola, me interesa el material "${item.title}" (${item.sku}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-900"
                    >
                      Pedir pieza
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pedagogía Activa / Valor Didáctico */}
        <section id="valor-didactico" className="scroll-mt-24 border-t border-stone-200 py-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Pedagogía activa
            </span>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-stone-900">
              ¿Solo madera y plástico? Claro que no
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Basados en la cognición encarnada (<em>embodied cognition</em>): el cerebro aprende mejor
              cuando el cuerpo participa activamente.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <span className="text-2xl">✋</span>
              <h3 className="mt-3 text-base font-bold text-stone-900">Aprendizaje táctil</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                El MDF de 2.5mm ofrece el peso y la textura justos para que los dedos reconozcan las
                formas y fijen el trazo en la memoria muscular.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <span className="text-2xl">📐</span>
              <h3 className="mt-3 text-base font-bold text-stone-900">Abstracción tangible</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                El PLA permite geometrías exactas. Superponer fracciones o armar un cubo algebraico
                convierte lo abstracto en una evidencia física irrefutable.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <span className="text-2xl">🧠</span>
              <h3 className="mt-3 text-base font-bold text-stone-900">Motricidad y enfoque</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Armar, desarmar y encajar piezas desarrolla la motricidad fina, la paciencia y la
                función ejecutiva (planeación y atención sostenida).
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <span className="text-2xl">📍</span>
              <h3 className="mt-3 text-base font-bold text-stone-900">Hecho en Tarímbaro</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Fabricamos localmente con impresoras Artillery Genius y grabador Creality Falcon
                10W, asegurando calidad, proximidad y personalización única.
              </p>
            </div>
          </div>
        </section>

        {/* Nuestro Taller */}
        <section id="taller" className="scroll-mt-24 border-t border-stone-200 py-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Fabricación local
            </span>
            <h2 className="mt-1 text-3xl font-black tracking-tight text-stone-900">
              Nuestro Taller
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              Tecnología de punta en el corazón de Michoacán. Cada pieza cortada o impresa con
              precisión milimétrica.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-900 p-6 text-white shadow-sm">
              <span className="rounded bg-stone-800 px-2 py-1 text-[11px] font-bold text-amber-400">
                Impresión 3D · PLA
              </span>
              <h3 className="mt-4 text-lg font-bold">Artillery Genius</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Precisión y fiabilidad para nuestros kits matemáticos, prismas algebraicos y
                fracciones superponibles.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-900 p-6 text-white shadow-sm">
              <span className="rounded bg-stone-800 px-2 py-1 text-[11px] font-bold text-amber-400">
                Grabado Láser · MDF
              </span>
              <h3 className="mt-4 text-lg font-bold">Creality Falcon 10W</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Corte y grabado de alta definición para silabarios de lectoescritura, bordes limpios
                y puzzles tridimensionales.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-900 p-6 text-white shadow-sm">
              <span className="rounded bg-stone-800 px-2 py-1 text-[11px] font-bold text-amber-400">
                Impresión a color
              </span>
              <h3 className="mt-4 text-lg font-bold">HP SmartTank 525</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Material impreso de alta resolución para guías pedagógicas, fichas de trabajo y
                acompañamientos didácticos.
              </p>
            </div>
          </div>
        </section>

        {/* Contacto / CTA */}
        <section
          id="contacto"
          className="scroll-mt-24 my-16 rounded-3xl border border-amber-200 bg-amber-50/70 p-8 md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Escríbenos
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900">
                ¿Quieres más información?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Cotiza tus materiales personalizados o pide asesoría pedagógica para tu escuela en
                Tarímbaro o cualquier parte de México.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3 text-sm">
              <div className="font-bold text-stone-900">Saber En Piezas</div>
              <div className="text-stone-600">Tarímbaro, Michoacán, México</div>
              <a
                href={`tel:${whatsappNumber}`}
                className="font-medium text-amber-900 hover:underline"
              >
                +52 (558) 204-5284
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium text-amber-900 hover:underline"
              >
                {contactEmail}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-10 text-center text-xs text-stone-500">
        <p className="font-semibold text-stone-700">Saber En Piezas</p>
        <p className="mt-1">Hecho a mano y con tecnología en Tarímbaro, Michoacán.</p>
        <p className="mt-4">
          © 2026 Saber En Piezas. Todos los derechos reservados.
        </p>
        <p className="mt-1 font-medium text-amber-800">
          Diseñado con ❤️ para la educación Michoacana.
        </p>
      </footer>
    </div>
  );
}