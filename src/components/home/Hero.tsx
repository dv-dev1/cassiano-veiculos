import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { loja, whatsappLink, imagens } from "@/lib/loja";
import { WhatsappIcon } from "@/components/WhatsappIcon";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Foto de fundo */}
      <Image
        src={imagens.hero}
        alt="Showroom da Cassiano Veículos com veículos premium"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay grafite pra legibilidade + peso premium.
          Forte à esquerda (onde vive o texto), leve à direita. */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/10 to-secondary/20" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pt-28 sm:px-8">
        <div className="max-w-2xl">
          <Reveal
            as="p"
            className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          >
            {loja.nome} • Seminovos premium
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="hero-title max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)] font-bold text-white">
              Seu próximo carro, com a{" "}
              <span className="text-primary">procedência</span> que você merece.
            </h1>
          </Reveal>

          <Reveal
            as="p"
            delay={0.16}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Seminovos selecionados, multimarcas, com avaliação justa do seu usado
            e financiamento aprovado nos principais bancos. Tudo num só lugar, do
            jeito certo.
          </Reveal>

          <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/nossos-carros"
              className="inline-flex items-center gap-1.5 rounded-[var(--radius)] bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_10px_28px_rgba(181,110,53,0.4)] motion-reduce:hover:translate-y-0"
            >
              Ver veículos
              <ChevronRight size={18} />
            </Link>
            <a
              href={whatsappLink(`Olá! Vim pelo site da ${loja.nome} e quero atendimento.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-[transform,background-color] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:bg-white/10 motion-reduce:hover:translate-y-0"
            >
              <WhatsappIcon size={18} />
              WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
