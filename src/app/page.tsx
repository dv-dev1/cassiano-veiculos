import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsappFab } from "@/components/WhatsappFab";
import { Hero } from "@/components/home/Hero";
import { SelosBar } from "@/components/home/SelosBar";
import { Destaques } from "@/components/home/Destaques";
import { Diferenciais } from "@/components/home/Diferenciais";
import { Fundador } from "@/components/home/Fundador";
import { Showroom } from "@/components/home/Showroom";
import { Contato } from "@/components/home/Contato";
import { getDestaques, contarVeiculos } from "@/lib/veiculos";

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
        <Showroom />
        <Contato />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
