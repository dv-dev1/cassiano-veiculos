"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { imagens } from "@/lib/loja";

/**
 * Abertura do site: o efeito de expansão. Ao entrar, a página prende e a
 * imagem do interior da concessionária expande de um cartão até a tela cheia
 * conforme o usuário rola — sensação de ENTRAR no showroom. Depois de
 * expandida, o scroll é liberado e o resto do site aparece.
 */
export function ShowroomIntro() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc={imagens.showroomHero}
      bgImageSrc={imagens.showroomBg}
      title="Cassiano Veículos"
      scrollToExpand="Role para entrar no showroom"
      textBlend={false}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-white">
          Bem-vindo à <span className="text-primary">Cassiano Veículos</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Seminovos premium selecionados, com procedência garantida. Continue
          rolando para conhecer nosso estoque.
        </p>
      </div>
    </ScrollExpandMedia>
  );
}
