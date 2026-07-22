import { estoqueGestao } from "@/data/gestao-mock";
import { loja } from "@/lib/loja";
import { MetasView } from "./MetasView";

// Passa o estoque enxuto (id/título/preço) pro select de carro do "Registrar
// venda" e o nome da loja pro card da meta. As vendas e o funil vêm do store no
// próprio MetasView (client), fonte única com a tela Clientes.
export default function MetasPage() {
  const veiculos = estoqueGestao.map((v) => ({
    id: v.id,
    titulo: v.titulo,
    preco: v.preco,
  }));
  return <MetasView lojaNome={loja.nome} veiculos={veiculos} />;
}
