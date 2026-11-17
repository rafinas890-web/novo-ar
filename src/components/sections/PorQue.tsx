"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Floco } from "../brand/Floco";
import { IconeCapricho, IconeConversa, IconeRelogio } from "../Icones";
import { EASE, Revelar } from "../motion/Revelar";

const PONTOS = [
  { nome: "Pontualidade", Icone: IconeRelogio },
  { nome: "Capricho", Icone: IconeCapricho },
  { nome: "Explica tudo", Icone: IconeConversa },
];

/** Resume o que as avaliações reais dizem. Não inventar outros diferenciais. */
export function PorQue() {
  const secao = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: secao, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const giro = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={secao} aria-labelledby="porque-titulo" className="overflow-hidden bg-white py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <Revelar>
            <p className="rotulo text-botao">Por que a Novo Ar</p>
            <h2 id="porque-titulo" className="titulo-secao mt-5 text-profundo">
              Pontual. Cuidadoso. Explica tudo.
            </h2>
          </Revelar>
          <Revelar atraso={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-grafite/80 md:text-xl">
              Os clientes da Novo Ar falam sempre a mesma coisa: a equipe chega no horário, trabalha com
              capricho, deixa tudo limpo e explica o funcionamento do aparelho.
            </p>
          </Revelar>

          <m.ul
            className="mt-12 grid gap-6 sm:grid-cols-3"
            initial="fora"
            whileInView="dentro"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={{ dentro: { transition: { staggerChildren: 0.1 } } }}
          >
            {PONTOS.map(({ nome, Icone }) => (
              <m.li
                key={nome}
                variants={{
                  fora: { opacity: 0, y: 18 },
                  dentro: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="flex items-center gap-3 sm:flex-col sm:items-start"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-gelo text-azul">
                  <Icone className="size-6" />
                </span>
                <span className="text-lg font-semibold text-profundo">{nome}</span>
              </m.li>
            ))}
          </m.ul>
        </div>

        <m.div
          aria-hidden
          className="mx-auto w-[min(70vw,24rem)] text-azul md:w-full"
          style={reduzir ? undefined : { y, rotate: giro }}
        >
          <Floco className="h-auto w-full" traco={1.4} />
        </m.div>
      </div>
    </section>
  );
}
