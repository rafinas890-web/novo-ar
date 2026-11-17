/**
 * Dados centrais da Novo Ar Ar Condicionados.
 * Qualquer contato pode ser sobrescrito por variável de ambiente (todas opcionais).
 * Não invente nada aqui: se um dado não existe, deixe vazio e ele some do site.
 */

const env = (valor: string | undefined, padrao: string) =>
  valor && valor.trim() !== "" ? valor.trim() : padrao;

const telefoneDigitos = env(process.env.NEXT_PUBLIC_TELEFONE_DIGITOS, "5511994649776");

const endereco = {
  rua: "Rua Ênio Voss, 17",
  bairro: "Parada Inglesa",
  cidade: "São Paulo",
  uf: "SP",
  cep: "02245-070",
  pais: "BR",
} as const;

const consultaMapa = encodeURIComponent(
  `${endereco.rua} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}, ${endereco.cep}`,
);

export const negocio = {
  nome: "Novo Ar Ar Condicionados",
  nomeCurto: "Novo Ar",
  categoria: "Prestador de serviços de climatização",
  frase: "Ar novo. Casa fresca.",
  endereco,
  enderecoLinha1: `${endereco.rua} – ${endereco.bairro}`,
  enderecoLinha2: `${endereco.cidade} – ${endereco.uf}, CEP ${endereco.cep}`,
  coordenadas: { latitude: -23.4863231, longitude: -46.6080122 },
  telefone: env(process.env.NEXT_PUBLIC_TELEFONE, "(11) 99464-9776"),
  telefoneDigitos,
  horario: env(process.env.NEXT_PUBLIC_HORARIO, "Atendimento 24 horas"),
  links: {
    whatsapp: env(
      process.env.NEXT_PUBLIC_WHATSAPP_URL,
      `https://wa.me/${telefoneDigitos}?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20um%20or%C3%A7amento%20de%20ar-condicionado.`,
    ),
    ligar: env(process.env.NEXT_PUBLIC_TEL_URL, `tel:+${telefoneDigitos}`),
    google: env(
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL,
      "https://www.google.com/maps/place/Novo+ar/@-23.4863231,-46.6080122,17z/data=!3m1!4b1!4m6!3m5!1s0x8b6f98b08905a873:0x51e521640503da9!8m2!3d-23.4863231!4d-46.6080122!16s%2Fg%2F11zcxwpj0t",
    ),
    mapaEmbed: `https://www.google.com/maps?q=${consultaMapa}&output=embed`,
  },
  /** Nota do Google: atualize aqui quando mudar. */
  google: { nota: 5.0, notaTexto: "5,0", total: 48 },
  /** Deixe vazio para não exibir. Ex.: "https://instagram.com/usuario" */
  instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL, ""),
  /** Deixe vazio para não exibir. */
  email: env(process.env.NEXT_PUBLIC_EMAIL, ""),
  siteUrl: env(
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
} as const;

export const fotos = {
  tecnicoEscada: {
    src: "/fotos/tecnico-escada.jpg",
    largura: 1600,
    altura: 2133,
    alt: "Técnico da Novo Ar, de uniforme, na escada higienizando um split protegido pela capa de lavagem.",
  },
  quartoInstalado: {
    src: "/fotos/quarto-instalado.jpg",
    largura: 1600,
    altura: 2133,
    alt: "Quarto com ar-condicionado split instalado na parede acima da cama.",
  },
  tecnicoCondensadora: {
    src: "/fotos/tecnico-condensadora.jpg",
    largura: 1440,
    altura: 1920,
    alt: "Técnico de costas, com a logo da Novo Ar no uniforme, instalando a condensadora.",
  },
  limpezaEvaporadora: {
    src: "/fotos/limpeza-evaporadora.jpg",
    largura: 1600,
    altura: 2844,
    alt: "Evaporadora desmontada e protegida com plástico bolha, pronta para a lavagem.",
  },
  splitEscritorio: {
    src: "/fotos/split-escritorio.jpg",
    largura: 1440,
    altura: 1920,
    alt: "Split instalado na parede de um escritório.",
  },
  splitParedeEscura: {
    src: "/fotos/split-parede-escura.jpg",
    largura: 1600,
    altura: 2133,
    alt: "Split instalado em parede cinza-escura.",
  },
} as const;

export type Foto = (typeof fotos)[keyof typeof fotos];

export type Avaliacao = {
  nome: string;
  /** "há X tempo": atualize aqui. */
  quando: string;
  detalhe?: string;
  texto: string;
  fotos?: Foto[];
};

/** Avaliações reais do Google. Não alterar o conteúdo. */
export const avaliacoes: Avaliacao[] = [
  {
    nome: "Thierry Loiola",
    quando: "há uma semana",
    texto:
      "Excelente profissional! Fez a instalação dos dois ar-condicionados com muito capricho e cuidado. Foi muito atencioso, explicou tudo direitinho e teve paciência para tirar todas as minhas dúvidas. Gostei muito do serviço e do resultado. Recomendo com certeza! Parabéns pelo trabalho!",
  },
  {
    nome: "Rodrigo Dutra",
    quando: "há 3 meses",
    fotos: [fotos.splitParedeEscura],
    texto:
      "Excelente atendimento! A equipe da Novo Ar foi muito profissional, pontual e prestou um serviço de alta qualidade. A instalação do ar-condicionado ficou perfeita, tudo muito bem organizado e com bastante atenção aos detalhes. Além disso, explicaram o funcionamento do equipamento e tiraram todas as minhas dúvidas. Recomendo de olhos fechados!",
  },
  {
    nome: "Clarice Gomes De Oliveira",
    quando: "há 2 meses",
    fotos: [fotos.splitEscritorio],
    texto:
      "Excelente profissional! Serviço realizado com qualidade, pontualidade e muito profissionalismo. Demonstrou conhecimento técnico, explicou todo o serviço e deixou tudo funcionando perfeitamente. Recomendo!",
  },
  {
    nome: "Administrativo Casado's",
    quando: "há 2 meses",
    detalhe: "Manutenção de ar-condicionado",
    texto:
      "Ótimo atendimento e serviço de qualidade! Equipe muito profissional, pontual e cuidadosa. O serviço foi feito direitinho e o ar-condicionado ficou funcionando perfeitamente. Recomendo!",
  },
  {
    nome: "Doutor Máquina",
    quando: "há 3 meses",
    fotos: [fotos.limpezaEvaporadora, fotos.tecnicoCondensadora],
    texto:
      "Excelente profissional o técnico David e sua equipe. Fuja de problemas e contrate estes profissionais qualificados e honestos, com senso de responsabilidade e empatia pelas pessoas que os contratam. Sempre indico e recomendo.",
  },
];

export const secoes = [
  { id: "servicos", rotulo: "Serviços" },
  { id: "trabalhos", rotulo: "Trabalhos" },
  { id: "avaliacoes", rotulo: "Avaliações" },
  { id: "contato", rotulo: "Contato" },
] as const;
