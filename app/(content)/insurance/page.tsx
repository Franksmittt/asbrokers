import { InsuranceHubPageView } from "@/components/insurance/InsuranceHubPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Insurance & risk education | AS Brokers";
const PAGE_DESCRIPTION =
  "Educational overview of Average Clause underinsurance, Business Interruption, medical aid versus gap cover, and life premium structures from AS Brokers CC (FSP 17273). General information only under FAIS Section 1(3)(a).";

const insuranceFAQs = [
  {
    question: "What is the Average Clause and how does it reduce a claim?",
    answer:
      "If the sum insured is below the property’s replacement or market value, many policies reduce the claim proportionally: (Amount Insured ÷ Market Value) × Damages = Payout. Illustrative tools on this site are educational only and are not a claim assessment or underwriting decision.",
  },
  {
    question: "What is the difference between medical aid and gap cover?",
    answer:
      "Medical schemes are governed by the Medical Schemes Act and must provide Prescribed Minimum Benefits. Gap cover is a short-term insurance product under Demarcation Regulations, designed to fund certain in-hospital specialist shortfalls, not to replace a medical scheme. Annual gap benefit caps adjust under those regulations; verify current figures for your policy year.",
  },
  {
    question: "What is the Premium Liability Test?",
    answer:
      "It highlights how escalating life premiums can become unaffordable when introductory guarantees expire, compared with level-premium designs. Use it as education before comparing quotes on starting price alone. Request a needs analysis with FSP 17273 if you want a personalised comparison.",
  },
  {
    question: "Are AS Brokers tied to one insurer?",
    answer:
      "No. We are an independent Category 1.8 FSP (17273) and survey the market. Naming institutions such as Santam, Old Mutual, or Bryte indicates placement capability, not exclusivity or tied agency.",
  },
  {
    question: "Why start with a protection domain instead of a product list?",
    answer:
      "Many visitors already know what they are protecting—health, income, assets, or the business—before they need a quote form. Domain routing keeps education aligned to that need before any personal recommendation.",
  },
  {
    question: "Do online insurance calculators constitute advice?",
    answer:
      "No. Calculators and hub content are illustrative and educational only and do not constitute financial or insurance advice under the FAIS Act, 2002. Book a consultation with FSP 17273 for advice on your circumstances.",
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
