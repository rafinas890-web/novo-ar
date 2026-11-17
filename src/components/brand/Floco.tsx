/**
 * Floco de neve de 6 pontas da logo da Novo Ar, desenhado em traço (viewBox 0 0 48 48).
 * Cada ponta é um path separado: dá para desenhar uma de cada vez (pathLength).
 */

export const FLOCO_VIEWBOX = "0 0 48 48";

type Ponto = [number, number];

// Uma ponta apontando para cima, a partir do centro (24, 24).
const PONTA: Ponto[][] = [
  [
    [24, 24],
    [24, 4],
  ],
  [
    [19.2, 6.4],
    [24, 10.6],
    [28.8, 6.4],
  ],
  [
    [20.2, 13.4],
    [24, 16.8],
    [27.8, 13.4],
  ],
];

const girar = ([x, y]: Ponto, graus: number): Ponto => {
  const r = (graus * Math.PI) / 180;
  const dx = x - 24;
  const dy = y - 24;
  return [24 + dx * Math.cos(r) - dy * Math.sin(r), 24 + dx * Math.sin(r) + dy * Math.cos(r)];
};

const fmt = (n: number) => Number(n.toFixed(2));

/** As 6 pontas, cada uma como um path "M ... L ...". */
export const FLOCO_PONTAS: string[] = [0, 60, 120, 180, 240, 300].map((graus) =>
  PONTA.map(
    (linha) =>
      "M" +
      linha
        .map((p) => girar(p, graus))
        .map(([x, y]) => `${fmt(x)} ${fmt(y)}`)
        .join(" L"),
  ).join(" "),
);

export const FLOCO_PATH = FLOCO_PONTAS.join(" ");

export function Floco({
  className,
  traco = 2.6,
  cor = "currentColor",
  titulo,
}: {
  className?: string;
  traco?: number;
  cor?: string;
  titulo?: string;
}) {
  return (
    <svg
      viewBox={FLOCO_VIEWBOX}
      className={className}
      fill="none"
      stroke={cor}
      strokeWidth={traco}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      <path d={FLOCO_PATH} />
    </svg>
  );
}
