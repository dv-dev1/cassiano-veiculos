"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { loja } from "@/lib/loja";

/**
 * Logo oficial da Cassiano Veículos (versão fundo escuro: monograma CV
 * caramelo + wordmark claro). Arquivo em public/logo-cassiano.png.
 *
 * Fallback: se o PNG ainda não existir, mostra um wordmark tipográfico
 * no estilo da marca — o site nunca quebra. Assim que o arquivo for salvo,
 * a logo real aparece.
 */
export function Logo() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <Link
      href="/"
      aria-label={`${loja.nome} — página inicial`}
      className="group inline-flex items-center"
    >
      {imgOk ? (
        // Logo horizontal (recortada do padding preto original via sharp trim,
        // ver public/logo-cassiano-trim.png — proporção ~4.15:1).
        <Image
          src="/logo-cassiano-trim.png"
          alt={loja.nome}
          width={1132}
          height={273}
          priority
          onError={() => setImgOk(false)}
          className="h-9 w-auto transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
      ) : (
        <span className="inline-flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-[8px] bg-primary font-bold text-white"
            style={{ letterSpacing: "-0.06em", fontSize: "15px" }}
          >
            CV
          </span>
          <span className="text-[15px] font-semibold uppercase leading-none tracking-[0.12em] text-white">
            Cassiano
            <span className="text-primary"> Veículos</span>
          </span>
        </span>
      )}
    </Link>
  );
}
