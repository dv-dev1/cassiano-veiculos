"use client";

import { useMemo, useState } from "react";
import {
  CalendarCheck2,
  PhoneCall,
  CalendarClock,
  AlarmClock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { StatCard } from "@/components/gestao/StatCard";
import { HOJE_ISO, MESES, diaPorExtenso } from "@/lib/hoje";
import {
  eventosDeLeads,
  resumoAgenda,
  TIPO_EVENTO,
  type TipoEvento,
} from "@/data/agenda";
import type { Lead } from "@/data/clientes-mock";
import { CalendarioMes } from "@/components/gestao/agenda/CalendarioMes";
import { AgendaLista, EventoItem } from "@/components/gestao/agenda/AgendaLista";

const [HOJE_ANO, HOJE_MES] = (() => {
  const [a, m] = HOJE_ISO.split("-").map(Number);
  return [a, m - 1] as const;
})();

export function AgendaView({ leads }: { leads: Lead[] }) {
  const [vista, setVista] = useState<"mes" | "agenda">("mes");
  const [ano, setAno] = useState(HOJE_ANO);
  const [mes, setMes] = useState(HOJE_MES);
  const [diaSelecionado, setDiaSelecionado] = useState<string>(HOJE_ISO);

  const eventos = useMemo(() => eventosDeLeads(leads), [leads]);
  const resumo = useMemo(() => resumoAgenda(eventos, HOJE_ISO), [eventos]);
  const doDia = useMemo(
    () => eventos.filter((e) => e.data === diaSelecionado),
    [eventos, diaSelecionado],
  );

  function passoMes(delta: number) {
    let m = mes + delta;
    let a = ano;
    if (m < 0) { m = 11; a -= 1; }
    if (m > 11) { m = 0; a += 1; }
    setMes(m);
    setAno(a);
  }

  function irHoje() {
    setAno(HOJE_ANO);
    setMes(HOJE_MES);
    setDiaSelecionado(HOJE_ISO);
  }

  return (
    <div>
      {/* Cabeçalho */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-secondary">Calendário</h1>
          <p className="mt-1 max-w-md text-sm text-muted-strong">
            Veja por mês ou em lista. No mês, toque num dia pra ver os
            agendamentos.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-line bg-surface p-1">
          {(["mes", "agenda"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVista(v)}
              aria-pressed={vista === v}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                vista === v
                  ? "bg-primary text-white"
                  : "text-secondary/70 hover:text-secondary"
              }`}
            >
              {v === "mes" ? "Mês" : "Agenda"}
            </button>
          ))}
        </div>
      </header>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Visitas hoje" valor={resumo.visitasHoje} icon={CalendarCheck2} tom={resumo.visitasHoje > 0 ? "sucesso" : "neutro"} />
        <StatCard label="Retornos hoje" valor={resumo.retornosHoje} icon={PhoneCall} tom={resumo.retornosHoje > 0 ? "alerta" : "neutro"} />
        <StatCard label="Próximos 7 dias" valor={resumo.proximos7} icon={CalendarClock} tom="neutro" />
        <StatCard label="Retornos atrasados" valor={resumo.retornosAtrasados} icon={AlarmClock} tom={resumo.retornosAtrasados > 0 ? "perigo" : "neutro"} />
      </div>

      {vista === "agenda" ? (
        <div className="mt-6">
          <AgendaLista eventos={eventos} hojeIso={HOJE_ISO} />
        </div>
      ) : (
        <>
          {/* Navegação de mês */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-secondary">
                {MESES[mes]} {ano}
              </h2>
              <button
                type="button"
                onClick={irHoje}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-secondary transition-colors duration-200 hover:bg-sand"
              >
                Hoje
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => passoMes(-1)} aria-label="Mês anterior" className="grid h-8 w-8 place-items-center rounded-[var(--radius)] border border-line bg-surface text-muted transition-colors duration-200 hover:bg-sand hover:text-secondary">
                <ChevronLeft size={17} />
              </button>
              <button type="button" onClick={() => passoMes(1)} aria-label="Próximo mês" className="grid h-8 w-8 place-items-center rounded-[var(--radius)] border border-line bg-surface text-muted transition-colors duration-200 hover:bg-sand hover:text-secondary">
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_320px]">
            {/* Calendário + legenda */}
            <div>
              <CalendarioMes
                ano={ano}
                mes={mes}
                eventos={eventos}
                hojeIso={HOJE_ISO}
                diaSelecionado={diaSelecionado}
                onSelecionar={setDiaSelecionado}
              />
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {(Object.entries(TIPO_EVENTO) as [TipoEvento, (typeof TIPO_EVENTO)[TipoEvento]][]).map(
                  ([id, t]) => (
                    <span key={id} className="flex items-center gap-1.5 text-xs text-muted-strong">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.cor }} />
                      {t.label}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Painel do dia */}
            <aside className="rounded-[var(--radius)] border border-line bg-surface p-4">
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-sm font-semibold text-secondary">
                  {diaPorExtenso(diaSelecionado)}
                </h3>
                {diaSelecionado === HOJE_ISO && (
                  <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-primary">
                    hoje
                  </span>
                )}
              </div>

              {doDia.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-strong">
                  Nada agendado nesse dia.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {doDia.map((e) => (
                    <EventoItem key={e.id} evento={e} />
                  ))}
                </div>
              )}
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
