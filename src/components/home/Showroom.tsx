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
 * "Entre no showroom" — a imagem do interior da concessionária começa como
 * uma janela contida (cartão arredondado no centro) e EXPANDE até preencher
 * a tela inteira conforme a seção rola, dando a sensação forte de ENTRAR no
 * showroom. Scroll-driven, sem sequestrar a rolagem da página.
 */
export function Showroom() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // "Abre a janela" via clip-path (GPU): a imagem fica sempre em tela cheia
  // por baixo; o inset revela dela ~21%/29% das bordas → 0 na 1ª metade do
  // scroll, com os cantos arredondando pra reto. Sensação de janela crescendo
  // até virar tela cheia, sem animar width/height (layout).
  const insetX = useTransform(scrollYProgress, [0, 0.5], [21, 0]); // %
  const insetY = useTransform(scrollYProgress, [0, 0.5], [19, 0]); // %
  const round = useTransform(scrollYProgress, [0, 0.5], [24, 0]); // px
  const clip = useMotionTemplate`inset(${insetY}% ${insetX}% round ${round}px)`;
  // Leve zoom pra dentro na 2ª metade, pra "entrar" mais.
  const zoom = useTransform(scrollYProgress, [0.5, 1], [1, 1.08]);
  const imageTransform = useMotionTemplate`scale(${zoom})`;

  // Texto sobre a imagem: visível no começo, some quando ela toma a tela.
  const textOpacity = useTransform(scrollYProgress, [0.08, 0.22, 0.4, 0.5], [
    0, 1, 1, 0,
  ]);

  return (
    <section
      ref={ref}
      className="relative bg-secondary"
      aria-label="Entre no showroom"
    >
      {/* Altura extra = espaço de rolagem pro efeito sticky acontecer. */}
      <div className="h-[220vh]">
        {/* Painel sticky segura o palco enquanto a seção rola. */}
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-secondary">
          {/* Palco em tela cheia; o clip-path "abre a janela" crescendo. */}
          <motion.div
            style={reduce ? undefined : { clipPath: clip }}
            className="absolute inset-0 will-change-[clip-path]"
          >
            <motion.div
              style={reduce ? undefined : { transform: imageTransform }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={imagens.showroomHero}
                alt="Interior do showroom da Cassiano Veículos, veículos premium expostos"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-secondary/35" />
          </motion.div>

          {/* Texto — segue o centro, some quando a janela toma a tela. */}
          <motion.div
            style={reduce ? undefined : { opacity: textOpacity }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center"
          >
            <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold leading-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.8)]">
              Entre no showroom
              <br />
              <span className="text-primary">e escolha o seu.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Faixa de miniaturas do ambiente */}
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
