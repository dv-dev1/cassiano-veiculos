"use client";

import { Car, Pencil, MoveRight } from "lucide-react";
import { WhatsappIcon } from "@/components/WhatsappIcon";
import { formatPreco } from "@/lib/format";
import { whatsappLinkPara } from "@/lib/loja";
import {
  ETAPAS,
  type EstagioFunil,
  type Lead,
} from "@/data/clientes-mock";

function primeiroNome(nome: string) {
  return nome.split(" ")[0];
}

function estaAtrasado(retornarEm?: string) {
  // Hoje é 2026-07-21 (mock). Compara só a data ISO, sem depender de Date.now.
  return !!retornarEm && retornarEm < "2026-07-21";
}

/**
 * Card de um lead no funil. Presentação + ações (WhatsApp real, Editar, Mover).
 * O arraste é responsabilidade da coluna (envolve o card num wrapper
 * `draggable`); aqui o "Mover" é um <select> nativo — caminho acessível e
 * touch-friendly, sem clipping dentro da coluna com scroll.
 */
export function LeadCard({
  lead,
  arrastando = false,
  onMover,
  onEditar,
}: {
  lead: Lead;
  arrastando?: boolean;
  onMover: (id: string, destino: EstagioFunil) => void;
  onEditar: (lead: Lead) => void;
}) {
  const vendeu = lead.estagio === "vendeu";
  const naoComprou = lead.estagio === "nao-comprou";
  const atrasado = lead.estagio === "ligar-volta" && estaAtrasado(lead.retornarEm);

  const datas = [
    lead.conversaEm && { rotulo: "Conversa", valor: lead.conversaEm, tom: "muted" },
    lead.visitaEm && { rotulo: "Visita", valor: lead.visitaEm, tom: "primary" },
    lead.veioEm && { rotulo: "Veio", valor: lead.veioEm, tom: "success" },
  ].filter(Boolean) as { rotulo: string; valor: string; tom: string }[];

  const mensagem = `Olá ${primeiroNome(lead.nome)}, aqui é da Cassiano Veículos 👋`;

  return (
    <div
      className={`rounded-[calc(var(--radius)-2px)] border border-line bg-surface p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-shadow duration-200 ${
        arrastando ? "opacity-50" : "hover:shadow-[var(--shadow-soft)]"
      }`}
    >
      {/* Nome + telefone */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight text-secondary">
            {lead.nome}
          </p>
          <p className="mt-0.5 text-xs tabular-nums text-muted-strong">
            {lead.telefoneLabel}
          </p>
        </div>
        {atrasado && (
          <span className="shrink-0 rounded-full bg-danger-bg px-2 py-0.5 text-[0.65rem] font-semibold text-danger-ink">
            atrasado
          </span>
        )}
      </div>

      {/* Linha de fechamento (vendeu / não comprou) */}
      {vendeu && lead.valorVenda != null && (
        <p className="mt-2 text-sm font-semibold text-success-ink">
          Vendido por {formatPreco(lead.valorVenda)}
          {lead.formaPagamento && (
            <span className="font-normal text-success-ink/80"> · {lead.formaPagamento}</span>
          )}
        </p>
      )}
      {naoComprou && lead.motivoPerda && (
        <p className="mt-2 text-sm font-medium text-secondary/70">
          {lead.motivoPerda}
        </p>
      )}

      {/* Carro de interesse */}
      {lead.carro && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-secondary/85">
          <Car size={13} strokeWidth={1.8} className="shrink-0 text-muted" />
          <span className="truncate">{lead.carro}</span>
        </p>
      )}

      {/* Origem */}
      {lead.origem && (
        <p className="mt-1.5 text-xs uppercase leading-relaxed tracking-wide text-muted-strong">
          {lead.origem}
        </p>
      )}

      {/* Nota */}
      {lead.nota && (
        <p className="mt-2 rounded-[calc(var(--radius)-6px)] bg-sand/60 px-2.5 py-1.5 text-xs leading-snug text-secondary/80">
          {lead.nota}
        </p>
      )}

      {/* Datas */}
      {datas.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          {datas.map((d) => (
            <span
              key={d.rotulo}
              className={
                d.tom === "primary"
                  ? "text-primary"
                  : d.tom === "success"
                    ? "text-success-ink"
                    : "text-muted-strong"
              }
            >
              {d.rotulo} {d.valor}
            </span>
          ))}
        </div>
      )}

      {/* Ações */}
      <div className="mt-3 flex items-center gap-1.5">
        <a
          href={whatsappLinkPara(lead.telefone, mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          aria-label={`Chamar ${primeiroNome(lead.nome)} no WhatsApp`}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[calc(var(--radius)-5px)] bg-whatsapp text-white transition-colors duration-200 hover:bg-whatsapp-hover"
        >
          <WhatsappIcon className="h-4 w-4" />
        </a>
        <button
          type="button"
          draggable={false}
          onClick={() => onEditar(lead)}
          className="inline-flex items-center gap-1.5 rounded-[calc(var(--radius)-5px)] border border-line px-2.5 py-1.5 text-xs font-medium text-secondary transition-colors duration-200 hover:bg-sand"
        >
          <Pencil size={13} />
          Editar
        </button>

        {/* Mover — <select> nativo: acessível, touch, sem clipping */}
        <div className="relative ml-auto">
          <MoveRight
            size={14}
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted"
          />
          <select
            aria-label={`Mover ${primeiroNome(lead.nome)} para outra etapa`}
            value=""
            onChange={(e) => {
              if (e.target.value) onMover(lead.id, e.target.value as EstagioFunil);
            }}
            className="cursor-pointer appearance-none rounded-[calc(var(--radius)-5px)] border border-line bg-surface py-1.5 pl-7 pr-2.5 text-xs font-medium text-secondary transition-colors duration-200 hover:bg-sand focus:border-primary focus:outline-none"
          >
            <option value="" disabled>
              Mover
            </option>
            {ETAPAS.filter((et) => et.id !== lead.estagio).map((et) => (
              <option key={et.id} value={et.id}>
                {et.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
