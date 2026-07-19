import { InsuranceHubPageView } from "@/components/insurance/InsuranceHubPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Commercial & Personal Risk Architecture | AS Brokers";
const PAGE_DESCRIPTION =
  "Discover policy flaws before the claim: Average Clause underinsurance, Business Interruption, life premium traps. Independent risk architecture for families and business owners. FSP 17273.";

const insuranceFAQs = [
  {
    question: "What is the Average Clause and how does it reduce a claim?",
    answer:
      "If the sum insured is below the property’s replacement or market value, many policies reduce the claim proportionally: (Amount Insured ÷ Market Value) × Damages = Payout. The Average Clause calculator on this site is an educational illustration only, not a claim assessment.",
  },
  {
    question: "What is the difference between medical aid and gap cover?",
    answer:
      "Medical schemes are governed by the Medical Schemes Act and must provide Prescribed Minimum Benefits. Gap cover is a short-term insurance product under Demarcation Regulations, designed to fund certain in-hospital specialist shortfalls, not to replace a medical scheme. Annual gap benefit caps adjust under those regulations; verify current figures for your policy year.",
  },
  {
    question: "What is the Premium Liability Test?",
    answer:
      "It highlights how escalating life premiums can become unaffordable when introductory guarantees expire, compared with level-premium designs. Use it as education before comparing quotes on starting price alone. Speak with FSP 17273 for a personalised comparison.",
  },
  {
    question: "Are AS Brokers tied to one insurer?",
    answer:
      "No. We are an independent Category 1.8 FSP (17273) and survey the market. Naming institutions such as Santam, Old Mutual, or Bryte indicates placement capability, not exclusivity or tied agency.",
  },
  {
    question: "Why start with a protection domain instead of a product list?",
    answer:
      "High-intent clients usually know what they are protecting, health, income, assets, or the business, before they need a quote form. Domain routing keeps education and advice aligned to that need.",
  },
  {
    question: "Do online insurance calculators constitute advice?",
    answer:
      "No. Calculators and hub content are illustrative and educational only and do not constitute financial or insurance advice under the FAIS Act, 2002. Book a risk audit with FSP 17273 for advice on your circumstances.",
  },
];

export const metadata = buildPageMetadata({
  path: "/insurance",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "independent insurance broker South Africa",
    "Average Clause underinsurance",
    "medical aid vs gap cover",
    "Category 1.8 FSP",
    "business risk insurance",
    "FSP 17273",
  ],
});

export default function InsuranceHubPage() {
  return (
    <>
      <link rel="preload" as="image" href="/images/insurance-hero-16x9-480.webp" media="(max-width: 768px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/images/insurance-hero-16x9-960.webp" media="(min-width: 769px)" fetchPriority="high" />
      <PageJsonLd
        path="/insurance"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={insuranceFAQs}
        service={{
          name: "Independent insurance & risk architecture",
          description: PAGE_DESCRIPTION,
          serviceType:
            "Insurance Broking, Medical Aid Advice, Life Insurance, Business Risk, Short-Term Insurance",
        }}
      />
      <InsuranceHubPageView faqs={insuranceFAQs} />
    </>
  );
}
