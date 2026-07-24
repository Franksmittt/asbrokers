import { EstatePlanningPageView } from "@/components/estate-planning/EstatePlanningPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Estate planning education | AS Brokers";
const PAGE_DESCRIPTION =
  "Educational overview of estate duty, executor fees, and liquidity concepts from AS Brokers CC (FSP 17273). General information only under FAIS Section 1(3)(a). Personal advice follows a needs analysis.";

const estateFAQs = [
  {
    question: "Why does liquidity matter as much as having a will?",
    answer:
      "A will directs who receives what, but the estate must still settle duty, executor fees, and debts in cash. Without liquidity, assets may need to be sold under pressure. Life cover and liquid investments can improve cash availability. This is educational framing only.",
  },
  {
    question: "How does the R3.5 million estate duty abatement work?",
    answer:
      "The first R3.5 million of a net dutiable estate is generally free of estate duty. Amounts above that are typically taxed at 20% up to R30 million and 25% thereafter. Confirm the current statutory position for your planning year with a qualified professional.",
  },
  {
    question: "What about the spousal rollover and a R7 million shield?",
    answer:
      "Section 4(q) mechanisms can allow a surviving spouse to benefit from unused abatement capacity, often discussed as a combined R7 million shield across two estates. Application depends on facts and current law, not a guarantee on this website.",
  },
  {
    question: "Are estate calculators on this site available?",
    answer:
      "Some estate calculators are temporarily restricted pending compliance review. Available educational calculators are listed on /calculators. Illustrations are awareness aids only, not SARS assessments or personalised advice.",
  },
  {
    question: "Can AS Brokers draft my will or trust deed?",
    answer:
      "No. We coordinate the financial and risk side—liquidity, cover, and succession funding. Admitted attorneys draft binding legal instruments. We do not provide legal drafting on this website.",
  },
  {
    question: "Do online estate calculators constitute advice?",
    answer:
      "No. Calculators and hub content are illustrative and educational only under the FAIS Act, 2002. Request a needs analysis with FSP 17273 for advice tailored to your circumstances.",
  },
];

export const metadata = buildPageMetadata({
  path: "/estate-planning",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "estate planning South Africa",
    "estate duty abatement R3.5 million",
    "executor fees South Africa",
    "legacy readiness checklist",
    "FAIS Section 1(3)(a)",
    "FSP 17273",
  ],
});

export default function EstatePlanningPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/estate-planning-hero-16x9-480.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/estate-planning-hero-16x9-960.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <PageJsonLd
        path="/estate-planning"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={estateFAQs}
        service={{
          name: "Estate planning education and advice services",
          description: PAGE_DESCRIPTION,
          serviceType: "Estate planning",
        }}
      />
      <EstatePlanningPageView faqs={estateFAQs} />
    </>
  );
}
