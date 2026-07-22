"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Check } from "lucide-react";
import { formatPreco } from "@/lib/format";
import type { VeiculoGestao } from "@/data/gestao-mock";
import {
  ESTAGIOS_FORM as ESTAGIOS,
  type EstagioForm,
  type NovoClienteDados,
} from "@/lib/clientes-store";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type { NovoClienteDados };

export interface NovoClienteModalProps {
  aberto: boolean;
  onFechar: () => void;
  veiculos: Pick<VeiculoGestao, "id" | "titulo" | "preco">[];
  veiculoInicialId?: string;
  /** Chamado quando o cliente é salvo — a página decide o que fazer (ex:
   *  jogar o lead na coluna "Lead novo" do funil). */
  onSalvar?: (dados: NovoClienteDados) => void;
}

/**
 * Modal "Novo cliente / negociação". Register product — modal usado com
 * parcimônia (é a exceção certa: capturar um lead no meio do atendimento sem
 * sair do carro). Sem backend ainda: valida e confirma de forma honesta
 * ("registrado" em memória), não finge que salvou no banco.
 */
export function NovoClienteModal({
  aberto,
  onFechar,
  veiculos,
  veiculoInicialId,
  onSalvar,
}: NovoClienteModalProps) {
  const reduzir = useReducedMotion();
  const nomeRef = useRef<HTMLInputElement>(null);
  const tituloId = useId();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estagio, setEstagio] = useState<EstagioForm>("Lead novo");
  const [veiculoId, setVeiculoId] = useState(veiculoInicialId ?? veiculos[0]?.id ?? "");
  const [obs, setObs] = useState("");
  const [conversaEm, setConversaEm] = useState("");
  const [visitaEm, setVisitaEm] = useState("");
  const [horaVisita, setHoraVisita] = useState("");
  const [veioEm, setVeioEm] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  // Reseta ao (re)abrir e foca o primeiro campo.
  useEffect(() => {
    if (!aberto) return;
    setNome("");
    setTelefone("");
    setEstagio("Lead novo");
    setVeiculoId(veiculoInicialId ?? veiculos[0]?.id ?? "");
    setObs("");
    setConversaEm("");
    setVisitaEm("");
    setHoraVisita("");
    setVeioEm("");
    setErro(null);
    setEnviado(false);
    const t = setTimeout(() => nomeRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [aberto, veiculoInicialId, veiculos]);

  // ESC fecha; trava o scroll do fundo enquanto aberto.
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onFechar();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [aberto, onFechar]);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro("Informe o nome do cliente pra registrar a negociação.");
      nomeRef.current?.focus();
      return;
    }
    setErro(null);
    onSalvar?.({
      nome: nome.trim(),
      telefone: telefone.trim(),
      estagio,
      veiculoId,
      observacoes: obs.trim(),
      conversaEm: conversaEm || undefined,
      visitaEm: visitaEm || undefined,
      horaVisita: horaVisita || undefined,
      veioEm: veioEm || undefined,
    });
    setEnviado(true);
  }

  const campoBase =
    "w-full rounded-[calc(var(--radius)-2px)] border border-line bg-surface px-3 py-2.5 text-sm text-secondary placeholder:text-muted focus:border-primary focus:outline-none";

  return (
    <AnimatePresence>
      {aberto && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-secondary/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE }}
            onClick={onFechar}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={tituloId}
            className="relative z-[81] flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[calc(var(--radius)*1.4)] border border-line bg-surface shadow-[var(--shadow-hover)] sm:rounded-[calc(var(--radius)*1.4)]"
            initial={reduzir ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduzir ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 id={tituloId} className="text-base font-semibold text-secondary">
                {enviado ? "Cliente registrado" : "Novo cliente"}
              </h2>
              <button
                type="button"
                onClick={onFechar}
                aria-label="Fechar"
                className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-sand hover:text-secondary"
              >
                <X size={18} />
              </button>
            </div>

            {enviado ? (
              <div className="flex flex-col items-center px-6 py-10 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-success-bg text-success">
                  <Check size={28} strokeWidth={2.2} />
                </span>
                <p className="mt-4 text-sm text-secondary">
                  <span className="font-semibold">{nome.trim()}</span> foi
                  registrado e já aparece no funil de{" "}
                  <span className="font-medium">Clientes</span>.
                </p>
                <p className="mt-1.5 max-w-xs text-xs text-muted">
                  Fica salvo neste navegador. Quando o Supabase entrar, passa a
                  sincronizar entre todos os dispositivos.
                </p>
                <button
                  type="button"
                  onClick={onFechar}
                  className="mt-5 rounded-[var(--radius)] bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-hover"
                >
                  Concluir
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} className="flex flex-col gap-3 overflow-y-auto px-5 py-5">
                <div>
                  <label className="sr-only" htmlFor="nc-nome">
                    Nome do cliente
                  </label>
                  <input
                    id="nc-nome"
                    ref={nomeRef}
                    value={nome}
                    onChange={(e) => {
                      setNome(e.target.value);
                      if (erro) setErro(null);
                    }}
                    placeholder="Nome do cliente"
                    aria-invalid={!!erro}
                    className={`${campoBase} font-medium ${erro ? "border-danger" : ""}`}
                  />
                  {erro && <p className="mt-1.5 text-xs text-danger-ink">{erro}</p>}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="nc-tel">
                      Telefone
                    </label>
                    <input
                      id="nc-tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      inputMode="tel"
                      placeholder="(83) 99999-0000"
                      className={campoBase}
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="nc-estagio">
                      Estágio
                    </label>
                    <select
                      id="nc-estagio"
                      value={estagio}
                      onChange={(e) =>
                        setEstagio(e.target.value as (typeof ESTAGIOS)[number])
                      }
                      className={`${campoBase} cursor-pointer`}
                    >
                      {ESTAGIOS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="nc-veiculo">
                    Veículo de interesse
                  </label>
                  <select
                    id="nc-veiculo"
                    value={veiculoId}
                    onChange={(e) => setVeiculoId(e.target.value)}
                    className={`${campoBase} cursor-pointer`}
                  >
                    {veiculos.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.titulo} — {formatPreco(v.preco)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="sr-only" htmlFor="nc-obs">
                    Observações da negociação
                  </label>
                  <textarea
                    id="nc-obs"
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                    rows={3}
                    placeholder="Observações da negociação…"
                    className={`${campoBase} resize-none`}
                  />
                </div>

                {/* Datas opcionais */}
                <fieldset className="rounded-[calc(var(--radius)-2px)] border border-line px-3.5 pb-3.5 pt-2.5">
                  <legend className="px-1 text-[0.7rem] font-semibold uppercase tracking-wide text-muted">
                    Datas (opcional)
                  </legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="flex flex-col gap-1 text-xs text-muted">
                      Conversamos em
                      <input
                        type="date"
                        value={conversaEm}
                        onChange={(e) => setConversaEm(e.target.value)}
                        className={campoBase}
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-muted">
                      Visita agendada para
                      <input
                        type="date"
                        value={visitaEm}
                        onChange={(e) => setVisitaEm(e.target.value)}
                        className={campoBase}
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-muted">
                      Horário da visita
                      <input
                        type="time"
                        value={horaVisita}
                        onChange={(e) => setHoraVisita(e.target.value)}
                        className={campoBase}
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-muted">
                      Veio à loja em
                      <input
                        type="date"
                        value={veioEm}
                        onChange={(e) => setVeioEm(e.target.value)}
                        className={campoBase}
                      />
                    </label>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className="mt-1 w-full rounded-[var(--radius)] bg-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(181,110,53,0.25)] transition-colors duration-200 hover:bg-primary-hover"
                >
                  Salvar cliente
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
