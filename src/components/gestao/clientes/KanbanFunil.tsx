"use client";

import { useState } from "react";
import {
  ETAPAS,
  type EstagioFunil,
  type Lead,
} from "@/data/clientes-mock";
import { LeadCard } from "./LeadCard";

/**
 * Board do funil. No desktop, arrasta o card entre colunas (HTML5 drag nativo,
 * sem lib). No mobile/teclado, o "Mover" do card resolve — o drag nativo não
 * cobre toque nem teclado, então o <select> do LeadCard é o caminho universal.
 */
export function KanbanFunil({
  leads,
  onMover,
  onEditar,
}: {
  leads: Lead[];
  onMover: (id: string, destino: EstagioFunil) => void;
  onEditar: (lead: Lead) => void;
}) {
  const [arrastandoId, setArrastandoId] = useState<string | null>(null);
  const [sobreCol, setSobreCol] = useState<EstagioFunil | null>(null);

  function soltar(destino: EstagioFunil) {
    if (arrastandoId) onMover(arrastandoId, destino);
    setArrastandoId(null);
    setSobreCol(null);
  }

  return (
    <div className="-mx-1 overflow-x-auto pb-2">
      <div className="flex min-w-max gap-3 px-1">
        {ETAPAS.map((etapa) => {
          const daColuna = leads.filter((l) => l.estagio === etapa.id);
          const ativa = sobreCol === etapa.id;
          return (
            <section
              key={etapa.id}
              onDragOver={(e) => {
                if (!arrastandoId) return;
                e.preventDefault();
                setSobreCol(etapa.id);
              }}
              onDrop={(e) => {
                e.preventDefault();
                soltar(etapa.id);
              }}
              className="flex w-[266px] shrink-0 flex-col"
              aria-label={`Etapa ${etapa.label}, ${daColuna.length} ${
                daColuna.length === 1 ? "cliente" : "clientes"
              }`}
            >
              {/* Cabeçalho da coluna */}
              <header
                className="flex items-center justify-between rounded-t-[var(--radius)] px-3 py-2 text-white"
                style={{ backgroundColor: etapa.cor }}
              >
                <span className="text-sm font-semibold">{etapa.label}</span>
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white/25 px-1.5 text-xs font-semibold tabular-nums">
                  {daColuna.length}
                </span>
              </header>

              {/* Corpo — drop zone */}
              <div
                className={`flex flex-1 flex-col gap-2.5 rounded-b-[var(--radius)] border border-t-0 p-2.5 transition-colors duration-150 ${
                  ativa
                    ? "border-primary bg-primary/5"
                    : "border-line bg-sand/35"
                }`}
                style={{ minHeight: "60vh" }}
              >
                {daColuna.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => setArrastandoId(lead.id)}
                    onDragEnd={() => {
                      setArrastandoId(null);
                      setSobreCol(null);
                    }}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <LeadCard
                      lead={lead}
                      arrastando={arrastandoId === lead.id}
                      onMover={onMover}
                      onEditar={onEditar}
                    />
                  </div>
                ))}

                {daColuna.length === 0 && (
                  <div className="grid flex-1 place-items-center rounded-[calc(var(--radius)-4px)] border border-dashed border-line px-3 py-8 text-center">
                    <p className="text-xs text-muted">
                      {ativa ? "Solte aqui" : "Nenhum cliente"}
                    </p>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
