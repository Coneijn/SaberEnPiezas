import { prisma } from "@/lib/prisma";
import { ProductItem } from "@/types/product";

export const FALLBACK_PRODUCTS: ProductItem[] = [
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

export async function getProducts(): Promise<ProductItem[]> {
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