import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { CalculatorsHubView } from "@/components/calculators/CalculatorsHubView";
import { ensureSixFaqs } from "@/lib/seo";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const calculatorsFAQs = [
  {
    question: "Do these calculators constitute financial advice?",
    answer:
      "No. All tools on this page are educational illustrations only and do not constitute financial, tax, or investment advice under the FAIS Act, 2002. Book a consultation with FSP 17273 for a needs analysis.",
  },
  {
    question: "What does a targeted return profile mean?",
    answer:
      "Figures such as 12.8%, 14.2%, or 14.5% on Everest voluntary products are targeted structural profiles, not guaranteed rates. Liquidity constraints (including notice periods and possible early-exit penalties) apply. Read Understanding Everest before comparing products.",
  },
  {
    question: "Which calculator should I use for a retirement shortfall?",
    answer:
      "Start with ASSET 002 (Retirement Reality Check) and ASSET 001 (Retirement Growth). Living annuity drawdowns are modelled in ASSET 014.",
  },
  {
    question: "Which tool shows estate duty and executor fees?",
    answer:
      "ASSET 007 illustrates duty and executor fee pressure. ASSET 008 models donation-based estate reduction strategies within SARS limits, educational only.",
  },
  {
    question: "What is the Average Clause calculator for?",
    answer:
      "ASSET 015 illustrates how underinsurance can reduce a property claim when the average clause applies. It is not a claim assessment.",
  },
  {
    question: "Are the tools free to use?",
    answer:
      "Yes. The library is open access. We do not gate the index behind an email wall. Lead capture, if any, happens only after you choose to engage further.",
  },
];

export const metadata = buildPageMetadata({
  path: "/calculators",
  title: "Financial Calculators | ASSET Library FSP 17273",
  description:
    "Run retirement, Everest Wealth, estate, tax, and insurance scenarios yourself. Ungated educational ASSET tools. Not FAIS advice. Then book FSP 17273 to interpret your numbers.",
});

export default function CalculatorsPage() {
  const faqItems = ensureSixFaqs(calculatorsFAQs);

  return (
    <>
      <PageJsonLd
        path="/calculators"
        webPage={{
          name: buildPageTitle("Financial Calculators & Actuarial Planning Tools"),
          description:
            "Educational planning calculators for retirement, Everest Wealth, estate duty, tax, and insurance.",
        }}
        faqs={faqItems}
      />
      <CalculatorsHubView faqItems={faqItems} />
    </>
  );
}
