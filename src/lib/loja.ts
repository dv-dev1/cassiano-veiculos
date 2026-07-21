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

// Imagens de ambiente (Unsplash, verificadas) — PLACEHOLDER até as fotos
// reais do showroom/fachada da Cassiano entrarem.
export const imagens = {
  hero: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=2000&q=80",
  // Interior de concessionária — imagem que expande no efeito "entrar no
  // showroom". Trocar pela foto real da loja da Cassiano depois.
  showroomHero:
    "https://images.unsplash.com/photo-1564631211140-d918ad9b66d4?auto=format&fit=crop&w=2000&q=85",
  // Fundo do efeito (some conforme a mídia expande).
  showroomBg:
    "https://images.unsplash.com/photo-1692406069831-0bb7ea297645?auto=format&fit=crop&w=2000&q=85",
  showroom: [
    "https://images.unsplash.com/photo-1692406069831-0bb7ea297645?auto=format&fit=crop&w=1600&q=80",
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
