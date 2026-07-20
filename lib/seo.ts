import { escapeJsonLd } from "@/lib/json-ld";
import { getAlt, getImageSchemaDimensions } from "@/lib/image-alt";
import { getSiteOrigin } from "@/lib/site-url";

export type FAQItem = { question: string; answer: string };
export type BreadcrumbItem = { name: string; path: string };

/**
 * Optional shared FAQs for pages that intentionally include them in authored lists.
 * Do not auto-pad UI or JSON-LD with these, GEO requires visible FAQ ≡ schema.
 */
export const SHARED_SITE_FAQS: FAQItem[] = [
  {
    question: "Is this personalised financial advice?",
    answer:
      "No. Content and tools on asbrokers.co.za are educational only. Book FSP 17273 for advice tailored to your circumstances.",
  },
  {
    question: "How do I book a consultation?",
    answer:
      "Visit our contact page, WhatsApp +27 66 227 6044, or email albert@asbrokers.co.za. An independent adviser in Krugersdorp will respond personally.",
  },
  {
    question: "Who is AS Brokers?",
    answer:
      "AS Brokers CC is an independent Category 1.8 financial services provider (FSP 17273) based in Krugersdorp, serving the West Rand.",
  },
  {
    question: "Are calculator or illustration results guaranteed?",
    answer:
      "No. Outputs depend on your inputs and assumptions. Markets, tax, fees, and product terms can change actual outcomes.",
  },
  {
    question: "Do you charge for an initial conversation?",
    answer:
      "We explain our advice process and any fees during consultation. There is no obligation to proceed after an initial discussion.",
  },
  {
    question: "Can I bring my own numbers or existing adviser?",
    answer:
      "Yes. Many clients bring calculator results or existing policies to a review. You can also book directly with our team.",
  },
];

/**
/**
 * Visible FAQ list, page-authored items only (no shared padding).
 * Must match JSON-LD (`faqsForJsonLd`) so UI and schema stay honest for GEO.
 * @deprecated Prefer `faqsForJsonLd`, kept for call-site compatibility.
 */
export function ensureSixFaqs(specific: FAQItem[] = []): FAQItem[] {
  return faqsForJsonLd(specific);
}

/** Authentic FAQ list for JSON-LD / visible FAQ: page items only, no padding. */
export function faqsForJsonLd(specific: FAQItem[] = []): FAQItem[] {
  return specific.filter((item) => item.question.trim().length > 0 && item.answer.trim().length > 0);
}

export type PageGraphInput = {
  path: string;
  webPage: {
    name: string;
    description: string;
    /** ISO date, only when page content truly changed. */
    dateModified?: string;
    datePublished?: string;
  };
  faqs?: FAQItem[];
  service?: {
    name: string;
    description: string;
    serviceType?: string;
  };
  product?: {
    name: string;
    description: string;
    brandName?: string;
  };
  article?: {
    headline: string;
    description?: string;
    datePublished: string;
    dateModified?: string;
  };
  breadcrumbs?: BreadcrumbItem[];
  primaryImagePath?: string;
  /** Collection / hub ItemList (e.g. calculator library). */
  itemList?: {
    name: string;
    description?: string;
    items: Array<{ name: string; path: string }>;
  };
};

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
};

/** Stable @id hash fragments, Phase 4.2 IdFactory. */
export function createSeoIds(origin: string, path: string) {
  const normalized = normalizePath(path);
  const pageUrl = `${origin}${normalized === "/" ? "" : normalized}`;
  return {
    organization: `${origin}/#organization`,
    website: `${origin}/#website`,
    financialService: `${origin}/#financialservice`,
    localBusiness: `${origin}/#localbusiness`,
    personAlbert: `${origin}/#person-albert-schuurman`,
    personJohnny: `${origin}/#person-johnny-farinha`,
    webPage: `${pageUrl}/#webpage`,
    faqPage: `${pageUrl}/#faq`,
    article: `${pageUrl}/#article`,
    service: `${pageUrl}/#service`,
    product: `${pageUrl}/#product`,
    breadcrumb: `${pageUrl}/#breadcrumb`,
    primaryImage: `${pageUrl}/#primaryimage`,
    itemList: `${pageUrl}/#itemlist`,
  } as const;
}

export function normalizePath(path: string): string {
  const withoutQuery = path.split("?")[0] ?? path;
  if (!withoutQuery || withoutQuery === "/") return "/";
  const withSlash = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  return withSlash.replace(/\/$/, "") || "/";
}

function logoUrl(origin: string): string {
  return `${origin}/opengraph-image`;
}

function contactAreaServed(): Record<string, unknown>[] {
  return [
    { "@type": "AdministrativeArea", name: "West Rand" },
    { "@type": "City", name: "Krugersdorp" },
    { "@type": "Country", name: "South Africa" },
  ];
}

/** Public contact channels already shown on marketing contact/about surfaces. */
function buildContactPoints(): Record<string, unknown>[] {
  return [
    {
      "@type": "ContactPoint",
      telephone: "+27116601445",
      email: "albert@asbrokers.co.za",
      contactType: "customer service",
      areaServed: contactAreaServed(),
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+27662276044",
      contactType: "WhatsApp",
      areaServed: contactAreaServed(),
      availableLanguage: ["English"],
    },
  ];
}

function buildOrganizationNode(origin: string, ids: ReturnType<typeof createSeoIds>): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: "AS Brokers CC",
    legalName: "AS Brokers CC",
    url: origin,
    logo: { "@type": "ImageObject", "@id": `${origin}/#logo`, url: logoUrl(origin) },
    image: { "@id": `${origin}/#logo` },
    description:
      "Independent Authorised Financial Services Provider. FSP 17273. Category 1.8 (Securities and Instruments: Shares). Retirement planning, insurance, estate structuring, and Everest Wealth education. Krugersdorp, West Rand, Gauteng.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 2, The Bridge, 47 Commissioner Street",
      addressLocality: "Krugersdorp",
      addressRegion: "Gauteng",
      postalCode: "1739",
      addressCountry: "ZA",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "West Rand" },
      { "@type": "City", name: "Krugersdorp" },
      { "@type": "Country", name: "South Africa" },
    ],
    foundingDate: "1998",
    founder: [{ "@id": ids.personAlbert }, { "@id": ids.personJohnny }],
    identifier: { "@type": "PropertyValue", name: "FSP Number", value: "17273" },
    sameAs: [] as string[],
    email: "albert@asbrokers.co.za",
    telephone: "+27116601445",
    contactPoint: buildContactPoints(),
    knowsAbout: [
      "Retirement Planning",
      "Investments",
      "Insurance",
      "Estate Planning",
      "Everest Wealth",
      "Medical Aid and Gap Cover",
      "Discovery Health Medical Scheme",
    ],
    isAccessibleForFree: true,
  };
}

function buildPersonNodes(ids: ReturnType<typeof createSeoIds>): Record<string, unknown>[] {
  return [
    {
      "@type": "Person",
      "@id": ids.personAlbert,
      name: "Albert Schuurman",
      worksFor: { "@id": ids.organization },
    },
    {
      "@type": "Person",
      "@id": ids.personJohnny,
      name: "Johnny Farinha",
      worksFor: { "@id": ids.organization },
    },
  ];
}

function buildWebSiteNode(origin: string, ids: ReturnType<typeof createSeoIds>): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: origin,
    name: "AS Brokers CC",
    description:
      "Independent financial advisor Krugersdorp. Retirement planning, Everest Wealth, insurance, estate planning. FSP 17273.",
    publisher: { "@id": ids.organization },
    inLanguage: "en-ZA",
  };
}

function buildFinancialServiceNode(origin: string, ids: ReturnType<typeof createSeoIds>): Record<string, unknown> {
  return {
    "@type": "FinancialService",
    "@id": ids.financialService,
    name: "AS Brokers CC",
    description:
      "Independent financial advisor Krugersdorp. FSP 17273. Category 1.8 broker for unlisted shares and Everest Wealth. Retirement, insurance, estate planning.",
    url: origin,
    provider: { "@id": ids.organization },
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
      "Medical Aid and Gap Cover",
      "Discovery Health Medical Scheme",
      "Business Continuity Planning",
    ],
  };
}

function buildLocalBusinessNode(origin: string, ids: ReturnType<typeof createSeoIds>): Record<string, unknown> {
  return {
    "@type": "LocalBusiness",
    "@id": ids.localBusiness,
    name: "AS Brokers CC",
    url: origin,
    image: { "@id": `${origin}/#logo` },
    telephone: "+27116601445",
    email: "albert@asbrokers.co.za",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 2, The Bridge, 47 Commissioner Street",
      addressLocality: "Krugersdorp",
      addressRegion: "Gauteng",
      postalCode: "1739",
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -26.085,
      longitude: 27.775,
    },
    contactPoint: buildContactPoints(),
    knowsAbout: [
      "Retirement Planning",
      "Investments",
      "Insurance",
      "Estate Planning",
      "Everest Wealth",
    ],
    parentOrganization: { "@id": ids.organization },
    areaServed: { "@type": "Country", name: "South Africa" },
    isAccessibleForFree: true,
  };
}

function buildImageObjectNode(
  ids: ReturnType<typeof createSeoIds>,
  origin: string,
  imagePath: string,
  contextAlt?: string
): Record<string, unknown> {
  const url = imagePath.startsWith("http") ? imagePath : `${origin}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
  const { width, height } = getImageSchemaDimensions(imagePath);
  return {
    "@type": "ImageObject",
    "@id": ids.primaryImage,
    url,
    contentUrl: url,
    width,
    height,
    caption: getAlt(imagePath, contextAlt),
    representativeOfPage: true,
  };
}

export function buildPageGraph(input: PageGraphInput): JsonLdGraph {
  const origin = getSiteOrigin();
  const ids = createSeoIds(origin, input.path);
  const normalized = normalizePath(input.path);
  const pageUrl = `${origin}${normalized === "/" ? "" : normalized}`;

  const graph: Record<string, unknown>[] = [
    buildOrganizationNode(origin, ids),
    ...buildPersonNodes(ids),
    buildWebSiteNode(origin, ids),
    buildFinancialServiceNode(origin, ids),
    buildLocalBusinessNode(origin, ids),
  ];

  if (input.primaryImagePath) {
    graph.push(buildImageObjectNode(ids, origin, input.primaryImagePath, input.webPage.name));
  }

  const webPageNode: Record<string, unknown> = {
    "@type": input.itemList?.items.length ? ["WebPage", "CollectionPage"] : "WebPage",
    "@id": ids.webPage,
    url: pageUrl,
    name: input.webPage.name,
    description: input.webPage.description,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.financialService },
    publisher: { "@id": ids.organization },
    isAccessibleForFree: true,
  };

  if (input.webPage.datePublished) {
    webPageNode.datePublished = input.webPage.datePublished;
  }
  if (input.webPage.dateModified) {
    webPageNode.dateModified = input.webPage.dateModified;
  }

  if (input.primaryImagePath) {
    webPageNode.primaryImageOfPage = { "@id": ids.primaryImage };
  }

  if (input.breadcrumbs?.length) {
    graph.push(buildBreadcrumbListNode(ids, origin, input.breadcrumbs));
    webPageNode.breadcrumb = { "@id": ids.breadcrumb };
  }

  if (input.faqs?.length) {
    const faqs = faqsForJsonLd(input.faqs);
    if (faqs.length) {
      graph.push(buildFAQPageNode(ids, faqs));
      webPageNode.mainEntity = { "@id": ids.faqPage };
    }
  }

  if (input.service) {
    graph.push(buildServiceNode(ids, input.service));
    webPageNode.about = { "@id": ids.service };
    if (!input.faqs?.length) {
      webPageNode.mainEntity = { "@id": ids.service };
    }
  }

  if (input.product) {
    graph.push(buildProductNode(ids, input.product));
    if (!input.faqs?.length) {
      webPageNode.mainEntity = { "@id": ids.product };
    }
  }

  if (input.article) {
    graph.push(buildArticleNode(ids, origin, input.article, input.primaryImagePath));
    if (!input.faqs?.length) {
      webPageNode.mainEntity = { "@id": ids.article };
    }
  }

  if (input.itemList?.items.length) {
    graph.push(buildItemListNode(ids, origin, input.itemList));
    if (!input.faqs?.length) {
      webPageNode.mainEntity = { "@id": ids.itemList };
    } else {
      webPageNode.hasPart = { "@id": ids.itemList };
    }
  }

  graph.push(webPageNode);

  return { "@context": "https://schema.org", "@graph": graph };
}

function buildFAQPageNode(ids: ReturnType<typeof createSeoIds>, faqs: FAQItem[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    "@id": ids.faqPage,
    isPartOf: { "@id": ids.webPage },
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildServiceNode(
  ids: ReturnType<typeof createSeoIds>,
  service: NonNullable<PageGraphInput["service"]>
): Record<string, unknown> {
  return {
    "@type": "Service",
    "@id": ids.service,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType ?? "Financial Planning",
    provider: { "@id": ids.financialService },
    areaServed: { "@type": "Country", name: "South Africa" },
  };
}

function buildProductNode(
  ids: ReturnType<typeof createSeoIds>,
  product: NonNullable<PageGraphInput["product"]>
): Record<string, unknown> {
  return {
    "@type": "Product",
    "@id": ids.product,
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brandName ?? "Everest Wealth" },
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      description: product.description,
    },
    provider: { "@id": ids.financialService },
  };
}

function buildArticleNode(
  ids: ReturnType<typeof createSeoIds>,
  origin: string,
  article: NonNullable<PageGraphInput["article"]>,
  primaryImagePath?: string
): Record<string, unknown> {
  return {
    "@type": "Article",
    "@id": ids.article,
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: { "@id": ids.organization },
    publisher: { "@id": ids.organization },
    isPartOf: { "@id": ids.webPage },
    mainEntityOfPage: { "@id": ids.webPage },
    image: primaryImagePath ? { "@id": ids.primaryImage } : { "@id": `${origin}/#logo` },
    isAccessibleForFree: true,
  };
}

function buildBreadcrumbListNode(
  ids: ReturnType<typeof createSeoIds>,
  origin: string,
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${normalizePath(item.path)}`,
    })),
  };
}

function buildItemListNode(
  ids: ReturnType<typeof createSeoIds>,
  origin: string,
  list: NonNullable<PageGraphInput["itemList"]>
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    "@id": ids.itemList,
    name: list.name,
    description: list.description,
    numberOfItems: list.items.length,
    itemListElement: list.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${origin}${normalizePath(item.path)}`,
    })),
  };
}

/** Phase 4.3, every @id reference must resolve to a node in the same @graph. */
export function validateGraphOrphans(graph: JsonLdGraph): string[] {
  const defined = new Set<string>();
  const referenced = new Set<string>();

  function scan(value: unknown): void {
    if (value == null || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach(scan);
      return;
    }
    const record = value as Record<string, unknown>;
    const id = record["@id"];
    const hasType = typeof record["@type"] === "string";

    if (typeof id === "string") {
      if (hasType) defined.add(id);
      else referenced.add(id);
    }

    for (const [key, child] of Object.entries(record)) {
      if (key === "@id" || key === "@type") continue;
      scan(child);
    }
  }

  for (const node of graph["@graph"]) {
    scan(node);
  }

  return [...referenced].filter((ref) => !defined.has(ref));
}

export function serializeJsonLdGraph(graph: JsonLdGraph): string {
  const orphans = validateGraphOrphans(graph);
  if (orphans.length > 0 && process.env.NODE_ENV !== "production") {
    console.warn("[seo] JSON-LD orphan @id references:", orphans.join(", "));
  }
  return escapeJsonLd(graph);
}

/** Fallback webPage copy for routes without explicit PageJsonLd props. */
export function fallbackWebPageFromPath(pathname: string): PageGraphInput["webPage"] {
  const slug = pathname.replace(/^\//, "").replace(/-/g, " ");
  const name = slug ? slug.replace(/\b\w/g, (c) => c.toUpperCase()) : "Home";
  return {
    name: `${name} | AS Brokers CC`,
    description:
      "Educational financial planning content from AS Brokers CC, FSP 17273, Krugersdorp, Gauteng.",
  };
}

export const SCHEMA_EXPLICIT_PATH_PREFIXES = [
  "/",
  "/about",
  "/insights",
  "/solutions",
  "/estate-planning",
  "/complaints",
  "/conflict-of-interest",
  "/contact",
  "/calculators",
  "/how-we-work",
  "/insurance",
  "/investments",
  "/retirement-planning",
  "/retirement-gap-method",
  "/financial-freedom-community",
  "/everest-wealth",
  "/everest-wealth/about",
  "/solutions/medical-aid",
  "/solutions/discovery-health",
  "/regulatory-compliance",
  "/privacy",
  "/terms",
  "/manage-cookies",
  "/retirement",
  "/insights/",
] as const;

export function pathHasExplicitSchema(pathname: string): boolean {
  return SCHEMA_EXPLICIT_PATH_PREFIXES.some((prefix) =>
    prefix.endsWith("/") ? pathname.startsWith(prefix) : pathname === prefix
  );
}
