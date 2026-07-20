import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsappFab } from "./WhatsappFab";

/** Moldura do site público: header fixo + conteúdo + footer + WhatsApp flutuante. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
