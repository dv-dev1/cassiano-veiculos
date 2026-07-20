// Dados da loja Cassiano Veículos usados em todo o site (header, hero,
// contato, footer). PLACEHOLDER — o usuário fornece os dados reais.

export const loja = {
  nome: "Cassiano Veículos",
  slogan: "Seu próximo veículo com tranquilidade.",
  descricao:
    "Seminovos selecionados, procedência garantida e atendimento de quem entende de carro.",
  // TODO(usuário): substituir pelos dados reais da Cassiano.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5599999999999",
  whatsappLabel: "(00) 00000-0000",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
  instagramHandle: "@cassianoveiculos",
  endereco: "Endereço da loja — a definir",
  horario: {
    semana: "Segunda a Sexta, 9h às 18h",
    sabado: "Sábado, 9h às 13h",
  },
  // Link do embed do Google Maps — a definir com o endereço real.
  mapaEmbed: "",
} as const;

// Imagens de ambiente (Unsplash, verificadas) — PLACEHOLDER até as fotos
// reais do showroom/fachada da Cassiano entrarem.
export const imagens = {
  hero: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=2000&q=80",
  showroom: [
    "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80",
  ],
  fundador:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
} as const;

export function whatsappLink(mensagem?: string): string {
  const base = `https://wa.me/${loja.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
