import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholders de estoque (Unsplash) enquanto o estoque real não entra.
    // Quando as fotos reais forem hospedadas (Supabase Storage), adicionar
    // o host correspondente aqui.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
