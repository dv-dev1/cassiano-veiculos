// Dados da loja Cassiano Veículos usados em todo o site (header, hero,
// contato, footer). Dados reais fornecidos pela loja.

export const loja = {
  nome: "Cassiano Veículos",
  slogan: "Seu próximo veículo com tranquilidade.",
  descricao:
    "Seminovos selecionados, procedência garantida e atendimento de quem entende de carro.",
  cnpj: "37.203.730/0001-08",
  whatsapp: "5583996071247", // (83) 99607-1247
  whatsappLabel: "(83) 99607-1247",
  instagram: "https://www.instagram.com/cassianoveiculosoficial",
  instagramHandle: "@cassianoveiculosoficial",
  endereco:
    "Rodovia BR-230, 14162, Loja 10 — Trevo Auto Shop, Cabedelo - PB, CEP 58109-303",
  horario: {
    semana: "Segunda a Sexta, 08h às 18h",
    sabado: "Sábado, 08h às 18h",
    domingo: "Domingo, fechado",
  },
  // Embed do Google Maps do endereço da loja (Trevo Auto Shop, Cabedelo-PB).
  mapaEmbed:
    "https://www.google.com/maps?q=Trevo+Auto+Shop,+Rodovia+BR-230,+Cabedelo+-+PB,+58109-303&output=embed",
} as const;

// Imagens de ambiente.
export const imagens = {
  // Hero — carro premium (placeholder Unsplash; trocar por foto da loja se quiser).
  hero: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=2000&q=80",
  // Foto real do fundador da Cassiano.
  fundador: "/fundador.png",
} as const;

export function whatsappLink(mensagem?: string): string {
  const base = `https://wa.me/${loja.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
