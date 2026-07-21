"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Menu, X } from "lucide-react";
import { secoes } from "./secoes";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LARGURA = "260px";

function estaAtiva(pathname: string, href: string) {
  // Painel é o índice (/gestao) → match exato. As demais casam por prefixo,
  // pra manter o item ativo dentro de sub-rotas (ex: /gestao/estoque/novo).
  return href === "/gestao" ? pathname === "/gestao" : pathname.startsWith(href);
}

// Marca da loja no topo do painel — leva pro Painel (não pro site público).
function Marca() {
  return (
    <Link
      href="/gestao"
      aria-label="Cassiano Veículos — Painel"
      className="inline-flex items-center transition-opacity duration-200 hover:opacity-80"
    >
      <Image
        src="/logo-cv-trim.png"
        alt="Cassiano Veículos"
        width={453}
        height={109}
        priority
        className="h-8 w-auto"
      />
    </Link>
  );
}

function ConteudoSidebar({
  pathname,
  onNavegar,
}: {
  pathname: string;
  onNavegar?: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="px-1.5 pt-2">
        <Marca />
      </div>

      <Link
        href="/gestao/clientes"
        onClick={onNavegar}
        className="flex items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(181,110,53,0.25)] transition-colors duration-200 hover:bg-primary-hover"
      >
        <Plus size={18} strokeWidth={2.25} />
        Novo cliente
      </Link>

      <nav className="flex flex-col gap-1" aria-label="Navegação da gestão">
        {secoes.map((s) => {
          const Icon = s.icon;
          const ativa = estaAtiva(pathname, s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              onClick={onNavegar}
              aria-current={ativa ? "page" : undefined}
              className={`flex items-center gap-3 rounded-[var(--radius)] px-3.5 py-2.5 text-sm transition-colors duration-200 ${
                ativa
                  ? "bg-primary/10 font-semibold text-primary"
                  : "font-medium text-secondary/75 hover:bg-sand hover:text-secondary"
              }`}
            >
              <Icon size={19} strokeWidth={1.75} className="shrink-0" />
              {s.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/**
 * Moldura da área dos vendedores (central de gestão): sidebar fixa no desktop,
 * top bar + drawer no mobile. Register product — navegação padrão, cor contida
 * (caramelo só na ação primária e no item ativo), motion curto e funcional.
 * Sem o chrome do site público (header/footer/WhatsApp): é outra superfície.
 */
export function GestaoShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const reduzir = useReducedMotion();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — desktop */}
      <aside
        className="fixed inset-y-0 left-0 z-30 hidden border-r border-line bg-surface lg:block"
        style={{ width: LARGURA }}
      >
        <ConteudoSidebar pathname={pathname} />
      </aside>

      {/* Top bar — mobile */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <Marca />
        <button
          type="button"
          onClick={() => setAberto(true)}
          aria-label="Abrir menu"
          aria-haspopup="dialog"
          className="grid h-10 w-10 place-items-center rounded-[var(--radius)] text-secondary transition-colors duration-200 hover:bg-sand"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Drawer — mobile */}
      <AnimatePresence>
        {aberto && [
          <motion.div
            key="scrim"
            className="fixed inset-0 z-40 bg-secondary/40 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE }}
            onClick={() => setAberto(false)}
            aria-hidden="true"
          />,
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu da gestão"
            className="fixed inset-y-0 left-0 z-40 w-[280px] max-w-[82vw] border-r border-line bg-surface lg:hidden"
            initial={reduzir ? { opacity: 0 } : { x: "-100%" }}
            animate={reduzir ? { opacity: 1 } : { x: 0 }}
            exit={reduzir ? { opacity: 0 } : { x: "-100%" }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar menu"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-secondary/70 transition-colors duration-200 hover:bg-sand hover:text-secondary"
            >
              <X size={18} />
            </button>
            <ConteudoSidebar
              pathname={pathname}
              onNavegar={() => setAberto(false)}
            />
          </motion.aside>,
        ]}
      </AnimatePresence>

      {/* Conteúdo */}
      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
