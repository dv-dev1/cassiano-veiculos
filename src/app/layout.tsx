import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { loja } from "@/lib/loja";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${loja.nome} — Seminovos premium com procedência`,
    template: `%s · ${loja.nome}`,
  },
  description: loja.descricao,
  openGraph: {
    title: `${loja.nome} — Seminovos premium com procedência`,
    description: loja.descricao,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
