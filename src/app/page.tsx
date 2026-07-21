import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsappFab } from "@/components/WhatsappFab";
import { Hero } from "@/components/home/Hero";
import { SelosBar } from "@/components/home/SelosBar";
import { Destaques } from "@/components/home/Destaques";
import { Diferenciais } from "@/components/home/Diferenciais";
import { Fundador } from "@/components/home/Fundador";
import { Contato } from "@/components/home/Contato";
import { getDestaques, contarVeiculos } from "@/lib/veiculos";

/**
 * Ordem da home pela escada de decisão de compra:
 * Hero (atenção + promessa) → Selos (remove medo) → Estoque (o que ele veio
 * ver, o coração da conversão) → Diferenciais (por que aqui) → Fundador
 * (prova humana, confiança) → Contato (a ação: WhatsApp).
 * Sem showroom decorativo — foco em ver carro e chamar no WhatsApp.
 */
export default async function HomePage() {
  const [destaques, total] = await Promise.all([
    getDestaques(),
    contarVeiculos(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SelosBar />
        <Destaques veiculos={destaques} total={total} />
        <Diferenciais />
        <Fundador />
        <Contato />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
