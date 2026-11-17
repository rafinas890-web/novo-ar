import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { FLOCO_PATH } from "@/components/brand/Floco";
import { ONDA_BAIXO, ONDA_CIMA } from "@/components/brand/Ondas";

export const alt = "Novo Ar Ar Condicionados — Ar novo. Casa fresca.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Lidas no carregamento do módulo: a imagem é gerada uma vez, no build.
const montserrat = readFileSync(join(process.cwd(), "src/app/_fontes/montserrat-800.ttf"));
const inter = readFileSync(join(process.cwd(), "src/app/_fontes/inter-500.ttf"));

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(160deg, #06325A 0%, #0077C2 45%, #009AF4 72%, #BFE6FF 100%)",
          padding: "72px 80px",
          fontFamily: "Inter",
        }}
      >
        {/* Floco gigante translúcido */}
        <svg width="620" height="620" viewBox="0 0 48 48" style={{ position: "absolute", right: -120, top: -60, opacity: 0.12 }}>
          <path d={FLOCO_PATH} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", width: 360 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 64,
                  color: "#fff",
                  letterSpacing: -1,
                  transform: "skewX(-9deg)",
                }}
              >
                NOVO AR
              </span>
              <svg width="50" height="50" viewBox="0 0 48 48">
                <path d={FLOCO_PATH} fill="none" stroke="#fff" strokeWidth="4.4" strokeLinecap="round" />
              </svg>
            </div>
            <svg width="360" height="40" viewBox="0 46 224 24">
              <path d={ONDA_CIMA} fill="#fff" />
              <path d={ONDA_BAIXO} fill="#fff" />
            </svg>
            <span style={{ alignSelf: "flex-end", fontSize: 14, letterSpacing: 3, color: "#fff", marginTop: 2 }}>
              AR CONDICIONADOS
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 20, letterSpacing: 8, color: "#BFE6FF" }}>ATENDIMENTO 24 HORAS</span>
            <span
              style={{
                fontFamily: "Montserrat",
                fontSize: 104,
                lineHeight: 0.98,
                letterSpacing: -3,
                color: "#fff",
                marginTop: 18,
                maxWidth: 820,
              }}
            >
              Ar novo. Casa fresca.
            </span>
          </div>

          <span style={{ fontSize: 24, color: "rgba(255,255,255,0.85)" }}>
            Parada Inglesa · Zona Norte de São Paulo · (11) 99464-9776
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: montserrat, weight: 800, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
