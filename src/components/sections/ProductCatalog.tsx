import { ProductItem } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductCatalog({ products }: { products: ProductItem[] }) {
  return (
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
        {products.map((item) => (
          <ProductCard key={item.sku} item={item} />
        ))}
      </div>
    </section>
  );
}