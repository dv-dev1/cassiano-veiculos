"use client";

import { useMemo, useState } from "react";
import { FileDown } from "lucide-react";
import { formatPreco } from "@/lib/format";
import {
  resumoVendas,
  rotuloPeriodo,
  janelaDoPeriodo,
  PERIODOS,
  type Periodo,
  type Janela,
} from "@/data/vendas-mock";
import { Sparkline } from "./Sparkline";

function pct(fracao: number): string {
  return `${(fracao * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}

export function VisaoVendas() {
  const [periodo, setPeriodo] = useState<Periodo>("mes");
  const inicial = janelaDoPeriodo("mes");
  const [custom, setCustom] = useState<Janela>({ de: inicial.de, ate: inicial.ate });

  const r = useMemo(() => resumoVendas(periodo, custom), [periodo, custom]);
  const rotulo = rotuloPeriodo(periodo, custom);
  const semVendas = r.vendas === 0;

  return (
    <section aria-labelledby="visao-vendas">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="visao-vendas" className="text-lg font-semibold text-secondary">
            Visão de vendas
          </h2>
          <p className="mt-0.5 text-sm text-muted-strong">
            Acompanhe as vendas de <span className="text-secondary/80">{rotulo}</span>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-line bg-surface px-3.5 py-2 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-sand"
        >
          <FileDown size={16} strokeWidth={1.9} />
          Exportar PDF
        </button>
      </div>

      {/* Seletor de período */}
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Período">
        {PERIODOS.map((p) => {
          const ativo = periodo === p.valor;
          return (
            <button
              key={p.valor}
              type="button"
              onClick={() => setPeriodo(p.valor)}
              aria-pressed={ativo}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                ativo
                  ? "bg-primary text-white"
                  : "border border-line bg-surface text-secondary/80 hover:bg-sand"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Intervalo personalizado */}
      {periodo === "custom" && (
        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-[var(--radius)] border border-line bg-surface px-4 py-3">
          <label className="flex items-center gap-2 text-sm text-secondary">
            De
            <input
              type="date"
              value={custom.de}
              max={custom.ate}
              onChange={(e) => setCustom((c) => ({ ...c, de: e.target.value }))}
              className="rounded-[calc(var(--radius)-4px)] border border-line bg-background px-2.5 py-1.5 text-sm text-secondary focus:border-primary focus:outline-none"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-secondary">
            até
            <input
              type="date"
              value={custom.ate}
              min={custom.de}
              onChange={(e) => setCustom((c) => ({ ...c, ate: e.target.value }))}
              className="rounded-[calc(var(--radius)-4px)] border border-line bg-background px-2.5 py-1.5 text-sm text-secondary focus:border-primary focus:outline-none"
            />
          </label>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-strong">
        Os três números abaixo mudam conforme o período escolhido acima.
      </p>

      {/* Cards */}
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        <CardVenda
          label="Lucro"
          valor={formatPreco(r.lucro)}
          legenda={semVendas ? "sem vendas no período" : `margem ${pct(r.margem)} sobre o faturamento`}
          serie={r.serie.lucro}
          cor="var(--success)"
        />
        <CardVenda
          label="Faturamento"
          valor={formatPreco(r.faturamento)}
          legenda={semVendas ? "nada faturado no período" : `ticket médio ${formatPreco(r.ticketMedio)} por venda`}
          serie={r.serie.faturamento}
          cor="var(--primary)"
        />
        <CardVenda
          label="Vendas"
          valor={String(r.vendas)}
          legenda={r.vendas === 1 ? "carro vendido no período" : "carros vendidos no período"}
          serie={r.serie.vendas}
          cor="var(--secondary)"
        />
      </div>
    </section>
  );
}

function CardVenda({
  label,
  valor,
  legenda,
  serie,
  cor,
}: {
  label: string;
  valor: string;
  legenda: string;
  serie: number[];
  cor: string;
}) {
  return (
    <div className="rounded-[var(--radius)] border border-line bg-surface p-5 shadow-[var(--shadow-soft)]">
      <p className="text-sm font-medium text-muted-strong">{label}</p>
      <p className="mt-2 text-[1.9rem] font-semibold leading-none tabular-nums text-secondary">
        {valor}
      </p>
      <p className="mt-2 text-xs text-muted-strong">{legenda}</p>
      <Sparkline valores={serie} cor={cor} className="mt-3 h-8 w-full" />
    </div>
  );
}
