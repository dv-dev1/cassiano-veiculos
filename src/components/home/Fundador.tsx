import Image from "next/image";
import { loja, imagens } from "@/lib/loja";
import { Reveal } from "@/components/Reveal";

export function Fundador() {
  return (
    <section
      id="fundador"
      className="scroll-mt-24 bg-secondary py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 sm:px-8 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)]">
            <Image
              src={imagens.fundador}
              alt="Fundador da Cassiano Veículos"
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              className="object-cover"
            />
          </div>
          {/* Detalhe em marrom, referência à identidade */}
          <div className="absolute -bottom-3 -right-3 -z-0 h-24 w-24 rounded-[var(--radius)] bg-primary/80" />
        </Reveal>

        <div>
          <Reveal
            as="p"
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            O Fundador
          </Reveal>
          <Reveal>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-white">
              Cassiano
            </h2>
          </Reveal>
          <Reveal as="blockquote" delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              “Comecei a Cassiano Veículos com uma ideia simples: vender carro do
              jeito que eu gostaria de comprar. Sem enrolação, sem letra miúda,
              olhando no olho. Esse é o nosso nome na porta, e a gente honra ele
              todos os dias.”
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-6 flex items-center gap-3">
            <span className="h-10 w-1 rounded bg-primary" />
            <div>
              <p className="text-sm font-semibold text-white">Cassiano</p>
              <p className="text-xs text-white/50">Fundador da {loja.nome}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
