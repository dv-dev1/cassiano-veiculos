"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Target,
  CalendarDays,
  Handshake,
  PhoneCall,
  Trophy,
  Pencil,
  Plus,
  ArrowRight,
  Check,
  X,
  Gauge,
} from "lucide-react";
import { StatCard } from "@/components/gestao/StatCard";
import { formatPreco } from "@/lib/format";
import { HOJE_ISO } from "@/lib/hoje";
import { useLeads, adicionarLead, criarVenda } from "@/lib/clientes-store";
import { useMeta, definirMeta } from "@/lib/metas-store";
import { resumoMetaMes } from "@/lib/metas";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FORMAS = [
  "À vista",
  "Financiamento",
  "Troca + diferença",
  "Consórcio",
] as const;

function umDecimal(n: number) {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function plural(n: number, singular: string, plural: string) {
  return n === 1 ? singular : plural;
}

export function MetasView({
  lojaNome,
  veiculos,
}: {
  lojaNome: string;
  veiculos: { id: string; titulo: string; preco: number }[];
}) {
  const reduzir = useReducedMotion();
  const leads = useLeads();
  const alvo = useMeta();
  const meta = useMemo(() => resumoMetaMes(leads, alvo), [leads, alvo]);

  // Editar meta (inline).
  const [editando, setEditando] = useState(false);
  const [rascunhoMeta, setRascunhoMeta] = useState(String(alvo));

  // Registrar venda (inline, sem modal).
  const [registrando, setRegistrando] = useState(false);
  const [vNome, setVNome] = useState("");
  const [vValor, setVValor] = useState("");
  const [vCarro, setVCarro] = useState("");
  const [vForma, setVForma] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const [aviso, setAviso] = useState<string | null>(null);

  // Barra de progresso: já renderiza no valor certo (não enche do zero no load —
  // isso seria coreografia de carga numa tela vista o dia todo). Só transiciona
  // quando o pct MUDA de verdade — ex: registrar uma venda com a tela aberta faz
  // o ponteiro andar, e aí o movimento é feedback legítimo.
  const [escalaBarra, setEscalaBarra] = useState(meta.pct / 100);
  useEffect(() => {
    setEscalaBarra(meta.pct / 100);
  }, [meta.pct]);

  function toast(msg: string) {
    setAviso(msg);
    window.clearTimeout((toast as unknown as { t?: number }).t);
    (toast as unknown as { t?: number }).t = window.setTimeout(
      () => setAviso(null),
      3400,
    );
  }

  function salvarMeta() {
    const n = Number(rascunhoMeta);
    if (Number.isFinite(n) && n > 0) definirMeta(n);
    setEditando(false);
  }

  function abrirRegistro() {
    setVNome("");
    setVValor("");
    setVCarro("");
    setVForma("");
    setErro(null);
    setRegistrando(true);
  }

  function registrarVenda(e: React.FormEvent) {
    e.preventDefault();
    if (!vNome.trim()) {
      setErro("Informe o nome de quem comprou.");
      return;
    }
    const valor = vValor ? Number(vValor.replace(/\D/g, "")) : undefined;
    const carro = veiculos.find((v) => v.id === vCarro)?.titulo;
    adicionarLead(
      criarVenda(
        { nome: vNome, valor, formaPagamento: vForma || undefined, carroTitulo: carro },
        HOJE_ISO,
      ),
    );
    setRegistrando(false);
    toast(`Venda de ${vNome.trim().split(" ")[0]} registrada. Meta atualizada.`);
  }

  // "O que fazer agora" — a próxima ação mais útil pelo estado do funil.
  const acao = useMemo(() => {
    if (meta.batido)
      return {
        titulo: "Meta batida no mês",
        texto: "Cada venda a mais já conta pro recorde. Segue fechando.",
        href: "/gestao/clientes",
        cta: "Ver funil",
      };
    if (meta.emNegociacao > 0)
      return {
        titulo: `${meta.emNegociacao} em negociação`,
        texto: "Feche quem já está quente pra encostar na meta antes do fim do mês.",
        href: "/gestao/clientes",
        cta: "Abrir negociações",
      };
    if (meta.aguardandoRetorno > 0)
      return {
        titulo: `${meta.aguardandoRetorno} aguardando retorno`,
        texto: "Ligue de volta antes do cliente esfriar — é venda quase na mão.",
        href: "/gestao/clientes",
        cta: "Ver retornos",
      };
    return {
      titulo: "Funil precisa de gente",
      texto: "Cadastre novos clientes e agende visitas pra ter o que fechar.",
      href: "/gestao/clientes?novo=1",
      cta: "Cadastrar cliente",
    };
  }, [meta.batido, meta.emNegociacao, meta.aguardandoRetorno]);

  const campo =
    "w-full rounded-[calc(var(--radius)-2px)] border border-line bg-surface px-3 py-2.5 text-sm text-secondary placeholder:text-muted focus:border-primary focus:outline-none";

  return (
    <div>
      {/* Cabeçalho */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-secondary">Metas</h1>
          <p className="mt-1 max-w-md text-sm text-muted-strong">
            A meta conta sozinha quando você marca um cliente como{" "}
            <span className="font-medium text-secondary">Vendido</span> no funil.
            Zera quando vira o mês.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-medium text-muted-strong sm:inline">
            {meta.mesLabel} {meta.ano}
          </span>
          <button
            type="button"
            onClick={registrando ? () => setRegistrando(false) : abrirRegistro}
            aria-expanded={registrando}
            className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(181,110,53,0.25)] transition-colors duration-200 hover:bg-primary-hover"
          >
            <Plus
              size={17}
              strokeWidth={2.25}
              className={`transition-transform duration-200 ${registrando ? "rotate-45" : ""}`}
            />
            Registrar venda
          </button>
        </div>
      </header>

      {/* Registrar venda — inline, aparece acima do painel */}
      <AnimatePresence initial={false}>
        {registrando && (
          <motion.form
            onSubmit={registrarVenda}
            initial={reduzir ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduzir ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="mt-5 rounded-[var(--radius)] border border-primary/25 bg-surface p-5 shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <Trophy size={16} className="text-primary" />
              Registrar uma venda fechada
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <label className="sr-only" htmlFor="v-nome">
                  Nome do comprador
                </label>
                <input
                  id="v-nome"
                  autoFocus
                  value={vNome}
                  onChange={(e) => {
                    setVNome(e.target.value);
                    if (erro) setErro(null);
                  }}
                  placeholder="Quem comprou"
                  aria-invalid={!!erro}
                  className={`${campo} ${erro ? "border-danger" : ""}`}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="v-valor">
                  Valor da venda
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                    R$
                  </span>
                  <input
                    id="v-valor"
                    inputMode="numeric"
                    value={vValor ? Number(vValor.replace(/\D/g, "")).toLocaleString("pt-BR") : ""}
                    onChange={(e) => setVValor(e.target.value.replace(/\D/g, ""))}
                    placeholder="Valor"
                    className={`${campo} pl-9 tabular-nums`}
                  />
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="v-carro">
                  Carro vendido
                </label>
                <select
                  id="v-carro"
                  value={vCarro}
                  onChange={(e) => setVCarro(e.target.value)}
                  className={`${campo} cursor-pointer`}
                >
                  <option value="">Carro (opcional)</option>
                  {veiculos.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.titulo}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="sr-only" htmlFor="v-forma">
                  Forma de pagamento
                </label>
                <select
                  id="v-forma"
                  value={vForma}
                  onChange={(e) => setVForma(e.target.value)}
                  className={`${campo} cursor-pointer`}
                >
                  <option value="">Pagamento (opcional)</option>
                  {FORMAS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {erro && <p className="mt-2 text-xs text-danger-ink">{erro}</p>}
            <div className="mt-4 flex items-center gap-2.5">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-hover"
              >
                <Check size={16} strokeWidth={2.25} />
                Registrar venda
              </button>
              <button
                type="button"
                onClick={() => setRegistrando(false)}
                className="rounded-[var(--radius)] px-4 py-2.5 text-sm font-medium text-muted-strong transition-colors duration-200 hover:bg-sand hover:text-secondary"
              >
                Cancelar
              </button>
              <span className="ml-auto hidden max-w-[16rem] text-right text-xs text-muted-strong sm:block">
                Entra no funil como “Vendido” e soma na meta na hora.
              </span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Banner de ritmo */}
      <section
        className="mt-6 flex items-center gap-4 rounded-[var(--radius)] bg-secondary px-5 py-4 text-white shadow-[var(--shadow-soft)] sm:px-6"
        aria-label={`Ritmo da meta de ${meta.mesLabel}`}
      >
        <span
          className={`hidden h-11 w-11 shrink-0 place-items-center rounded-full sm:grid ${
            meta.batido ? "bg-success/20 text-success" : "bg-white/10 text-primary-on-dark"
          }`}
        >
          {meta.batido ? <Trophy size={20} strokeWidth={1.9} /> : <Gauge size={20} strokeWidth={1.9} />}
        </span>
        <div className="min-w-0">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-white/50">
            Ritmo pra bater a meta
          </p>
          {meta.batido ? (
            <>
              <p className="mt-1 text-base font-semibold text-white sm:text-lg">
                Meta batida — {meta.feito} de {meta.alvo}{" "}
                {plural(meta.alvo, "venda", "vendas")} no mês.
              </p>
              <p className="mt-1 text-sm text-white/60">
                Toda venda a mais agora é lucro em cima da meta.
              </p>
            </>
          ) : (
            <>
              <p className="mt-1 text-base font-semibold text-white sm:text-lg">
                Faltam{" "}
                <span className="text-xl font-bold text-primary-on-dark">
                  {meta.restam}
                </span>{" "}
                em {meta.diasRestantes}{" "}
                {plural(meta.diasRestantes, "dia", "dias")} úteis. Precisa de ~
                {umDecimal(meta.ritmoNecessario)}/dia pra bater.
              </p>
              <p className="mt-1 text-sm text-white/60">
                No ritmo atual, você fecha o mês em ~{meta.projecao}{" "}
                {plural(meta.projecao, "venda", "vendas")}.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Stats */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Faltam pra meta"
          valor={meta.restam}
          icon={Target}
          tom={meta.batido ? "sucesso" : "neutro"}
          legenda={meta.batido ? "meta batida" : `de ${meta.alvo} no mês`}
        />
        <StatCard
          label="Dias úteis restantes"
          valor={meta.diasRestantes}
          icon={CalendarDays}
          tom="neutro"
          legenda="sem contar domingo"
        />
        <StatCard
          label="Em negociação"
          valor={meta.emNegociacao}
          icon={Handshake}
          tom="neutro"
          legenda="fechando detalhe"
        />
        <StatCard
          label="Aguardando retorno"
          valor={meta.aguardandoRetorno}
          icon={PhoneCall}
          tom={meta.aguardandoRetorno > 0 ? "alerta" : "neutro"}
          legenda="ligar de volta"
        />
      </div>

      {/* Meta + próxima ação */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        {/* Card da meta — caramelo, o momento de cor do painel */}
        <section className="relative overflow-hidden rounded-[var(--radius)] border border-primary/20 bg-primary/[0.07] p-6 shadow-[var(--shadow-soft)]">
          <Trophy
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-3 text-primary/10"
            size={132}
            strokeWidth={1.2}
          />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-secondary">{lojaNome}</p>
              <p className="text-xs text-secondary/70">Meta de {meta.mesLabel}</p>
            </div>
            {!editando ? (
              <button
                type="button"
                onClick={() => {
                  setRascunhoMeta(String(meta.alvo));
                  setEditando(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-surface/70 px-3 py-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:bg-surface"
              >
                <Pencil size={13} />
                Editar meta
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <label className="sr-only" htmlFor="meta-alvo">
                  Meta de vendas
                </label>
                <input
                  id="meta-alvo"
                  autoFocus
                  inputMode="numeric"
                  value={rascunhoMeta}
                  onChange={(e) => setRascunhoMeta(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") salvarMeta();
                    if (e.key === "Escape") setEditando(false);
                  }}
                  className="w-16 rounded-[calc(var(--radius)-4px)] border border-primary/40 bg-surface px-2.5 py-1.5 text-sm font-semibold tabular-nums text-secondary focus:border-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={salvarMeta}
                  aria-label="Salvar meta"
                  className="grid h-8 w-8 place-items-center rounded-[calc(var(--radius)-4px)] bg-primary text-white transition-colors duration-200 hover:bg-primary-hover"
                >
                  <Check size={15} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  aria-label="Cancelar"
                  className="grid h-8 w-8 place-items-center rounded-[calc(var(--radius)-4px)] text-muted-strong transition-colors duration-200 hover:bg-sand hover:text-secondary"
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>

          <div className="relative mt-5 flex items-end gap-2">
            <span className="text-[3.25rem] font-semibold leading-none tabular-nums text-primary">
              {meta.feito}
            </span>
            <span className="mb-1.5 text-xl font-medium text-secondary/70">
              / {meta.alvo}
            </span>
            <span className="mb-2 ml-auto text-2xl font-semibold tabular-nums text-secondary">
              {meta.pct}%
            </span>
          </div>

          <div
            className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-secondary/10"
            role="progressbar"
            aria-valuenow={meta.pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${meta.feito} de ${meta.alvo} vendas`}
          >
            <div
              className="h-full w-full origin-left rounded-full bg-primary transition-transform duration-[250ms] ease-[var(--ease-brand)]"
              style={{ transform: `scaleX(${escalaBarra})` }}
            />
          </div>

          <p className="relative mt-3 text-sm text-secondary/80">
            {meta.batido ? (
              <>Meta batida no mês. Bora pro recorde.</>
            ) : (
              <>
                Faltam{" "}
                <span className="font-semibold text-secondary">
                  {meta.restam} {plural(meta.restam, "venda", "vendas")}
                </span>{" "}
                pra bater. Conta automático quando você marca “Vendido” no funil.
              </>
            )}
          </p>
        </section>

        {/* O que fazer agora */}
        <section className="flex flex-col rounded-[var(--radius)] border border-line bg-surface p-6 shadow-[var(--shadow-soft)]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-strong">
            O que fazer agora
          </p>
          <p className="mt-3 text-base font-semibold text-secondary">{acao.titulo}</p>
          <p className="mt-1.5 text-sm text-muted-strong">{acao.texto}</p>
          <Link
            href={acao.href}
            className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-[var(--radius)] border border-line bg-surface px-3.5 py-2 text-sm font-semibold text-secondary transition-colors duration-200 hover:bg-sand"
          >
            {acao.cta}
            <ArrowRight size={15} strokeWidth={2.25} className="text-primary" />
          </Link>
        </section>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {aviso && (
          <motion.div
            role="status"
            initial={reduzir ? { opacity: 0, x: "-50%" } : { opacity: 0, x: "-50%", y: 12 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            exit={reduzir ? { opacity: 0, x: "-50%" } : { opacity: 0, x: "-50%", y: 12 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed bottom-5 left-1/2 z-[70] flex max-w-[92vw] items-center gap-3 rounded-[var(--radius)] bg-secondary px-4 py-3 text-sm text-white shadow-[var(--shadow-hover)]"
          >
            <span>{aviso}</span>
            <button
              type="button"
              onClick={() => setAviso(null)}
              aria-label="Fechar aviso"
              className="text-white/70 transition-colors hover:text-white"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
