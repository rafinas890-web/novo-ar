import type { CSSProperties } from "react";

/**
 * As duas ondas da logo.
 * - ONDA_*: versão preenchida e afinando nas pontas (usada na logo).
 * - Corrente: versão grande em traço, que se repete a cada 600 unidades. O SVG tem o dobro
 *   da largura visível e desliza -50% em loop (só transform), então a emenda não aparece.
 */

// Logo (viewBox 0 0 224 84)
export const ONDA_CIMA = "M26 58 C 76 49, 146 47, 196 52 C 146 51.4, 78 53.4, 26 58 Z";
export const ONDA_BAIXO = "M6 68.5 C 76 56, 168 54, 220 60 C 168 59.2, 78 62, 6 68.5 Z";

/** Onda periódica (período 600) cobrindo 0..2400 a partir da altura y, com amplitude a. */
export function ondaPeriodica(y: number, a: number) {
  let d = `M0 ${y} C150 ${y - a} 450 ${y + a} 600 ${y}`;
  for (let x = 600; x < 2400; x += 600) {
    d += ` S${x + 450} ${y + a} ${x + 600} ${y}`;
  }
  return d;
}

/**
 * Faixa de "corrente de ar": as duas ondas fluindo para a direita em loop lento.
 * `pausado` congela a animação quando a faixa está fora da tela.
 */
export function CorrenteDeAr({
  className = "",
  cor = "#fff",
  opacidade = 0.35,
  duracao = 22,
  pausado = false,
}: {
  className?: string;
  cor?: string;
  opacidade?: number;
  duracao?: number;
  pausado?: boolean;
}) {
  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
        className={`corrente h-full w-[200%] ${pausado ? "pausado" : ""}`}
        style={
          {
            "--dur": `${duracao}s`,
            animationDirection: "reverse",
          } as CSSProperties
        }
        fill="none"
        stroke={cor}
        strokeLinecap="round"
      >
        <path d={ondaPeriodica(86, 34)} strokeWidth={2} opacity={opacidade} vectorEffect="non-scaling-stroke" />
        <path
          d={ondaPeriodica(124, 40)}
          strokeWidth={1.5}
          opacity={opacidade * 0.7}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
