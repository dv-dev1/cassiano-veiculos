import { Car } from "lucide-react";
import { formatPreco } from "@/lib/format";
import type { Lead } from "@/data/clientes-mock";

function dataBonita(iso?: string) {
  if (!iso) return "—";
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/**
 * Aba "Compradores" — lista limpa de quem fechou. Não é o funil (esse é
 * kanban); aqui é o registro histórico de vendas, ordenado do mais recente.
 */
export function Compradores({ leads }: { leads: Lead[] }) {
  const compradores = leads
    .filter((l) => l.estagio === "vendeu")
    .sort((a, b) => (b.fechadoEm ?? "").localeCompare(a.fechadoEm ?? ""));

  const total = compradores.reduce((s, l) => s + (l.valorVenda ?? 0), 0);

  if (compradores.length === 0) {
    return (
      <div className="grid place-items-center rounded-[var(--radius)] border border-dashed border-line bg-surface px-6 py-16 text-center">
        <p className="text-sm font-medium text-secondary">Nenhuma venda ainda.</p>
        <p className="mt-1 max-w-xs text-sm text-muted">
          Quando um lead do funil for pra “Vendeu”, ele aparece aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-line bg-surface shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="text-sm font-medium text-secondary">
          {compradores.length}{" "}
          {compradores.length === 1 ? "comprador" : "compradores"}
        </p>
        <p className="text-sm text-muted">
          Total vendido{" "}
          <span className="font-semibold tabular-nums text-success-ink">
            {formatPreco(total)}
          </span>
        </p>
      </div>

      <ul className="divide-y divide-line">
        {compradores.map((l) => (
          <li
            key={l.id}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-secondary">
                {l.nome}
              </p>
              {l.carro && (
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                  <Car size={13} strokeWidth={1.8} className="shrink-0" />
                  <span className="truncate">{l.carro}</span>
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold tabular-nums text-success-ink">
                {formatPreco(l.valorVenda ?? 0)}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {l.formaPagamento ?? "—"} · {dataBonita(l.fechadoEm)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
