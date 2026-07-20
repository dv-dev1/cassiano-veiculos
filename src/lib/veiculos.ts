import type { Veiculo } from "@/types/veiculo";
import { veiculosMock } from "@/data/veiculos-mock";

// ─── CAMADA DE ACESSO A DADOS ────────────────────────────────
// Fonte única de veículos pro site. Hoje lê do mock local; quando
// as chaves do Supabase entrarem (.env.local), estas funções passam
// a consultar o banco — SEM mudar as telas que as consomem.

export async function getVeiculos(): Promise<Veiculo[]> {
  return veiculosMock.filter((v) => v.status !== "vendido");
}

export async function getDestaques(): Promise<Veiculo[]> {
  return veiculosMock.filter((v) => v.destaque && v.status !== "vendido");
}

export async function getVeiculoBySlug(slug: string): Promise<Veiculo | null> {
  return veiculosMock.find((v) => v.slug === slug) ?? null;
}

export async function getOutrosVeiculos(
  slugAtual: string,
  limite = 4
): Promise<Veiculo[]> {
  return veiculosMock
    .filter((v) => v.slug !== slugAtual && v.status !== "vendido")
    .slice(0, limite);
}

export async function contarVeiculos(): Promise<number> {
  return veiculosMock.filter((v) => v.status !== "vendido").length;
}
