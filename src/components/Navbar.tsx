"use client";

import { AnimatePresence, m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { negocio, secoes } from "@/data/negocio";
import { LogoHorizontal } from "./brand/Logo";
import { Botao, BotaoWhatsApp } from "./Botoes";
import { Estrela, IconeFechar, IconeMenu, IconeTelefone, IconeWhatsApp } from "./Icones";
import { EASE } from "./motion/Revelar";

export function Navbar() {
  const [aberto, setAberto] = useState(false);
  const reduzir = useReducedMotion();
  const { scrollY } = useScroll();
  const escala = useTransform(scrollY, [0, 160], [1, 0.965]);
  const sobe = useTransform(scrollY, [0, 160], [0, -6]);
  const botaoMenu = useRef<HTMLButtonElement>(null);
  const botaoFechar = useRef<HTMLButtonElement>(null);
  const jaAbriu = useRef(false);

  useEffect(() => {
    const raiz = document.documentElement;
    if (aberto) {
      jaAbriu.current = true;
      raiz.style.overflow = "hidden";
      botaoFechar.current?.focus();
      const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
      window.addEventListener("keydown", aoTeclar);
      return () => {
        raiz.style.overflow = "";
        window.removeEventListener("keydown", aoTeclar);
      };
    }
    if (jaAbriu.current) botaoMenu.current?.focus();
  }, [aberto]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-4">
        <m.nav
          aria-label="Principal"
          style={reduzir ? undefined : { scale: escala, y: sobe }}
          className="vidro pointer-events-auto mx-auto flex h-16 max-w-6xl origin-top items-center justify-between rounded-full pr-2 pl-5 md:h-[4.25rem] md:pl-6"
        >
          <a href="#inicio" className="rounded-full py-2">
            <LogoHorizontal className="h-8 w-auto md:h-9" />
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {secoes.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-grafite/80 transition-colors hover:bg-profundo/[0.06] hover:text-profundo"
                >
                  {s.rotulo}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={negocio.links.google}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-profundo hover:bg-profundo/[0.06] xl:inline-flex"
            >
              {negocio.google.notaTexto}
              <Estrela className="size-3.5 text-azul" />
              <span className="font-medium text-grafite/70">no Google</span>
            </a>
            <div className="hidden sm:block">
              <Botao
                href={negocio.links.whatsapp}
                externo
                variante="azul"
                tamanho="md"
                icone={<IconeWhatsApp className="size-[1.125rem]" />}
              >
                Pedir orçamento
              </Botao>
            </div>
            <button
              ref={botaoMenu}
              type="button"
              onClick={() => setAberto(true)}
              aria-expanded={aberto}
              aria-controls="menu-celular"
              className="aperto grid size-12 place-items-center rounded-full text-profundo hover:bg-profundo/[0.06] lg:hidden"
            >
              <IconeMenu className="size-6" />
              <span className="sr-only">Abrir menu</span>
            </button>
          </div>
        </m.nav>
      </header>

      <AnimatePresence>
        {aberto && (
          <m.div
            id="menu-celular"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-profundo px-6 pt-5 pb-10 text-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <LogoHorizontal tom="negativo" className="h-8 w-auto" />
              <button
                ref={botaoFechar}
                type="button"
                onClick={() => setAberto(false)}
                className="aperto grid size-12 place-items-center rounded-full border border-white/20"
              >
                <IconeFechar className="size-6" />
                <span className="sr-only">Fechar menu</span>
              </button>
            </div>

            <m.ul
              className="mt-14 flex flex-col gap-1"
              initial="fora"
              animate="dentro"
              variants={{ dentro: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
            >
              {secoes.map((s) => (
                <m.li
                  key={s.id}
                  variants={{
                    fora: { opacity: 0, y: 24 },
                    dentro: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setAberto(false)}
                    className="block py-2 font-display text-[2.6rem] leading-tight font-extrabold tracking-[-0.03em]"
                  >
                    {s.rotulo}.
                  </a>
                </m.li>
              ))}
            </m.ul>

            <m.div
              className="mt-auto flex flex-col gap-3 pt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              <p className="mb-2 text-sm text-ceu">
                {negocio.google.notaTexto} ★ no Google · {negocio.horario}
              </p>
              <BotaoWhatsApp variante="branco" />
              <a
                href={negocio.links.ligar}
                className="aperto inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/40 font-semibold"
              >
                <IconeTelefone className="size-5" />
                {negocio.telefone}
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
