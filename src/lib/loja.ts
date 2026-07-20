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

export function whatsappLink(mensagem?: string): string {
  const base = `https://wa.me/${loja.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
