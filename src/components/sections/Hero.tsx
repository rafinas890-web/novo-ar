"use client";

import {
  m,
  motionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { fotos, negocio } from "@/data/negocio";
import { Floco } from "../brand/Floco";
import { CorrenteDeAr } from "../brand/Ondas";
import { BotaoLigar, BotaoWhatsApp } from "../Botoes";
import { Estrela } from "../Icones";

const PALAVRAS = ["Ar", "novo.", "Casa", "fresca."];

// Céu limpo: Azul Profundo → Azul Novo Ar → Céu. A camada "fria" por cima só muda de opacity.
const CEU_CLARO = "linear-gradient(160deg, #06325A 0%, #0077C2 42%, #009AF4 68%, #BFE6FF 100%)";
const CEU_FRIO = "linear-gradient(160deg, #031A30 0%, #06325A 48%, #0067A8 100%)";

// MotionValue estático para quando não há cena (reduced-motion).
const SEM_CENA = motionValue(1);

/**
 * Hero com cena fixa ligada à rolagem.
 * Desktop: a seção tem 250svh, o palco fica fixo por ~1,5 tela.
 * Celular: o palco fica fixo enquanto a foto do técnico sobe por cima dele (cena mais curta).
 * Ao rolar: as ondas da logo fluem, o floco gira, a temperatura desce de 32° para 22°
 * e o fundo esfria. Tudo reversível. Com prefers-reduced-motion: sem cena fixa.
 */
export function Hero() {
  const secao = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const anima = !reduzir;
  const { scrollYProgress: p } = useScroll({ target: secao, offset: ["start start", "end end"] });

  const frio = useTransform(p, [0.05, 0.85], [0, 1]);
  const giroFloco = useTransform(p, [0, 1], [0, 150]);
  const escalaFloco = useTransform(p, [0, 1], [1, 1.12]);
  const ventoX = useTransform(p, [0, 1], ["-22%", "0%"]);
  const fotoY = useTransform(p, [0, 1], [0, -64]);

  return (
    <section
      ref={secao}
      id="inicio"
      aria-label="Início"
      className="relative bg-profundo lg:h-[250svh] motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-svh">
        {/* Fundo: céu claro + camada fria por cima (só opacity) */}
        <div aria-hidden className="absolute inset-0" style={{ background: CEU_CLARO }} />
        <m.div
          aria-hidden
          className="absolute inset-0"
          style={{ background: CEU_FRIO, opacity: anima ? frio : 0 }}
        />

        {/* Floco grande translúcido */}
        <m.div
          aria-hidden
          className="pointer-events-none absolute top-[6%] right-[-34%] w-[110vw] text-white opacity-[0.09] sm:right-[-20%] sm:w-[80vw] lg:top-[-8%] lg:right-[-8%] lg:w-[58vw]"
          style={anima ? { rotate: giroFloco, scale: escalaFloco } : undefined}
        >
          <Floco className="h-auto w-full" traco={1.6} />
        </m.div>

        {/* As duas ondas da logo, como uma corrente de ar */}
        <m.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[6%] h-[26svh] w-[130%] lg:bottom-[10%] lg:h-[34svh]"
          style={anima ? { x: ventoX } : undefined}
        >
          <CorrenteDeAr className="h-full w-full" opacidade={0.42} duracao={26} />
        </m.div>

        {/* Conteúdo */}
        <div className="relative mx-auto grid h-full w-full max-w-7xl items-center gap-12 px-5 pt-24 pb-10 md:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:pt-28 lg:pb-16 motion-reduce:min-h-svh">
          <div>
            <p className="rotulo surge text-ceu" style={{ "--d": "0ms" } as CSSProperties}>
              {negocio.horario}
            </p>
            <h1 className="titulo-gigante mt-5 text-white">
              {[PALAVRAS.slice(0, 2), PALAVRAS.slice(2)].map((linha, l) => (
                <span key={l} className="block sm:whitespace-nowrap">
                  {linha.map((palavra, j) => (
                    <span key={palavra}>
                      <span className="palavra-entra" style={{ "--i": l * 2 + j } as CSSProperties}>
                        {palavra}
                      </span>
                      {j === 0 ? " " : null}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p
              className="surge mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/85 md:text-xl"
              style={{ "--d": "520ms" } as CSSProperties}
            >
              Instalação, manutenção e higienização de ar-condicionado na Parada Inglesa e região.
            </p>
            <div
              className="surge mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ "--d": "640ms" } as CSSProperties}
            >
              <BotaoWhatsApp variante="branco" />
              <BotaoLigar variante="contorno-claro" />
            </div>
            <a
              href={negocio.links.google}
              target="_blank"
              rel="noopener noreferrer"
              className="surge mt-6 inline-flex items-center gap-2 rounded-full text-[0.95rem] text-white/85 hover:text-white"
              style={{ "--d": "760ms" } as CSSProperties}
            >
              <span className="flex gap-0.5 text-ceu" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Estrela key={i} className="size-4" />
                ))}
              </span>
              <span>
                <strong className="font-semibold text-white">{negocio.google.notaTexto}</strong> ·{" "}
                {negocio.google.total} avaliações no Google
              </span>
            </a>
          </div>

          {/* Desktop: foto dentro do palco, com parallax */}
          <m.div
            className="surge relative hidden justify-self-end lg:block"
            style={{ "--d": "300ms", ...(anima ? { y: fotoY } : {}) } as CSSProperties}
          >
            <FotoTecnico
              sizes="(min-width: 1024px) 34vw, 1px"
              prioridade
              className="aspect-[3/4] h-[min(66svh,680px)]"
            />
            <Mostrador progresso={anima ? p : undefined} />
          </m.div>
        </div>
      </div>

      {/* Celular/tablet: a foto sobe por cima do palco fixo */}
      <div className="relative z-10 px-5 pb-12 md:px-8 lg:hidden">
        <div className="relative mx-auto max-w-md">
          <FotoTecnico sizes="(min-width: 1024px) 1px, 92vw" className="aspect-[4/5] w-full" />
          <Mostrador progresso={anima ? p : undefined} />
        </div>
      </div>
    </section>
  );
}

function FotoTecnico({
  sizes,
  prioridade = false,
  className = "",
}: {
  sizes: string;
  prioridade?: boolean;
  className?: string;
}) {
  const f = fotos.tecnicoEscada;
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] bg-profundo shadow-[0_40px_80px_-40px_rgb(3_26_48/0.8)] ${className}`}
    >
      <Image
        src={f.src}
        alt={f.alt}
        fill
        sizes={sizes}
        className="object-cover object-[50%_35%]"
        {...(prioridade ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      />
    </div>
  );
}

/** Mostrador de temperatura: decorativo (é ilustração, não medição). */
function Mostrador({ progresso }: { progresso?: MotionValue<number> }) {
  const numero = useRef<HTMLSpanElement>(null);
  const ultimo = useRef(32);

  const graus = useTransform(progresso ?? SEM_CENA, [0.06, 0.9], [32, 22]);
  useMotionValueEvent(graus, "change", (v) => {
    const g = Math.round(v);
    if (g !== ultimo.current && numero.current) {
      ultimo.current = g;
      numero.current.textContent = `${g}°`;
    }
  });

  // Sem cena (reduced-motion): mostra direto o estado final.
  useEffect(() => {
    if (!progresso && numero.current) numero.current.textContent = "22°";
  }, [progresso]);

  return (
    <div
      aria-hidden
      className="absolute bottom-4 left-4 flex items-end gap-3 rounded-[22px] bg-profundo/90 py-3 pr-5 pl-4 text-white shadow-[0_20px_40px_-20px_rgb(3_26_48/0.9)] lg:bottom-6 lg:left-[-2.5rem]"
    >
      <span
        ref={numero}
        className="font-display text-[3.25rem] leading-none font-extrabold tracking-[-0.04em] tabular-nums lg:text-[4.25rem]"
      >
        32°
      </span>
      <span className="mb-1.5 text-[0.7rem] leading-tight font-medium tracking-[0.14em] text-ceu uppercase">
        Temperatura
        <br />
        ilustrativa
      </span>
    </div>
  );
}

