"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";
import { Floco } from "../brand/Floco";
import { CorrenteDeAr } from "../brand/Ondas";
import { BotaoWhatsApp } from "../Botoes";
import { EASE, Revelar } from "../motion/Revelar";

export function CtaFinal() {
  const secao = useRef<HTMLElement>(null);
  const visivel = useInView(secao, { margin: "100px 0px" });

  return (
    <section ref={secao} aria-labelledby="cta-titulo" className="relative overflow-hidden bg-profundo py-32 text-white md:py-44">
      <CorrenteDeAr className="absolute inset-x-0 top-1/2 h-64 -translate-y-1/2" opacidade={0.22} duracao={30} pausado={!visivel} />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center md:px-8">
        <m.div
          aria-hidden
          className="text-ceu"
          initial={{ opacity: 0, rotate: -120, scale: 0.6 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Floco className="size-16 md:size-20" traco={2.4} />
        </m.div>
        <Revelar>
          <h2 id="cta-titulo" className="titulo-gigante mt-8 max-w-[11ch]">
            Calor? A gente resolve.
          </h2>
        </Revelar>
        <Revelar atraso={0.15} className="mt-10">
          <BotaoWhatsApp variante="branco" />
        </Revelar>
      </div>
    </section>
  );
}
