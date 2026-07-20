import Link from "next/link";
import { loja } from "@/lib/loja";

/**
 * Logo da Cassiano. Wordmark tipográfico no estilo da marca (monograma CV +
 * nome) — placeholder fiel até o PNG oficial entrar em identidade/logo.png.
 * Quando o arquivo existir, trocar por <Image src="/logo.png" />.
 *
 * `variant` controla a cor pra fundos claros (padrão) e escuros.
 */
export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const nameColor = variant === "dark" ? "text-white" : "text-secondary";
  return (
    <Link
      href="/"
      aria-label={`${loja.nome} — página inicial`}
      className="group inline-flex items-center gap-2.5"
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-[8px] bg-primary font-bold text-white transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
        style={{ letterSpacing: "-0.06em", fontSize: "15px" }}
      >
        CV
      </span>
      <span
        className={`text-[15px] font-semibold uppercase leading-none tracking-[0.12em] ${nameColor}`}
      >
        Cassiano
        <span className="text-primary"> Veículos</span>
      </span>
    </Link>
  );
}
