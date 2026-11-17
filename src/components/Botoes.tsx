import type { ReactNode } from "react";
import { negocio } from "@/data/negocio";
import { IconeRota, IconeTelefone, IconeWhatsApp } from "./Icones";

type Variante = "azul" | "branco" | "contorno-claro" | "contorno";

const estilos: Record<Variante, string> = {
  azul: "bg-botao text-white hover:bg-[#00649f]",
  branco: "bg-white text-profundo hover:bg-ceu",
  "contorno-claro": "border border-white/60 text-white hover:bg-white/10",
  contorno: "border border-profundo/20 text-profundo hover:bg-profundo/5",
};

const tamanhos = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
} as const;

export function Botao({
  href,
  variante,
  tamanho = "lg",
  icone,
  children,
  externo,
  className = "",
}: {
  href: string;
  variante: Variante;
  tamanho?: keyof typeof tamanhos;
  icone?: ReactNode;
  children: ReactNode;
  externo?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`aperto inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap ${estilos[variante]} ${tamanhos[tamanho]} ${className}`}
    >
      {icone}
      {children}
    </a>
  );
}

export function BotaoWhatsApp({
  variante = "azul",
  tamanho,
  className,
  children = "Pedir orçamento no WhatsApp",
}: {
  variante?: Variante;
  tamanho?: keyof typeof tamanhos;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Botao
      href={negocio.links.whatsapp}
      variante={variante}
      tamanho={tamanho}
      externo
      className={className}
      icone={<IconeWhatsApp className="size-5 shrink-0" />}
    >
      {children}
    </Botao>
  );
}

export function BotaoLigar({
  variante = "contorno",
  tamanho,
  className,
  children = "Ligar agora",
}: {
  variante?: Variante;
  tamanho?: keyof typeof tamanhos;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Botao
      href={negocio.links.ligar}
      variante={variante}
      tamanho={tamanho}
      className={className}
      icone={<IconeTelefone className="size-5 shrink-0" />}
    >
      {children}
    </Botao>
  );
}

export function BotaoComoChegar({
  variante = "contorno",
  tamanho,
  className,
}: {
  variante?: Variante;
  tamanho?: keyof typeof tamanhos;
  className?: string;
}) {
  return (
    <Botao
      href={negocio.links.google}
      variante={variante}
      tamanho={tamanho}
      externo
      className={className}
      icone={<IconeRota className="size-5 shrink-0" />}
    >
      Como chegar
    </Botao>
  );
}
