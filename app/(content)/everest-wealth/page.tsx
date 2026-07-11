import { EverestWealthPageView } from "@/components/everest-wealth/EverestWealthPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Structured Monthly Income Without Market Volatility | Everest Wealth";
const PAGE_DESCRIPTION =
  "Need predictable income without JSE stress? Everest voluntary preference-share education via independent FSP 17273 Category 1.8 — targeted profiles, R100k min, liquidity and DWT upfront. Not guaranteed.";

const faqs = [
  {
    question: "Are Everest Wealth returns guaranteed?",
    answer:
      "No. Figures such as 12.8%, 14.2%, and 14.5% are targeted return profiles — not guarantees. Capital is illiquid: typically a five-year term, 120-day notice, and up to a 15% early exit penalty may apply, with a R100,000 minimum on voluntary products.",
  },
  {
    question: "Is AS Brokers a tied agent of Everest?",
    answer:
      "No. AS Brokers CC (FSP 17273) is an independent intermediary. Everest Wealth is regulated separately (FSP 795). Everest is one tool we can discuss where suitable — not a default for every client.",
  },
  {
    question: "How is the income typically taxed?",
    answer:
      "Dividends on these voluntary structures are typically subject to 20% Dividends Withholding Tax (DWT), which can differ from interest taxed at marginal rates (up to 45%). Confirm with a qualified professional for your tax year.",
  },
  {
    question: "What if I need my money in an emergency?",
    answer:
      "These are not liquid bank deposits. Approved early exits may require notice and may attract penalties. Only commit capital you can leave for the full term.",
  },
  {
    question: "How is this different from a living annuity?",
    answer:
      "Amethyst living annuities wrap retirement-fund capital under Regulation 28 with legislated drawdowns (2.5%–17.5%). Everest voluntary products are typically after-tax preference-share structures. Different wrappers — do not conflate them.",
  },
  {
    question: "Do the calculators constitute advice?",
    answer:
      "No. They are educational illustrations only under the FAIS Act, 2002. Book FSP 17273 for a needs analysis.",
  },
];

export const metadata = buildPageMetadata({
  path: "/everest-wealth",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Everest Wealth South Africa",
    "structured income without market volatility",
    "Category 1.8 preference shares",
    "12.8% Strategic Income",
    "FSP 17273",
  ],
});

export default function EverestWealthPage() {
  return (
    <>
      <PageJsonLd
        path="/everest-wealth"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={faqs}
        service={{
          name: "Everest Wealth structured income education",
          description: PAGE_DESCRIPTION,
          serviceType: "Investment education",
        }}
      />
      <EverestWealthPageView faqs={faqs} />
    </>
  );
}
