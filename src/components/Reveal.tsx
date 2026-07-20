"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

interface RevealProps {
  children: ReactNode;
  /** Atraso do stagger, em segundos. */
  delay?: number;
  /** Tag renderizada (default div). */
  as?: ElementType;
  className?: string;
}

/**
 * Scroll reveal fiel à referência: o conteúdo é visível por padrão (SSR e
 * reduced-motion), e o efeito só REALÇA a entrada. Nunca esconde conteúdo
 * atrás de estado — se o observer não rodar, o texto continua lá.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sem suporte / reduced-motion: mostra direto.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { ["--reveal-delay" as string]: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
