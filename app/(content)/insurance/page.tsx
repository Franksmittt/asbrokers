import { InsuranceHubPageView } from "@/components/insurance/InsuranceHubPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Independent Insurance Brokers | Business & Personal | AS Brokers";
const PAGE_DESCRIPTION =
  "Independent insurance broker for business owners and families: commercial cover, business interruption, key person, personal assets, life, and medical aid — surveyed across the market and backed at claim stage. FSP 17273, Krugersdorp.";

const insuranceFAQs = [
  {
    question: "Can AS Brokers review our existing business or personal cover?",
    answer:
      "Yes. Start with the free Business Risk Review workbook or bring your policy schedules to a needs analysis. We check sums insured, exclusions, overlaps, and premium levels across the market, then place or restructure cover where the analysis supports it.",
  },
  {
    question: "What is the Average Clause and how does it reduce a claim?",
    answer:
      "If the sum insured is below the property’s replacement or market value, many policies reduce the claim proportionally: (Amount Insured ÷ Market Value) × Damages = Payout. A broker review checks whether your buildings, plant, and stock values are keeping up — before a claim tests them.",
  },
  {
    question: "What is the difference between medical aid and gap cover?",
    answer:
      "Medical schemes are governed by the Medical Schemes Act and must provide Prescribed Minimum Benefits. Gap cover is a short-term insurance product under Demarcation Regulations, designed to fund certain in-hospital specialist shortfalls, not to replace a medical scheme. We structure both for owners, families, and staff after a needs analysis.",
  },
  {
    question: "Are AS Brokers tied to one insurer?",
    answer:
      "No. We are an independent Category 1.8 FSP (17273) and survey the market across a contracted panel — see our providers page. Naming institutions such as Santam, Bryte, or King Price indicates placement capability, not exclusivity or tied agency.",
  },
  {
    question: "Do you help when a claim is rejected or short-paid?",
    answer:
      "Yes. Claims advocacy is part of the broker role: we manage the process with the insurer, challenge unreasonable outcomes, and make sure policy wording is applied correctly. That is often where independent broking earns its keep.",
  },
  {
    question: "Do online insurance calculators constitute advice?",
    answer:
      "No. Calculators and hub content are illustrative and educational only and do not constitute financial or insurance advice under the FAIS Act, 2002. Personal recommendations follow a needs analysis with FSP 17273.",
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
    "FAIS Section 1(3)(a)",
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
          name: "Insurance & risk education",
          description: PAGE_DESCRIPTION,
          serviceType:
            "Insurance Broking, Medical Aid, Life Insurance, Business Risk, Short-Term Insurance",
        }}
      />
      <InsuranceHubPageView faqs={insuranceFAQs} />
    </>
  );
}
