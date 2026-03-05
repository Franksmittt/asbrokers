export function SchemaOrg() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "AS Brokers CC",
    description: "Independent Authorised Financial Services Provider. Retirement planning, insurance, estate structuring, and Code 1.8 alternative investments. Alberton, Gauteng.",
    url: "https://asbrokers.online",
    logo: "https://asbrokers.online/logo.png",
    image: "https://asbrokers.online/og.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alberton",
      addressRegion: "Gauteng",
      addressCountry: "ZA",
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    sameAs: [],
    knowsAbout: [
      "Retirement Planning",
      "Estate Planning",
      "Life Insurance",
      "Short-term Insurance",
      "Everest Wealth",
      "Financial Advisory",
    ],
    regulatoryBody: "FSCA",
    identifier: {
      "@type": "PropertyValue",
      name: "FSP Number",
      value: "17273",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}
