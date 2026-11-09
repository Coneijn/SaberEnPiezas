import { ProductItem } from "@/types/product";
import { SITE_CONFIG } from "@/config/site";

export function ProductCard({ item }: { item: ProductItem }) {
  const availableStock = item.inventory
    ? item.inventory.stockOnHand - item.inventory.stockReserved
    : null;

  const orderUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hola, me interesa solicitar el material "${item.title}" (${item.sku}) de Saber En Piezas.`
  )}`;

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-salvia-600/60 hover:shadow-md">
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
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-indigo-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-salvia-700"
        >
          Pedir pieza
        </a>
      </div>
    </div>
  );
}