"use client";

import { AnimatePresence, m, type PanInfo } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fotos, type Foto } from "@/data/negocio";
import { IconeFechar } from "../Icones";
import { EASE, Revelar } from "../motion/Revelar";

type Item = { id: string; foto: Foto; legenda: string };

const ITENS: Item[] = [
  { id: "quarto", foto: fotos.quartoInstalado, legenda: "Quarto climatizado." },
  { id: "parede", foto: fotos.splitParedeEscura, legenda: "Instalação limpa." },
  { id: "escada", foto: fotos.tecnicoEscada, legenda: "Higienização no local." },
];

const MOLA = { type: "spring", bounce: 0, duration: 0.5 } as const;

export function Trabalhos() {
  const [aberto, setAberto] = useState<Item | null>(null);
  const origem = useRef<HTMLButtonElement | null>(null);

  return (
    <section id="trabalhos" className="bg-gelo py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Revelar>
          <p className="rotulo text-botao">Trabalhos reais</p>
          <h2 className="titulo-secao mt-5 text-profundo">Trabalho entregue.</h2>
        </Revelar>

        {/* Grade assimétrica: uma foto grande + duas menores */}
        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-[1.25fr_1fr] md:grid-rows-2 md:gap-5">
          {ITENS.map((item, i) => (
            <m.li
              key={item.id}
              className={i === 0 ? "md:row-span-2" : ""}
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            >
              <button
                type="button"
                onClick={(e) => {
                  origem.current = e.currentTarget;
                  setAberto(item);
                }}
                className="group cartao-brilho block h-full w-full rounded-[28px] text-left"
                aria-label={`Ampliar foto: ${item.legenda}`}
              >
                <m.div
                  layoutId={`foto-${item.id}`}
                  transition={MOLA}
                  className={`relative overflow-hidden rounded-[28px] bg-profundo ${
                    i === 0 ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-[4/3] md:aspect-auto md:h-full md:min-h-[17rem]"
                  }`}
                >
                  <Image
                    src={item.foto.src}
                    alt={item.foto.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 560px, 92vw" : "(min-width: 768px) 450px, 92vw"}
                    className="object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-profundo/80 to-transparent px-6 pt-16 pb-5 font-display text-xl font-extrabold tracking-[-0.02em] text-white md:text-2xl">
                    {item.legenda}
                  </span>
                </m.div>
              </button>
            </m.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {aberto && (
          <Lightbox
            item={aberto}
            aoFechar={() => {
              setAberto(null);
              origem.current?.focus();
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({ item, aoFechar }: { item: Item; aoFechar: () => void }) {
  const fechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.style.overflow = "hidden";
    fechar.current?.focus();
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && aoFechar();
    window.addEventListener("keydown", aoTeclar);
    return () => {
      raiz.style.overflow = "";
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aoFechar]);

  const aoSoltar = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 600) aoFechar();
  };

  const { largura, altura } = item.foto;

  return (
    <div role="dialog" aria-modal="true" aria-label={item.legenda} className="fixed inset-0 z-50 grid place-items-center p-4 md:p-10">
      <m.div
        aria-hidden
        className="absolute inset-0 bg-[#031A30]/92"
        onClick={aoFechar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      <m.figure
        className="relative flex max-h-full flex-col items-center"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.08, bottom: 0.6 }}
        onDragEnd={aoSoltar}
      >
        <m.div
          layoutId={`foto-${item.id}`}
          transition={MOLA}
          className="relative overflow-hidden rounded-[28px] bg-profundo"
          style={{
            aspectRatio: `${largura} / ${altura}`,
            height: "min(80svh, calc((100vw - 2rem) * " + altura / largura + "))",
          }}
        >
          <Image src={item.foto.src} alt={item.foto.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
        </m.div>
        <m.figcaption
          className="mt-4 font-display text-xl font-extrabold tracking-[-0.02em] text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: EASE } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          {item.legenda}
        </m.figcaption>
      </m.figure>

      <m.button
        ref={fechar}
        type="button"
        onClick={aoFechar}
        className="aperto absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white text-profundo md:top-6 md:right-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <IconeFechar className="size-6" />
        <span className="sr-only">Fechar</span>
      </m.button>
    </div>
  );
}
