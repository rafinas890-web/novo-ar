import type { MetadataRoute } from "next";
import { negocio } from "@/data/negocio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: negocio.nome,
    short_name: negocio.nomeCurto,
    description: "Instalação, manutenção e higienização de ar-condicionado na Parada Inglesa – SP.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F9FD",
    theme_color: "#06325A",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
