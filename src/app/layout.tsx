import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { negocio } from "@/data/negocio";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const titulo = "Novo Ar Ar Condicionados | Instalação e manutenção de ar-condicionado na Parada Inglesa – SP";
const descricao =
  "Instalação, manutenção e higienização de ar-condicionado na Parada Inglesa, zona norte de São Paulo. Atendimento 24 horas. Peça seu orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(negocio.siteUrl),
  title: titulo,
  description: descricao,
  applicationName: negocio.nome,
  alternates: { canonical: "/" },
  keywords: [
    "ar-condicionado Parada Inglesa",
    "instalação de ar-condicionado zona norte SP",
    "manutenção de ar-condicionado",
    "higienização de ar-condicionado",
    "limpeza de split",
    "instalação de split",
    "ar-condicionado 24 horas",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: negocio.nome,
    title: titulo,
    description: descricao,
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#06325A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable} antialiased`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-profundo focus:px-5 focus:py-3 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
