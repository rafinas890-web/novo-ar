"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { negocio } from "@/data/negocio";
import { Floco } from "./brand/Floco";

/**
 * Mapa do Google carregado só quando a seção chega perto da tela (~800 px).
 * O mapa traz ~500 KB de scripts do Google; até lá, um cartão da marca ocupa exatamente o mesmo espaço.
 */
export function MapaPreguicoso({ className = "" }: { className?: string }) {
  const caixa = useRef<HTMLDivElement>(null);
  const perto = useInView(caixa, { once: true, margin: "800px 0px 800px 0px" });

  return (
    <div ref={caixa} className={`relative overflow-hidden rounded-[28px] bg-gelo ${className}`}>
      <div aria-hidden className="absolute inset-0 grid place-items-center text-azul/20">
        <Floco className="h-1/3 w-auto" traco={2} />
      </div>
      {perto && (
        <iframe
          title={`Mapa: ${negocio.nome}, ${negocio.enderecoLinha1}`}
          src={negocio.links.mapaEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
    </div>
  );
}
