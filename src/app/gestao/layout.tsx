import type { Metadata } from "next";
import { GestaoShell } from "@/components/gestao/GestaoShell";

// Área interna dos vendedores. `noindex` reforça que o público nunca a
// encontra por busca (a trava de login real entra com o Supabase, próxima fase).
export const metadata: Metadata = {
  title: "Gestão",
  robots: { index: false, follow: false },
};

export default function GestaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GestaoShell>{children}</GestaoShell>;
}
