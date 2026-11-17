"use client";

import { m } from "motion/react";
import Image from "next/image";
import { avaliacoes, negocio } from "@/data/negocio";
import { Estrela, IconeSeta } from "../Icones";
import { EASE, Revelar } from "../motion/Revelar";

export function Avaliacoes() {
  const { notaTexto, total } = negocio.google;

  return (
    <section id="avaliacoes" className="bg-gelo py-28 md:py-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:px-8 lg:flex-row lg:items-end lg:justify-between">
        <Revelar>
          <p className="rotulo text-botao">Avaliações do Google</p>
          <h2 className="titulo-secao mt-5 max-w-[12ch] text-profundo">Quem chamou, recomenda.</h2>
        </Revelar>

        <Revelar atraso={0.1} className="shrink-0">
          <div className="flex items-center gap-5 rounded-[28px] bg-white px-7 py-6">
            <span className="font-display text-[4.5rem] leading-none font-extrabold tracking-[-0.04em] text-profundo">
              {notaTexto}
            </span>
            <div>
              <div className="flex gap-1 text-azul" role="img" aria-label="5 de 5 estrelas">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Estrela key={i} className="size-5" />
                ))}
              </div>
              <p className="mt-2 text-[0.95rem] text-grafite/75">{total} avaliações no Google</p>
            </div>
          </div>
        </Revelar>
      </div>

      {/* Celular: carrossel com snap e arraste. Desktop: colunas tipo masonry. */}
      <m.ul
        aria-label="Avaliações de clientes"
        className="sem-barra mx-auto mt-14 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-6 md:mt-20 md:block md:columns-2 md:gap-6 md:overflow-visible md:px-8 lg:columns-3"
        initial="fora"
        whileInView="dentro"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={{ dentro: { transition: { staggerChildren: 0.09 } } }}
      >
        {avaliacoes.map((a) => (
          <m.li
            key={a.nome}
            variants={{
              fora: { opacity: 0, y: 24 },
              dentro: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="w-[86%] shrink-0 snap-center sm:w-[60%] md:mb-6 md:w-auto md:break-inside-avoid"
          >
            <figure className="cartao-brilho h-full rounded-[28px] bg-white p-7 md:p-8">
              <div className="flex gap-1 text-azul" role="img" aria-label="5 de 5 estrelas">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Estrela key={i} className="size-[1.125rem]" />
                ))}
              </div>
              <blockquote className="mt-5 text-[1.0625rem] leading-relaxed text-grafite">“{a.texto}”</blockquote>
              {a.fotos && (
                <div className="mt-5 flex gap-2">
                  {a.fotos.map((f) => (
                    <div key={f.src} className="relative size-16 overflow-hidden rounded-2xl bg-gelo">
                      <Image src={f.src} alt={f.alt} fill sizes="64px" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
              <figcaption className="mt-6 border-t border-profundo/10 pt-5">
                <span className="block font-semibold text-profundo">{a.nome}</span>
                <span className="mt-0.5 block text-sm text-grafite/65">
                  {a.quando}
                  {a.detalhe ? ` · ${a.detalhe}` : ""}
                </span>
              </figcaption>
            </figure>
          </m.li>
        ))}
      </m.ul>

      <Revelar className="mt-8 px-5 text-center md:mt-10">
        <a
          href={negocio.links.google}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full text-[1.0625rem] font-semibold text-botao underline-offset-4 hover:underline"
        >
          Ver todas as {total} avaliações no Google
          <IconeSeta className="size-4" />
        </a>
      </Revelar>
    </section>
  );
}
