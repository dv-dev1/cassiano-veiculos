"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { imagens } from "@/lib/loja";
import { Reveal } from "@/components/Reveal";

/**
 * "Entre no showroom" — zoom cinematográfico scroll-driven: a imagem do
 * interior da concessionária SEMPRE preenche a tela e dá um zoom pra dentro
 * conforme a seção passa pela viewport, dando a sensação de ENTRAR/aproximar
 * no showroom. A imagem nunca fica menor que a tela (sem bordas). Não
 * sequestra o scroll — o efeito é atado ao progresso natural da rolagem.
 */
export function Showroom() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progresso da seção: 0 quando o topo entra por baixo, 1 quando o fundo sai.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Zoom pra dentro: começa ampliada (1.25) e assenta em 1.05 no fim — sempre
  // ≥ 1, então a imagem nunca mostra borda. Transform string (GPU).
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1.05]);
  const imageTransform = useMotionTemplate`scale(${scale})`;
  // Texto entra e sai conforme a seção cruza o centro da tela.
  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.4, 0.6, 0.85],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      className="relative bg-secondary"
      aria-label="Entre no showroom"
    >
      {/* Altura extra dá espaço de rolagem pro efeito sticky acontecer. */}
      <div className="h-[180vh]">
        {/* Painel sticky que segura a imagem enquanto a seção rola */}
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={reduce ? undefined : { transform: imageTransform }}
          className="relative h-full w-full overflow-hidden will-change-transform"
        >
          <Image
            src={imagens.showroomHero}
            alt="Interior do showroom da Cassiano Veículos, veículos premium expostos"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary/40" />
        </motion.div>

        {/* Texto sobreposto, entra e sai conforme a seção cruza a tela */}
        <motion.div
          style={reduce ? undefined : { opacity: textOpacity }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
        >
          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold leading-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.7)]">
            Entre no showroom
            <br />
            <span className="text-primary">e escolha o seu.</span>
          </h2>
        </motion.div>
        </div>
      </div>

      {/* Faixa de miniaturas do ambiente, aparece depois do efeito */}
      <div className="grid grid-cols-3">
        {imagens.showroom.map((src, i) => (
          <Reveal key={i} delay={i * 0.08} className="relative aspect-[3/2]">
            <Image
              src={src}
              alt="Ambiente da loja Cassiano Veículos"
              fill
              sizes="33vw"
              className="object-cover"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
