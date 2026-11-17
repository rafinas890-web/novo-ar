"use client";

import { lazy, Suspense, type ComponentType } from "react";

/*
 * Hidratação adiada das seções abaixo da dobra (equivale ao next/dynamic, com gatilho próprio).
 *
 * No servidor as seções são renderizadas normalmente (o HTML completo vai para o Google e
 * para quem está sem JS). No navegador, cada seção fica como HTML estático até o primeiro
 * gesto (rolagem, toque, tecla) ou até o navegador ficar ocioso depois do load. Só então o
 * JS dela é baixado e o React hidrata aquela parte. Assim o hero pinta e fica interativo sem
 * disputar CPU e rede com o resto da página.
 */
let liberado: Promise<void> | null = null;

function quandoLiberar(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  liberado ??= new Promise((resolve) => {
    const eventos = ["scroll", "wheel", "pointerdown", "touchstart", "keydown"] as const;
    let feito = false;
    const ir = () => {
      if (feito) return;
      feito = true;
      eventos.forEach((e) => window.removeEventListener(e, ir));
      resolve();
    };
    eventos.forEach((e) => window.addEventListener(e, ir, { passive: true }));

    const aoOcioso = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(ir, { timeout: 3000 }) : setTimeout(ir, 1500);
    if (document.readyState === "complete") aoOcioso();
    else window.addEventListener("load", aoOcioso, { once: true });
  });
  return liberado;
}

/** Cede a vez ao navegador (próxima tarefa ociosa), para cada seção hidratar numa tarefa curta própria. */
function cederVez(): Promise<void> {
  return new Promise((resolve) => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout: 400 });
    else setTimeout(resolve, 60);
  });
}

// Fila: a seção N só começa depois que a N-1 terminou e o navegador respirou.
let fila: Promise<unknown> = Promise.resolve();

function adiar<P extends object>(carregar: () => Promise<ComponentType<P>>) {
  return lazy(() => {
    // No servidor (pré-renderização): carrega direto, sem fila.
    if (typeof window === "undefined") return carregar().then((C) => ({ default: C }));
    const vez = fila.then(quandoLiberar).then(cederVez).then(carregar);
    fila = vez.then(cederVez);
    return vez.then((C) => ({ default: C }));
  });
}

const Confianca = adiar(() => import("./Confianca").then((m) => m.Confianca));
const Servicos = adiar(() => import("./Servicos").then((m) => m.Servicos));
const Trabalhos = adiar(() => import("./Trabalhos").then((m) => m.Trabalhos));
const PorQue = adiar(() => import("./PorQue").then((m) => m.PorQue));
const Avaliacoes = adiar(() => import("./Avaliacoes").then((m) => m.Avaliacoes));
const Contato = adiar(() => import("./Contato").then((m) => m.Contato));
const CtaFinal = adiar(() => import("./CtaFinal").then((m) => m.CtaFinal));

export function AbaixoDaDobra() {
  // Um <Suspense> por seção: cada uma hidrata na sua própria tarefa (sem tarefas longas).
  return (
    <>
      <Suspense>
        <Confianca />
      </Suspense>
      <Suspense>
        <Servicos />
      </Suspense>
      <Suspense>
        <Trabalhos />
      </Suspense>
      <Suspense>
        <PorQue />
      </Suspense>
      <Suspense>
        <Avaliacoes />
      </Suspense>
      <Suspense>
        <Contato />
      </Suspense>
      <Suspense>
        <CtaFinal />
      </Suspense>
    </>
  );
}
