// ─── FUNIL DE CLIENTES (Fase 2 — interno) ────────────────────
// Leads do funil de vendas do gestor. MOCK plausível pra o Kanban ficar vivo —
// quando o Supabase entrar, `src/lib/clientes.ts` troca esta fonte por queries
// (tabela `leads`). Sem persistência ainda: mover card / novo cliente vale só
// na sessão. As telas não mudam quando o banco chegar.

export type EstagioFunil =
  | "lead-novo"
  | "visita-marcada"
  | "negociando"
  | "ligar-volta"
  | "vendeu"
  | "nao-comprou";

export interface Etapa {
  id: EstagioFunil;
  label: string;
  /** Cor da etapa — adaptada ao sistema Cassiano (contida, premium). */
  cor: string;
  /** Etapa ativa (aparece sempre) ou fechada (filtrada por mês). */
  fechada?: boolean;
}

// Progressão sóbria: ardósia → caramelo → âmbar → rosa-queimado, verde-fechado
// pro ganho, grafite pra perda. Nenhuma cor grita; cada coluna se distingue.
export const ETAPAS: Etapa[] = [
  { id: "lead-novo", label: "Lead novo", cor: "#5E7186" },
  { id: "visita-marcada", label: "Visita marcada", cor: "#B56E35" },
  { id: "negociando", label: "Negociando", cor: "#B7791F" },
  { id: "ligar-volta", label: "Ligar de volta", cor: "#A65C68" },
  { id: "vendeu", label: "Vendeu", cor: "#2E7D5B", fechada: true },
  { id: "nao-comprou", label: "Não comprou", cor: "#6B6E73", fechada: true },
];

export const ETAPA_POR_ID: Record<EstagioFunil, Etapa> = Object.fromEntries(
  ETAPAS.map((e) => [e.id, e]),
) as Record<EstagioFunil, Etapa>;

export interface Lead {
  id: string;
  nome: string;
  telefone: string; // só dígitos com DDI (55...) — pro link do WhatsApp
  telefoneLabel: string;
  carro?: string; // modelo de interesse, texto livre (como na referência)
  origem?: string; // "Entrou no site da loja", "Lead Mercado Livre"…
  nota?: string;
  estagio: EstagioFunil;
  // Relacionamento (rótulos curtos dd/mm, como na referência)
  conversaEm?: string;
  visitaEm?: string;
  veioEm?: string;
  // Fechamento (vendeu / não comprou)
  valorVenda?: number;
  formaPagamento?: string;
  fechadoEm?: string; // ISO YYYY-MM-DD — filtro por mês
  motivoPerda?: string;
  // Retorno agendado (ligar de volta) — ISO; se no passado, conta como atrasado
  retornarEm?: string;
}

// Hoje: 2026-07-21. Fechamentos em julho aparecem no mês corrente por padrão.
export const leadsMock: Lead[] = [
  {
    id: "l1",
    nome: "Kauan Ribeiro",
    telefone: "5511948660000",
    telefoneLabel: "(11) 94866-0000",
    carro: "Volkswagen Jetta 2.0 Comfortline Flex 4p",
    origem: "Entrou no site da loja",
    estagio: "lead-novo",
    conversaEm: "25/06",
    visitaEm: "27/06",
  },
  {
    id: "l2",
    nome: "Marina Alves",
    telefone: "5583991110000",
    telefoneLabel: "(83) 99111-0000",
    carro: "GAC GS3 Premium 1.5 Turbo",
    origem: "Chegou pelo Instagram",
    estagio: "visita-marcada",
    conversaEm: "18/07",
    visitaEm: "22/07",
  },
  {
    id: "l3",
    nome: "Vagner Mazzeo",
    telefone: "5511911110000",
    telefoneLabel: "(11) 91111-0000",
    carro: "Toyota Corolla XEI",
    nota: "Cliente chegou pelo WhatsApp querendo esse carro.",
    origem: "WhatsApp",
    estagio: "negociando",
    conversaEm: "16/07",
  },
  {
    id: "l4",
    nome: "Roberto Lima",
    telefone: "5583988880000",
    telefoneLabel: "(83) 98888-0000",
    carro: "Toyota SW4 Diamond",
    origem: "Pediu pra retornar segunda",
    estagio: "ligar-volta",
    conversaEm: "14/07",
    retornarEm: "2026-07-18",
  },
  {
    id: "l5",
    nome: "Jessica Nascimento Fagundes",
    telefone: "5511989099169",
    telefoneLabel: "(11) 98909-9169",
    carro: "GAC GS3 Premium",
    origem: "Lead Mercado Livre",
    estagio: "vendeu",
    valorVenda: 47890,
    formaPagamento: "Financiamento bancário",
    visitaEm: "20/06",
    veioEm: "20/06",
    fechadoEm: "2026-07-05",
  },
  {
    id: "l6",
    nome: "Thiago da Silva",
    telefone: "5513997000000",
    telefoneLabel: "(13) 99700-0000",
    carro: "RAM Rampage Laramie",
    origem: "Seguidor Instagram · Praia Grande SP",
    estagio: "vendeu",
    valorVenda: 145000,
    formaPagamento: "Troca + diferença",
    conversaEm: "13/06",
    visitaEm: "20/06",
    veioEm: "20/06",
    fechadoEm: "2026-07-12",
  },
  {
    id: "l7",
    nome: "Carlos Menezes",
    telefone: "5583970000000",
    telefoneLabel: "(83) 97000-0000",
    carro: "Mercedes-Benz GLA 200",
    origem: "Achou o valor acima do orçamento",
    estagio: "nao-comprou",
    motivoPerda: "Foi de outro modelo",
    conversaEm: "02/07",
    fechadoEm: "2026-07-08",
  },
];
