import { RetirementPlanningPageView } from "@/components/retirement-planning/RetirementPlanningPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Pre-Retirement Wealth Engineering & Diagnostics | AS Brokers";
const PAGE_DESCRIPTION =
  "Pre-retirement diagnostics for South Africans still working: Retirement Survival Blueprint, fiduciary calculators, Two-Pot and 2026 RA context, and independent FSP 17273 advice in Krugersdorp.";

const planningFAQs = [
  {
    question: "Who is this retirement planning page for?",
    answer:
      "South African professionals still in the accumulation phase who need a mathematical reality check on capital, timeline, and growth — before they stop working. Content is educational, not personalised advice.",
  },
  {
    question: "What is the Retirement Survival Blueprint?",
    answer:
      "A guided 5-step diagnostic that helps you discover your Financial Freedom Score™ and identify gaps in your retirement trajectory. It is a lead diagnostic, not a substitute for regulated advice from FSP 17273.",
  },
  {
    question: "How does the Two-Pot system affect my retirement planning?",
    answer:
      "New contributions are split between a Savings Pot (limited annual access, taxed at marginal rates) and a Retirement Pot (preserved for annuity purchase). Pre-August 2024 balances sit in a Vested Pot under prior rules. Speak to an authorised adviser before changing contributions or withdrawing.",
  },
  {
    question: "What is the 2026 retirement annuity tax deduction limit?",
    answer:
      "From 1 March 2026 the annual deduction ceiling for qualifying retirement contributions rises to R430,000 (from R350,000), still within the 27.5% of remuneration or taxable income framework. Verify the current SARS position for your tax year with a qualified professional.",
  },
  {
    question: "What does Category 1.8 mean for AS Brokers clients?",
    answer:
      "Category 1.8 authorisation includes advice on certain unlisted instruments beyond a standard unit-trust shelf. AS Brokers CC (FSP 17273) can discuss structured yield strategies where liquidity, term, and tax treatment must be understood clearly — including Everest Wealth voluntary products where appropriate.",
  },
  {
    question: "Do the online calculators constitute financial advice?",
    answer:
      "No. Calculators on asbrokers.co.za are illustrative and educational only and do not constitute financial, tax, or investment advice as defined in the FAIS Act, 2002. Book FSP 17273 for advice tailored to your circumstances.",
  },
];

export const metadata = buildPageMetadata({
  path: "/retirement-planning",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "pre-retirement planning South Africa",
    "retirement planning South Africa",
    "Financial Freedom Score",
    "Retirement Survival Blueprint",
    "Two-Pot retirement system",
    "retirement annuity tax deduction 2026",
    "Category 1.8 FSP",
    "FSP 17273",
    "Krugersdorp financial adviser",
  ],
});

export default function RetirementPlanningPage() {
  return (
    <>
      <PageJsonLd
        path="/retirement-planning"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={planningFAQs}
        service={{
          name: "Pre-retirement wealth engineering & diagnostics",
          description: PAGE_DESCRIPTION,
          serviceType: "Retirement planning",
        }}
      />
      <RetirementPlanningPageView faqs={planningFAQs} />
    </>
  );
}
