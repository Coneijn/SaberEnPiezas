import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const products = [
    {
      sku: "PUZ-3D-01",
      title: "Rompecabezas 3D",
      slug: "rompecabezas-3d",
      basePrice: 320,
      description:
        "Estructuras tridimensionales en MDF 2.5mm. Desarrolla la percepción viso-espacial y la planeación en niños de 6+ años.",
      stock: 8,
    },
    {
      sku: "MAT-FRAC-01",
      title: "Kit de Fracciones",
      slug: "kit-de-fracciones",
      basePrice: 350,
      description:
        "Piezas en PLA impreso en 3D de 1/1 a 6/6 para superponer y comparar aritmética abstracta en evidencia física.",
      stock: 15,
    },
    {
      sku: "ALG-TRIN-01",
      title: "Kit Trinomio Cuadrado",
      slug: "kit-trinomio-cuadrado",
      basePrice: 490,
      description:
        "Basado en pedagogía Montessori. Visualiza (a+b+c)² en prismas de colores impresos en PLA para comprender construyendo.",
      stock: 6,
    },
    {
      sku: "ALG-BIN-01",
      title: "Kit Binomio al Cubo",
      slug: "kit-binomio-al-cubo",
      basePrice: 520,
      description:
        "Demostración volumétrica tangible de (a+b)³ en PLA. Descubrimiento de la expansión algebraica de forma sensorial.",
      stock: 5,
    },
    {
      sku: "CUS-PUZ-01",
      title: "Rompecabezas Personalizado",
      slug: "rompecabezas-personalizado",
      basePrice: 380,
      description:
        "Corte láser de precisión en MDF 2.5mm a pedido con mapas, arte o fotos para estimulación cognitiva y memoria.",
      stock: 20,
    },
  ];

  for (const item of products) {
    const product = await prisma.product.upsert({
      where: { sku: item.sku },
      update: {
        title: item.title,
        description: item.description,
        basePrice: item.basePrice,
      },
      create: {
        sku: item.sku,
        title: item.title,
        slug: item.slug,
        description: item.description,
        basePrice: item.basePrice,
        inventory: {
          create: {
            stockOnHand: item.stock,
            stockReserved: 0,
          },
        },
      },
    });

    console.log(`Producto sincronizado: ${product.title} (${product.sku})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });