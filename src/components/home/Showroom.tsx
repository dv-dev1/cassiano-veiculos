"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { imagens } from "@/lib/loja";
import { Reveal } from "@/components/Reveal";

/**
 * "Entre no showroom" — efeito de expansão scroll-driven: a imagem do
 * interior da concessionária começa contida (janela pro showroom) e cresce
 * até preencher a tela conforme a seção passa pela viewport, dando a
 * sensação de ENTRAR no showroom. Não sequestra o scroll da página — o
 * efeito é atado ao progresso natural de rolagem da própria seção.
 */
export function Showroom() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progresso da seção: 0 quando o topo entra por baixo, 1 quando o fundo sai.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // A imagem expande de 70% → 100% da largura entre o início e o meio do scroll.
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.72, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [24, 0]);
  // Texto some suave conforme a imagem toma a tela.
  const textOpacity = useTransform(scrollYProgress, [0.28, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0.28, 0.5], [1, 1.08]);

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
          style={
            reduce
              ? undefined
              : { scale, borderRadius: radius }
          }
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

        {/* Texto sobreposto, some conforme a imagem toma conta */}
        <motion.div
          style={reduce ? undefined : { opacity: textOpacity, scale: textScale }}
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
