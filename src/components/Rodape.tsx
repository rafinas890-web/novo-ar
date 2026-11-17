import { negocio, secoes } from "@/data/negocio";
import { Logo } from "./brand/Logo";

export function Rodape() {
  return (
    <footer className="bg-profundo text-white">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-10 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo tom="negativo" className="h-20 w-auto" />
            <p className="mt-5 max-w-xs text-white/70">{negocio.frase}</p>
          </div>

          <address className="flex flex-col gap-2 text-[0.95rem] leading-relaxed text-white/80 not-italic">
            <span className="rotulo mb-2 text-ceu">Contato</span>
            <span>{negocio.enderecoLinha1}</span>
            <span>{negocio.enderecoLinha2}</span>
            <a href={negocio.links.ligar} className="mt-2 font-semibold text-white hover:underline">
              {negocio.telefone}
            </a>
            <span>{negocio.horario}</span>
            {negocio.email && (
              <a href={`mailto:${negocio.email}`} className="hover:underline">
                {negocio.email}
              </a>
            )}
            {negocio.instagram && (
              <a href={negocio.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram
              </a>
            )}
          </address>

          <nav aria-label="Rodapé" className="flex flex-col gap-2 text-[0.95rem]">
            <span className="rotulo mb-2 text-ceu">Navegue</span>
            {secoes.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="w-fit text-white/80 hover:text-white">
                {s.rotulo}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/70 sm:flex-row sm:justify-between">
          <span>© 2026 {negocio.nome}</span>
          <span className="text-white/60">Site por Fin Field</span>
        </div>
      </div>
    </footer>
  );
}
