"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Entrada ao rolar: fade + subida curta, uma vez só. Com reduced-motion, o MotionConfig deixa só o fade. */
export function Revelar({
  children,
  atraso = 0,
  y = 20,
  className,
  como = "div",
}: {
  children: ReactNode;
  atraso?: number;
  y?: number;
  className?: string;
  como?: "div" | "li" | "p" | "span";
}) {
  const Comp = m[como];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: atraso }}
    >
      {children}
    </Comp>
  );
}
