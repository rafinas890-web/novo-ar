import type { ReactNode, SVGProps } from "react";

/** Ícones de linha (traço 1.75, cantos arredondados). Nada de emoji como ícone. */
type P = SVGProps<SVGSVGElement>;

function Linha({ children, ...p }: P & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...p}
    >
      {children}
    </svg>
  );
}

export const IconeWhatsApp = (p: P) => (
  <Linha {...p}>
    <path d="M3.6 20.4 4.9 16.6A8.4 8.4 0 1 1 7.6 19.2Z" />
    <path d="M9.1 8.2c-.4.9-.2 2.3.9 3.7 1.2 1.5 2.7 2.4 3.8 2.5.8.1 1.4-.4 1.7-1l-1.6-1.1-.9.7a5 5 0 0 1-2.2-2.2l.7-.9-1.1-1.6c-.6.3-1 .5-1.3.9Z" />
  </Linha>
);

export const IconeTelefone = (p: P) => (
  <Linha {...p}>
    <path d="M5 4h3.3l1.5 4-2 1.3a11 11 0 0 0 6.9 6.9l1.3-2 4 1.5V19a1.6 1.6 0 0 1-1.7 1.6A16 16 0 0 1 3.4 5.7 1.6 1.6 0 0 1 5 4Z" />
  </Linha>
);

export const IconeRota = (p: P) => (
  <Linha {...p}>
    <path d="m3.5 11 17-7.5-7.5 17-2-7.5Z" />
  </Linha>
);

export const IconePin = (p: P) => (
  <Linha {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </Linha>
);

export const IconeRelogio = (p: P) => (
  <Linha {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Linha>
);

export const IconeMenu = (p: P) => (
  <Linha {...p}>
    <path d="M4 8h16M4 16h16" />
  </Linha>
);

export const IconeFechar = (p: P) => (
  <Linha {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Linha>
);

export const IconeSeta = (p: P) => (
  <Linha {...p}>
    <path d="m9 6 6 6-6 6" />
  </Linha>
);

/** Capricho: um brilho de quatro pontas. */
export const IconeCapricho = (p: P) => (
  <Linha {...p}>
    <path d="M12 3.5c.6 4.3 2.2 5.9 6.5 6.5-4.3.6-5.9 2.2-6.5 6.5-.6-4.3-2.2-5.9-6.5-6.5 4.3-.6 5.9-2.2 6.5-6.5Z" />
    <path d="M18.5 16v4M16.5 18h4" />
  </Linha>
);

/** Explica tudo: balão de conversa. */
export const IconeConversa = (p: P) => (
  <Linha {...p}>
    <path d="M4.5 18.5V7a2.5 2.5 0 0 1 2.5-2.5h10A2.5 2.5 0 0 1 19.5 7v6.5A2.5 2.5 0 0 1 17 16H8Z" />
    <path d="M8.5 9h7M8.5 12h4.5" />
  </Linha>
);

/** Estrela preenchida (nota). */
export const Estrela = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.8l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3-4.6-4.4 6.3-.8Z" />
  </svg>
);
