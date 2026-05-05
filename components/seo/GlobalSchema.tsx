import { getSiteOrigin } from "@/lib/site-url";

/**
 * Global Organization + FinancialService JSON-LD for AS Brokers CC.
 * Injected at root layout. XSS-safe: no user input; structured data only.
 * FSCA FSP 17273, Category 1.8, Krugersdorp, founders.
 */

function escapeJsonLd(obj: unknown): string {
  const str = JSON.stringify(obj);
  return str.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

export function GlobalSchema() {
  const origin = getSiteOrigin();
  const logoUrl = `${origin}/opengraph-image.jpg`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "AS Brokers CC",
        legalName: "AS Brokers CC",
        url: origin,
        logo: { "@type": "ImageObject", url: logoUrl },
        image: logoUrl,
        description:
          "Independent Authorised Financial Services Provider. FSP 17273. Category 1.8 (Securities and Instruments: Shares). Retirement planning, insurance, estate structuring, Everest Wealth. Krugersdorp, East Rand, Gauteng.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Krugersdorp",
          addressRegion: "Gauteng",
          addressCountry: "ZA",
        },
        areaServed: { "@type": "Country", name: "South Africa" },
        foundingDate: "1998",
        founders: [
          { "@type": "Person", name: "Albert Schuurman" },
          { "@type": "Person", name: "Johnny Farinha" },
        ],
        identifier: { "@type": "PropertyValue", name: "FSP Number", value: "17273" },
        sameAs: [],
      },
      {
        "@type": "FinancialService",
        "@id": `${origin}/#financialservice`,
        name: "AS Brokers CC",
        description:
          "Independent financial advisor Krugersdorp. FSP 17273. Category 1.8 broker for unlisted shares and Everest Wealth. Retirement, insurance, estate planning.",
        url: origin,
        provider: { "@id": `${origin}/#organization` },
        areaServed: { "@type": "Country", name: "South Africa" },
        regulatoryBody: "FSCA",
        identifier: { "@type": "PropertyValue", name: "FSP Number", value: "17273" },
        knowsAbout: [
          "Retirement Planning",
          "Estate Planning",
          "Life Insurance",
          "Short-term Insurance",
          "Everest Wealth",
          "Alternative Investments",
          "Code 1.8 FSP",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(schema) }}
    />
  );
}
