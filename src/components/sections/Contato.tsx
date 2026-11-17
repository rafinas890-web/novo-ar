"use client";

import { negocio } from "@/data/negocio";
import { BotaoComoChegar, BotaoLigar, BotaoWhatsApp } from "../Botoes";
import { IconePin, IconeRelogio, IconeTelefone } from "../Icones";
import { MapaPreguicoso } from "../MapaPreguicoso";
import { Revelar } from "../motion/Revelar";

export function Contato() {
  return (
    <section id="contato" className="bg-white py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div>
          <Revelar>
            <p className="rotulo text-botao">Contato</p>
            <h2 className="titulo-secao mt-5 text-profundo">Fala com a gente.</h2>
          </Revelar>

          <Revelar atraso={0.1}>
            <ul className="mt-10 flex flex-col gap-6 text-lg">
              <li className="flex gap-4">
                <IconePin className="mt-0.5 size-6 shrink-0 text-azul" />
                <address className="leading-relaxed text-grafite not-italic">
                  {negocio.enderecoLinha1}
                  <br />
                  {negocio.enderecoLinha2}
                </address>
              </li>
              <li className="flex gap-4">
                <IconeTelefone className="mt-0.5 size-6 shrink-0 text-azul" />
                <a href={negocio.links.ligar} className="font-semibold text-profundo hover:underline">
                  {negocio.telefone}
                </a>
              </li>
              <li className="flex gap-4">
                <IconeRelogio className="mt-0.5 size-6 shrink-0 text-azul" />
                <span className="text-grafite">{negocio.horario}</span>
              </li>
            </ul>
          </Revelar>

          <Revelar atraso={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BotaoWhatsApp />
            <BotaoLigar>Ligar</BotaoLigar>
            <BotaoComoChegar />
          </Revelar>
        </div>

        <Revelar atraso={0.1}>
          <MapaPreguicoso className="aspect-[4/5] w-full md:aspect-auto md:h-full md:min-h-[32rem]" />
        </Revelar>
      </div>
    </section>
  );
}
