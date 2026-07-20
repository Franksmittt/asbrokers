import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { CalculatorsHubView } from "@/components/calculators/CalculatorsHubView";
import { HUB_CALCULATORS } from "@/lib/calculators/hub-catalog";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE =
  "The Retirement Gap Toolkit™ | Retirement Planning Calculators for South Africans";
/** Keep ≤160 chars so clampMetaDescription does not cut mid-sentence. */
const PAGE_DESCRIPTION =
  "Explore the Retirement Gap Toolkit™—retirement planning calculators for South Africans to understand, measure and improve your retirement position.";

const calculatorsFAQs = [
  {
    question: "Why are there so many calculators?",
    answer:
      "Because retirement planning involves many different financial decisions. Each calculator answers one specific question. Together they provide a much more complete understanding of your retirement position.",
  },
  {
    question: "Which calculator should I start with?",
    answer:
      "Begin with the Retirement Reality Check. It provides an excellent starting point before exploring the more specialised calculators.",
  },
  {
    question: "Do I need to complete every calculator?",
    answer:
      "No. Each calculator is designed to answer a different question. Use those most relevant to your current stage of retirement planning.",
  },
  {
    question: "What is the Retirement Gap Method™?",
    answer:
      "The Retirement Gap Method™ is the educational framework that explains how all of the calculators work together and helps you understand how to improve your retirement position.",
  },
  {
    question: "Are these calculators financial advice?",
    answer:
      "No. They are educational tools designed to improve understanding. Personal financial advice should always consider your own circumstances. AS Brokers CC (FSP 17273) provides advice only after a needs analysis.",
  },
];

export const metadata = buildPageMetadata({
  path: "/calculators",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Retirement Gap Toolkit",
    "retirement planning calculators South Africa",
    "Retirement Gap Method",
    "retirement calculator",
    "estate duty calculator",
    "Everest Wealth calculator",
    "living annuity drawdown calculator",
    "AS Brokers FSP 17273",
  ],
  ogImagePath: "/images/calculators-hub-og.jpg",
});

export default function CalculatorsPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/calculators-hub-16x9-480.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/calculators-hub-16x9-960.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <PageJsonLd
        path="/calculators"
        webPage={{
          name: buildPageTitle(PAGE_TITLE),
          description: PAGE_DESCRIPTION,
        }}
        faqs={calculatorsFAQs}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "The Retirement Gap Toolkit™", path: "/calculators" },
        ]}
        itemList={{
          name: "The Retirement Gap Toolkit™",
          description:
            "Educational retirement planning calculators organised by the Retirement Gap Method™.",
          items: HUB_CALCULATORS.map((tool) => ({
            name: `${tool.assetCode} ${tool.title}`,
            path: tool.href,
          })),
        }}
      />
      <CalculatorsHubView faqItems={calculatorsFAQs} />
    </>
  );
}
