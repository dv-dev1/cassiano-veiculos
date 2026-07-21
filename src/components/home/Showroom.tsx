import Image from "next/image";
import { imagens } from "@/lib/loja";
import { Reveal } from "@/components/Reveal";

/**
 * Seção showroom (no meio da home): imagem full-bleed do ambiente da loja
 * com texto sobreposto + faixa de miniaturas. Estática — o efeito de entrar
 * no showroom fica na abertura (ShowroomIntro).
 */
export function Showroom() {
  return (
    <section className="relative bg-secondary" aria-label="Showroom">
      <div className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <Image
          src={imagens.showroomHero}
          alt="Interior do showroom da Cassiano Veículos com veículos premium"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-secondary/55" />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <Reveal>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.7)]">
              Entre no showroom
              <br />
              <span className="text-primary">e escolha o seu.</span>
            </h2>
          </Reveal>
        </div>
      </div>

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
