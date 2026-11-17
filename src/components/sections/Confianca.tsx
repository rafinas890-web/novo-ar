"use client";

import { m } from "motion/react";
import { EASE } from "../motion/Revelar";

const ITENS = ["Atendimento 24 horas.", "Nota 5,0 no Google.", "Na Parada Inglesa."];

/** Faixa de confiança: três frases grandes, sem números inventados. */
export function Confianca() {
  return (
    <section aria-label="Por que confiar" className="bg-gelo py-20 md:py-28">
      <m.ul
        className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3 md:gap-8 md:px-8"
        initial="fora"
        whileInView="dentro"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        variants={{ dentro: { transition: { staggerChildren: 0.12 } } }}
      >
        {ITENS.map((texto) => (
          <m.li
            key={texto}
            variants={{
              fora: { opacity: 0, y: 24 },
              dentro: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="border-t border-profundo/15 pt-6"
          >
            <p className="font-display text-[2rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-profundo md:text-[2.4rem] lg:text-[2.75rem]">
              {texto}
            </p>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}
