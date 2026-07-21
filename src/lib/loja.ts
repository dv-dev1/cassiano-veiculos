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
    "Rodovia BR-230, 14162, Loja 10, Trevo Auto Shop, Cabedelo - PB, CEP 58109-303",
  horario: {
    semana: "Segunda a Sexta, 08h às 18h",
    sabado: "Sábado, 08h às 18h",
    domingo: "Domingo, fechado",
  },
  // Embed do Google Maps do endereço da loja (Trevo Auto Shop, Cabedelo-PB).
  mapaEmbed:
    "https://www.google.com/maps?q=Trevo+Auto+Shop,+Rodovia+BR-230,+Cabedelo+-+PB,+58109-303&output=embed",
} as const;

// Imagens de ambiente (fotos reais da loja, enviadas pela Cassiano).
export const imagens = {
  // Hero — foto real da concessionária (carros na cobertura), usada como
  // ambiente ao fundo (escurecida/desfocada) atrás do Cassiano.
  hero: "/concessionaria.jpg",
  // Foto recortada (fundo transparente) do Cassiano, o dono e cara da marca.
  // Destaque do hero: a maioria dos clientes compra pela confiança nele.
  // Versão nova em alta (1024x1536), braço completo e fundo transparente.
  cassiano: "/cassiano-novo.png",
  // Foto real da equipe de vendas da Cassiano (usada na seção "Nossa equipe").
  equipe: "/equipe.jpg",
} as const;

export function whatsappLink(mensagem?: string): string {
  const base = `https://wa.me/${loja.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
