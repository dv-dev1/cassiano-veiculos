import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { Veiculo } from "@/types/veiculo";
import { formatKm, formatPreco } from "@/lib/format";

/**
 * Card de veículo — usado na home (destaques), na listagem e em
 * "outros carros". Foto com zoom suave no hover (transform, ~0.7s).
 */
export function VeiculoCard({ veiculo }: { veiculo: Veiculo }) {
  const capa = veiculo.fotos[0] ?? "/placeholder/veiculo-1.svg";
  return (
    <Link
      href={`/carro/${veiculo.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius)] border border-line bg-surface shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={capa}
          alt={`${veiculo.titulo}, ${veiculo.ano}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        <span className="absolute left-3 top-3 rounded-md bg-secondary/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {veiculo.ano}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-[15px] font-semibold leading-snug text-secondary">
          {veiculo.titulo}
        </h3>
        <p className="text-xs text-muted">
          {veiculo.ano} · {formatKm(veiculo.km)}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-secondary">
            {formatPreco(veiculo.preco)}
          </span>
          <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary">
            Ver detalhes
            <ChevronRight
              size={16}
              className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
