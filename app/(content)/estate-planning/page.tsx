import { EstatePlanningPageView } from "@/components/estate-planning/EstatePlanningPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Estate Liquidity Engineering & Succession | AS Brokers";
const PAGE_DESCRIPTION =
  "A will is only half the job. Engineer cash for estate duty and executor fees so heirs are not forced into a fire sale. Legacy checklist + duty calculators. FSP 17273 — attorneys draft legal instruments.";

const estateFAQs = [
  {
    question: "Why does liquidity matter as much as having a will?",
    answer:
      "A will directs who receives what, but the estate must still settle duty, executor fees, and debts in cash. Without liquidity, assets may need to be sold under pressure. Life cover and liquid investments can improve cash availability — educational framing only.",
  },
  {
    question: "How does the R3.5 million estate duty abatement work?",
    answer:
      "The first R3.5 million of a net dutiable estate is generally free of estate duty. Amounts above that are typically taxed at 20% up to R30 million and 25% thereafter. Confirm the current statutory position for your planning year with a qualified professional.",
  },
  {
    question: "What about the spousal rollover and a R7 million shield?",
    answer:
      "Section 4(q) mechanisms can allow a surviving spouse to benefit from unused abatement capacity, often discussed as a combined R7 million shield across two estates. Application depends on facts and current law — not a guarantee on this website.",
  },
  {
    question: "What does the Estate Duty Calculator show?",
    answer:
      "ASSET 007 illustrates duty, executor fees, and liquidity stress from inputs you provide. It is an awareness aid, not a SARS assessment or personalised advice.",
  },
  {
    question: "Can AS Brokers draft my will or trust deed?",
    answer:
      "No. We coordinate the financial and risk side — liquidity, cover, and succession funding. Admitted attorneys draft binding legal instruments. We do not provide legal drafting on this website.",
  },
  {
    question: "Do online estate calculators constitute advice?",
    answer:
      "No. Calculators and hub content are illustrative and educational only under the FAIS Act, 2002. Book a strategy call with FSP 17273 for advice tailored to your circumstances.",
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
    "Section 7C trusts",
    "FSP 17273",
  ],
});

export default function EstatePlanningHubPage() {
  return (
    <>
      <PageJsonLd
        path="/estate-planning"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={estateFAQs}
        service={{
          name: "Estate liquidity & legacy engineering",
          description: PAGE_DESCRIPTION,
          serviceType: "Estate Planning, Wills Coordination, Estate Duty Awareness, Succession Planning",
        }}
      />
      <EstatePlanningPageView faqs={estateFAQs} />
    </>
  );
}
