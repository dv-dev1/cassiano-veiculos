import Image from "next/image";
import { imagens } from "@/lib/loja";
import { Reveal } from "@/components/Reveal";

export function Showroom() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="relative h-[70vh] min-h-[440px] w-full">
        <Image
          src={imagens.showroom[0]}
          alt="Interior do showroom da Cassiano Veículos com veículos premium"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-secondary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-secondary/30" />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <Reveal>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)]">
              Entre no showroom
              <br />
              <span className="text-primary">e escolha o seu.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Faixa de miniaturas do ambiente */}
      <div className="grid grid-cols-3">
        {imagens.showroom.map((src, i) => (
          <div key={i} className="relative aspect-[3/2]">
            <Image
              src={src}
              alt="Ambiente da loja Cassiano Veículos"
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
