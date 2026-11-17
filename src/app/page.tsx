import { Navbar } from "@/components/Navbar";
import { Rodape } from "@/components/Rodape";
import { AbaixoDaDobra } from "@/components/sections/AbaixoDaDobra";
import { Hero } from "@/components/sections/Hero";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";
import { schemaNegocio } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaNegocio()).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="conteudo">
        <Hero />
        <AbaixoDaDobra />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
    </>
  );
}
