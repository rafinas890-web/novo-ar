"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { negocio } from "@/data/negocio";
import { IconeWhatsApp } from "./Icones";
import { EASE } from "./motion/Revelar";

/** Botão flutuante de WhatsApp em vidro: aparece depois do hero, deslizando de baixo. */
export function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const hero = document.getElementById("inicio");
    const fim = hero ? hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.4 : 800;
    const mostrar = y > fim;
    if (mostrar !== visivel) setVisivel(mostrar);
  });

  return (
    <AnimatePresence>
      {visivel && (
        <m.a
          href={negocio.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir orçamento no WhatsApp"
          className="vidro aperto fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 grid size-16 place-items-center rounded-full text-botao md:right-6 md:bottom-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span aria-hidden className="pulso-anel absolute inset-0 rounded-full border-2 border-azul" />
          <IconeWhatsApp className="size-7" />
        </m.a>
      )}
    </AnimatePresence>
  );
}
