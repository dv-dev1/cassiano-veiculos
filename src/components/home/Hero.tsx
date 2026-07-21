import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { loja, imagens } from "@/lib/loja";
import { WhatsappIcon } from "@/components/WhatsappIcon";
import { WhatsappTrigger } from "@/components/whatsapp/WhatsappTrigger";
import { Reveal } from "@/components/Reveal";

/**
 * Hero com o Cassiano — o dono é a cara da marca, e a maioria dos clientes
 * compra pela confiança nele. Composição: ambiente real da loja (concessionária)
 * escurecido e desfocado ao fundo, texto e CTAs à esquerda, Cassiano recortado
 * (PNG transparente) grande à direita, com glow caramelo atrás pra a figura
 * (de polo escuro) descolar do fundo grafite.
 *
 * Mobile: o texto e os CTAs mandam (ficam acima da dobra). O Cassiano vira uma
 * presença atrás, com opacidade menor, pra não empurrar a ação pra baixo.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-secondary">
      {/* Ambiente: concessionária ao fundo, escurecida (sem blur — a foto tem
          resolução boa; o overlay grafite já garante a legibilidade do texto). */}
      <Image
        src={imagens.hero}
        alt=""
        aria-hidden="true"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />
      {/* Overlays grafite: forte à esquerda (texto), profundidade em cima/baixo. */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/60" />

      {/* Glow caramelo atrás do Cassiano (lado direito), assinatura da marca. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 58% at 78% 58%, rgba(181,110,53,0.38), transparent 72%)",
        }}
      />

      {/* Cassiano recortado (foto nova em alta, braço completo) — coluna direita
          no desktop; presença de fundo mais sutil no mobile pra não empurrar o CTA. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex w-[78%] items-end justify-end sm:w-[60%] lg:w-[44%]">
        <div className="relative h-[86%] w-full sm:h-[92%] lg:h-[97%]">
          <Image
            src={imagens.cassiano}
            alt="Cassiano, fundador da Cassiano Veículos"
            fill
            priority
            quality={90}
            sizes="(max-width: 1024px) 60vw, 44vw"
            className="object-contain object-bottom opacity-40 sm:opacity-65 lg:opacity-100"
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 pt-28 sm:px-8">
        <div className="max-w-xl">
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
            <WhatsappTrigger
              mensagem={`Olá! Vim pelo site da ${loja.nome} e quero atendimento.`}
              className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-[transform,background-color] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:bg-white/10 motion-reduce:hover:translate-y-0"
            >
              <WhatsappIcon size={18} />
              WhatsApp
            </WhatsappTrigger>
          </Reveal>

          {/* Assinatura do Cassiano — reforça que o dono é a cara da marca. */}
          <Reveal delay={0.32} className="mt-10 flex items-center gap-3">
            <span className="h-9 w-1 rounded bg-primary" />
            <div>
              <p className="text-sm font-semibold text-white">Cassiano</p>
              <p className="text-xs text-white/55">Fundador da {loja.nome}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
