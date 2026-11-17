"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { fotos, negocio, type Foto } from "@/data/negocio";
import { IconeSeta } from "../Icones";
import { EASE, Revelar } from "../motion/Revelar";

type Servico = { id: string; nome: string; texto: string; foto: Foto };

const SERVICOS: Servico[] = [
  {
    id: "instalacao",
    nome: "Instalação",
    texto: "Instalação caprichada, organizada e com explicação de como usar o aparelho.",
    foto: fotos.tecnicoCondensadora,
  },
  {
    id: "manutencao",
    nome: "Manutenção",
    texto: "Manutenção preventiva e corretiva para o ar voltar a gelar direito.",
    foto: fotos.splitEscritorio,
  },
  {
    id: "higienizacao",
    nome: "Higienização",
    texto: "Limpeza completa da evaporadora, com capa de lavagem e cuidado com o ambiente.",
    foto: fotos.limpezaEvaporadora,
  },
];

export function Servicos() {
  const [ativo, setAtivo] = useState(0);
  const s = SERVICOS[ativo];

  return (
    <section id="servicos" className="bg-white py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Revelar>
          <p className="rotulo text-botao">Serviços</p>
          <h2 className="titulo-secao mt-5 text-profundo">O que a gente faz.</h2>
        </Revelar>

        {/* Seletor de abas em vidro; no celular vira faixa rolável com snap */}
        <Revelar atraso={0.1} className="-mx-5 mt-12 md:mx-0 md:mt-16">
          <div className="sem-barra snap-x snap-mandatory overflow-x-auto px-5 pb-2 md:overflow-visible md:px-0">
            <div
              role="tablist"
              aria-label="Serviços"
              className="vidro inline-flex gap-1 rounded-full p-1.5"
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const prox = (ativo + (e.key === "ArrowRight" ? 1 : SERVICOS.length - 1)) % SERVICOS.length;
                setAtivo(prox);
                document.getElementById(`aba-${SERVICOS[prox].id}`)?.focus();
              }}
            >
              {SERVICOS.map((item, i) => {
                const sel = i === ativo;
                return (
                  <button
                    key={item.id}
                    id={`aba-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={sel}
                    aria-controls="painel-servico"
                    tabIndex={sel ? 0 : -1}
                    onClick={() => setAtivo(i)}
                    className={`aperto relative snap-start rounded-full px-5 py-3 text-[0.98rem] font-semibold whitespace-nowrap md:px-7 ${
                      sel ? "text-white" : "text-profundo/75 hover:text-profundo"
                    }`}
                  >
                    {sel && (
                      <m.span
                        layoutId="indicador-aba"
                        className="absolute inset-0 rounded-full bg-botao shadow-[0_8px_20px_-10px_rgb(0_119_194/0.8)]"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative">{item.nome}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Revelar>

        <div
          id="painel-servico"
          role="tabpanel"
          aria-labelledby={`aba-${s.id}`}
          className="mt-10 grid items-center gap-10 md:mt-14 md:grid-cols-[0.95fr_1.05fr] md:gap-16"
        >
          <div className="relative min-h-[13rem] md:min-h-[17rem]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={s.id}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 className="font-display text-[2.5rem] leading-none font-extrabold tracking-[-0.03em] text-profundo md:text-[3.5rem]">
                  {s.nome}.
                </h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-grafite/80 md:text-xl">{s.texto}</p>
                <a
                  href={negocio.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-1 rounded-full text-[1.0625rem] font-semibold text-botao underline-offset-4 hover:underline"
                >
                  Pedir orçamento de {s.nome.toLowerCase()}
                  <IconeSeta className="size-4" />
                </a>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gelo md:aspect-square">
            <AnimatePresence initial={false}>
              <m.div
                key={s.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <Image
                  src={s.foto.src}
                  alt={s.foto.alt}
                  fill
                  sizes="(min-width: 1152px) 560px, (min-width: 768px) 52vw, 92vw"
                  className="object-cover"
                />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
