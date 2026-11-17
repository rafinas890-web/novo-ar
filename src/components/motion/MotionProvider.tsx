"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// domMax é necessário para layoutId (abas e lightbox) e drag. Carregado sob demanda, fora do bundle inicial.
const carregarFeatures = () => import("./features").then((m) => m.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={carregarFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
