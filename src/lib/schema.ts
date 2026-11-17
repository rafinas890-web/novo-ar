import { avaliacoes, negocio } from "@/data/negocio";

/** Dados estruturados schema.org/HVACBusiness (LocalBusiness). */
export function schemaNegocio() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${negocio.siteUrl}/#negocio`,
    name: negocio.nome,
    slogan: negocio.frase,
    description:
      "Instalação, manutenção e higienização de ar-condicionado na Parada Inglesa, zona norte de São Paulo. Atendimento 24 horas.",
    url: negocio.siteUrl,
    image: `${negocio.siteUrl}/opengraph-image`,
    logo: `${negocio.siteUrl}/icon.svg`,
    telephone: `+${negocio.telefoneDigitos}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: negocio.endereco.rua,
      addressLocality: negocio.endereco.cidade,
      addressRegion: negocio.endereco.uf,
      postalCode: negocio.endereco.cep,
      addressCountry: negocio.endereco.pais,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: negocio.coordenadas.latitude,
      longitude: negocio.coordenadas.longitude,
    },
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: ["Parada Inglesa", "Zona Norte de São Paulo", "São Paulo"],
    hasMap: negocio.links.google,
    makesOffer: [
      "Instalação de ar-condicionado",
      "Manutenção preventiva e corretiva de ar-condicionado",
      "Higienização de ar-condicionado",
    ].map((nome) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: nome } })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: negocio.google.nota.toFixed(1),
      reviewCount: negocio.google.total,
      bestRating: 5,
      worstRating: 1,
    },
    review: avaliacoes.map((a) => ({
      "@type": "Review",
      author: { "@type": "Person", name: a.nome },
      reviewBody: a.texto,
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    })),
    ...(negocio.instagram ? { sameAs: [negocio.instagram] } : {}),
    ...(negocio.email ? { email: negocio.email } : {}),
  };
}
