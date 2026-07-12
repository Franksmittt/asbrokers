import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { CalculatorsHubView } from "@/components/calculators/CalculatorsHubView";
import { HUB_CALCULATORS } from "@/lib/calculators/hub-catalog";
import { ensureSixFaqs } from "@/lib/seo";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const calculatorsFAQs = [
  {
    question: "Do these calculators constitute financial advice?",
    answer:
      "No. Every tool on this page is an educational illustration only. They do not constitute financial, tax, or investment advice under the FAIS Act, 2002. Personal advice requires a needs analysis with AS Brokers CC (FSP 17273).",
  },
  {
    question: "What does a targeted return profile mean?",
    answer:
      "Figures such as 12.8%, 14.2%, or 14.5% on Everest voluntary products are targeted structural profiles, not guaranteed rates. Liquidity constraints apply (including notice periods and possible early-exit penalties). Read Understanding Everest before you compare product tools.",
  },
  {
    question: "Which calculator should I use for a retirement shortfall?",
    answer:
      "Start with ASSET 002 (Retirement Reality Check) to see whether capital lasts, then ASSET 001 (Retirement Growth) for the illustrative rate you may need. Living annuity drawdowns sit in ASSET 014 (2.5% to 17.5% band).",
  },
  {
    question: "Which tool shows estate duty and executor fees?",
    answer:
      "ASSET 007 illustrates estate duty and executor fee pressure. ASSET 008 models donation-based reduction strategies within SARS annual limits. Both are educational only, not estate planning advice.",
  },
  {
    question: "What is the Average Clause calculator for?",
    answer:
      "ASSET 015 shows how underinsurance can reduce a property claim when the average clause applies. It is not a claim assessment and does not replace a broker review of your sums insured.",
  },
  {
    question: "Are the tools free to use?",
    answer:
      "Yes. The ASSET library is open access. We do not gate the index behind an email wall. Optional lead capture sits after a calculator if you want an adviser to walk through your numbers.",
  },
];

export const metadata = buildPageMetadata({
  path: "/calculators",
  title: "Financial Calculators | ASSET Library FSP 17273",
  description:
    "Run retirement, Everest Wealth, estate, tax, and insurance scenarios yourself. Ungated educational ASSET tools. Not FAIS advice. Then book FSP 17273 to interpret your numbers.",
  keywords: [
    "financial calculators South Africa",
    "retirement calculator",
    "estate duty calculator",
    "Everest Wealth calculator",
    "living annuity drawdown calculator",
    "average clause calculator",
    "ASSET library AS Brokers",
    "FSP 17273",
  ],
  ogImagePath: "/images/calculators-hub-16x9.jpg",
});

export default function CalculatorsPage() {
  const faqItems = ensureSixFaqs(calculatorsFAQs);

  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/calculators-hub-16x9-640.webp"
        imageSrcSet="/images/calculators-hub-16x9-640.webp 640w, /images/calculators-hub-16x9-960.webp 960w"
        imageSizes="(max-width: 1024px) 100vw, 420px"
        fetchPriority="high"
      />
      <PageJsonLd
        path="/calculators"
        webPage={{
          name: buildPageTitle("Financial Calculators & Actuarial Planning Tools"),
          description:
            "Educational planning calculators for retirement, Everest Wealth, estate duty, tax, and insurance.",
        }}
        faqs={faqItems}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
        ]}
        itemList={{
          name: "AS Brokers ASSET calculator library",
          description:
            "Seventeen ungated educational calculators for retirement, Everest Wealth, estate, tax, and insurance.",
          items: HUB_CALCULATORS.map((tool) => ({
            name: `${tool.assetCode} ${tool.title}`,
            path: tool.href,
          })),
        }}
      />
      <CalculatorsHubView faqItems={faqItems} />
    </>
  );
}
