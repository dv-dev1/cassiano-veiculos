import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Qualidade da otimização. O padrão do Next é 75, que re-comprime demais
    // nossas fotos reais (equipe, Cassiano, veículos) e faz o site parecer de
    // baixa resolução. Subimos pra 90 e permitimos essa qualidade.
    // (No Next 16, `qualities` precisa listar os valores usados nos <Image>.)
    qualities: [75, 90],
    // Formatos modernos primeiro (AVIF melhor que WebP em tamanho/qualidade).
    // Sem isso o Next reentrega JPEG re-comprimido em alguns casos.
    formats: ["image/avif", "image/webp"],
    // Larguras geradas — inclui tamanhos grandes pra hero/retratos não borrarem.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 768],
    // Placeholders de estoque (Unsplash) enquanto restar algum. Quando as fotos
    // reais forem hospedadas (Supabase Storage), adicionar o host aqui.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
