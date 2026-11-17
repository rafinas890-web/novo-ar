import { ImageResponse } from "next/og";
import { FLOCO_PATH } from "@/components/brand/Floco";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Ícone de app (iOS): fundo Azul Novo Ar com o floco branco. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#009AF4" }}>
        <svg width="124" height="124" viewBox="0 0 48 48">
          <path d={FLOCO_PATH} fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
