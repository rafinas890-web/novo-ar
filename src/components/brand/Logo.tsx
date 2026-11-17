import { FLOCO_PATH } from "./Floco";
import { ONDA_BAIXO, ONDA_CIMA } from "./Ondas";

/**
 * Logo da Novo Ar recriada em SVG (nunca como imagem):
 * "NOVO AR" muito pesado e levemente inclinado, floco de neve de 6 pontas à direita do "R",
 * duas ondas finas e alongadas atravessando por baixo e "AR CONDICIONADOS" alinhado à direita.
 *
 * Tons: "negativo" (branco, para fundo azul — a original) e "positivo" (Azul Profundo, fundo claro).
 */

type Tom = "negativo" | "positivo";

const COR: Record<Tom, string> = {
  negativo: "#FFFFFF",
  positivo: "#06325A",
};

const fonteTitulo = { fontFamily: "var(--font-montserrat), sans-serif" } as const;
const fonteTexto = { fontFamily: "var(--font-inter), sans-serif" } as const;

/** Logo completa (empilhada). */
export function Logo({ tom = "negativo", className = "h-16 w-auto" }: { tom?: Tom; className?: string }) {
  const cor = COR[tom];
  return (
    <svg viewBox="0 0 224 84" className={className} role="img" aria-label="Novo Ar Ar Condicionados">
      <g transform="skewX(-9) translate(8 0)">
        <text
          x="10"
          y="46"
          fontSize="44"
          fontWeight="800"
          textLength="166"
          lengthAdjust="spacingAndGlyphs"
          fill={cor}
          style={fonteTitulo}
        >
          NOVO AR
        </text>
      </g>
      <g transform="translate(184 9) scale(0.7)">
        <path d={FLOCO_PATH} fill="none" stroke={cor} strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d={ONDA_CIMA} fill={cor} />
      <path d={ONDA_BAIXO} fill={cor} />
      <text
        x="219"
        y="81"
        textAnchor="end"
        fontSize="8.4"
        fontWeight="600"
        letterSpacing="1.5"
        fill={cor}
        style={fonteTexto}
      >
        AR CONDICIONADOS
      </text>
    </svg>
  );
}

/** Versão horizontal compacta para a navbar: "NOVO AR" + floco, ondas por baixo. */
export function LogoHorizontal({
  tom = "positivo",
  className = "h-9 w-auto",
}: {
  tom?: Tom;
  className?: string;
}) {
  const cor = COR[tom];
  const destaque = tom === "positivo" ? "#009AF4" : cor;
  return (
    <svg viewBox="0 4 224 68" className={className} role="img" aria-label="Novo Ar Ar Condicionados">
      <g transform="skewX(-9) translate(8 0)">
        <text
          x="10"
          y="46"
          fontSize="44"
          fontWeight="800"
          textLength="166"
          lengthAdjust="spacingAndGlyphs"
          fill={cor}
          style={fonteTitulo}
        >
          NOVO AR
        </text>
      </g>
      <g transform="translate(184 9) scale(0.7)">
        <path
          d={FLOCO_PATH}
          fill="none"
          stroke={destaque}
          strokeWidth="4.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path d={ONDA_CIMA} fill={destaque} />
      <path d={ONDA_BAIXO} fill={destaque} />
    </svg>
  );
}

/** Ícone: quadrado arredondado Azul Novo Ar com o floco branco (favicon e ícone de app). */
export function LogoIcone({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Novo Ar">
      <rect width="64" height="64" rx="15" fill="#009AF4" />
      <g transform="translate(10 10) scale(0.9167)">
        <path d={FLOCO_PATH} fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
