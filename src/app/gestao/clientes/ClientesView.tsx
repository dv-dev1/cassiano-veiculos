"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Users,
  Handshake,
  PhoneCall,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { StatCard } from "@/components/gestao/StatCard";
import { NovoClienteModal } from "@/components/gestao/NovoClienteModal";
import type { VeiculoGestao } from "@/data/gestao-mock";
import type { EstagioFunil } from "@/data/clientes-mock";
import {
  useLeads,
  adicionarLead,
  moverLead,
  criarLead,
  type NovoClienteDados,
} from "@/lib/clientes-store";
import { KanbanFunil } from "@/components/gestao/clientes/KanbanFunil";
import { Compradores } from "@/components/gestao/clientes/Compradores";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const HOJE_ISO = "2026-07-21"; // mock — troca pelo relógio real com o Supabase
const ATIVAS: EstagioFunil[] = [
  "lead-novo",
  "visita-marcada",
  "negociando",
  "ligar-volta",
];

function noMes(iso: string | undefined, ano: number, mes: number) {
  return !!iso && iso.startsWith(`${ano}-${String(mes + 1).padStart(2, "0")}`);
}

export function ClientesView({
  veiculos,
}: {
  veiculos: Pick<VeiculoGestao, "id" | "titulo" | "preco">[];
}) {
  const leads = useLeads();
  const [aba, setAba] = useState<"funil" | "compradores">("funil");
  const [ano, setAno] = useState(2026);
  const [mes, setMes] = useState(6); // 0-idx → Julho (mês corrente do mock)
  const [modalAberto, setModalAberto] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  // O "Novo cliente" da sidebar (global) navega pra cá com ?novo=1 e abre o
  // formulário direto — em vez de parar numa página. Limpa o parâmetro depois
  // pra o refresh não reabrir.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("novo") === "1") {
      setModalAberto(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const stats = useMemo(() => {
    return {
      ativos: leads.filter((l) => ATIVAS.includes(l.estagio)).length,
      negociando: leads.filter((l) => l.estagio === "negociando").length,
      atrasados: leads.filter(
        (l) => l.estagio === "ligar-volta" && l.retornarEm && l.retornarEm < HOJE_ISO,
      ).length,
      vendasMes: leads.filter(
        (l) => l.estagio === "vendeu" && noMes(l.fechadoEm, ano, mes),
      ).length,
    };
  }, [leads, ano, mes]);

  // Board: ativas aparecem sempre; fechadas só do mês selecionado.
  const leadsVisiveis = useMemo(
    () =>
      leads.filter((l) =>
        ATIVAS.includes(l.estagio) ? true : noMes(l.fechadoEm, ano, mes),
      ),
    [leads, ano, mes],
  );

  function toast(msg: string) {
    setAviso(msg);
    window.clearTimeout((toast as unknown as { t?: number }).t);
    (toast as unknown as { t?: number }).t = window.setTimeout(
      () => setAviso(null),
      3200,
    );
  }

  function mover(id: string, destino: EstagioFunil) {
    moverLead(id, destino);
    // Ao fechar, salta pro mês corrente pra o card não sumir do board.
    if (destino === "vendeu" || destino === "nao-comprou") {
      setAno(2026);
      setMes(6);
    }
  }

  function salvarCliente(dados: NovoClienteDados) {
    const carro = veiculos.find((v) => v.id === dados.veiculoId)?.titulo;
    adicionarLead(criarLead(dados, carro));
    setAba("funil");
  }

  function passoMes(delta: number) {
    let m = mes + delta;
    let a = ano;
    if (m < 0) { m = 11; a -= 1; }
    if (m > 11) { m = 0; a += 1; }
    setMes(m);
    setAno(a);
  }

  return (
    <div>
      {/* Cabeçalho */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1 rounded-full border border-line bg-surface p-1">
            {(["funil", "compradores"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setAba(t)}
                aria-pressed={aba === t}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors duration-200 ${
                  aba === t
                    ? "bg-primary text-white"
                    : "text-secondary/70 hover:text-secondary"
                }`}
              >
                {t === "funil" ? "Funil" : "Compradores"}
              </button>
            ))}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-secondary">Clientes</h1>
          {aba === "funil" && (
            <p className="mt-1 max-w-md text-sm text-muted">
              No computador, arraste os cards entre as etapas. No celular, use o
              botão “Mover”.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setModalAberto(true)}
          className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(181,110,53,0.25)] transition-colors duration-200 hover:bg-primary-hover"
        >
          <Plus size={17} strokeWidth={2.25} />
          Novo cliente
        </button>
      </header>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Clientes ativos" valor={stats.ativos} icon={Users} tom="neutro" legenda="no funil" />
        <StatCard label="Em negociação" valor={stats.negociando} icon={Handshake} tom="neutro" legenda="fechando detalhe" />
        <StatCard label="Retornos atrasados" valor={stats.atrasados} icon={PhoneCall} tom={stats.atrasados > 0 ? "perigo" : "neutro"} legenda="ligar de volta" />
        <StatCard label="Vendas no mês" valor={stats.vendasMes} icon={BadgeCheck} tom="sucesso" legenda={`${MESES[mes]} ${ano}`} />
      </div>

      {aba === "funil" ? (
        <>
          {/* Filtro de mês (afeta as colunas fechadas) */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-muted">Vendeu/perdeu em:</span>
            <div className="flex items-center gap-1 rounded-[var(--radius)] border border-line bg-surface p-1">
              <button
                type="button"
                onClick={() => passoMes(-1)}
                aria-label="Mês anterior"
                className="grid h-7 w-7 place-items-center rounded-[calc(var(--radius)-5px)] text-muted transition-colors duration-200 hover:bg-sand hover:text-secondary"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="min-w-[7.5rem] text-center text-sm font-medium text-secondary">
                {MESES[mes]} {ano}
              </span>
              <button
                type="button"
                onClick={() => passoMes(1)}
                aria-label="Próximo mês"
                className="grid h-7 w-7 place-items-center rounded-[calc(var(--radius)-5px)] text-muted transition-colors duration-200 hover:bg-sand hover:text-secondary"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <KanbanFunil
              leads={leadsVisiveis}
              onMover={mover}
              onEditar={() => toast("Edição de lead entra na próxima fase (com o Supabase plugado).")}
            />
          </div>
        </>
      ) : (
        <div className="mt-6">
          <Compradores leads={leads} />
        </div>
      )}

      <NovoClienteModal
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        veiculos={veiculos}
        onSalvar={salvarCliente}
      />

      {aviso && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[70] flex max-w-[92vw] -translate-x-1/2 items-center gap-3 rounded-[var(--radius)] bg-secondary px-4 py-3 text-sm text-white shadow-[var(--shadow-hover)]"
        >
          <span>{aviso}</span>
          <button type="button" onClick={() => setAviso(null)} aria-label="Fechar aviso" className="text-white/70 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
