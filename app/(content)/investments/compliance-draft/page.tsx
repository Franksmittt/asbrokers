import { InvestmentsComplianceDraftView } from "@/components/investments/InvestmentsComplianceDraftView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Investments compliance draft";
const PAGE_DESCRIPTION =
  "Internal compliance draft of the AS Brokers investments hub. Factual information only. Not for public indexing until approved.";

const draftFaqs = [
  {
    question: "Does this website provide personal investment advice?",
    answer:
      "No. Website content is factual information for general education under Section 1(3)(a) of the FAIS Act. Personal financial advice is provided only by authorised representatives of AS Brokers CC (FSP 17273) after a Financial Needs Analysis and is recorded in a Record of Advice.",
  },
  {
    question: "What does Category 1.8 authorisation mean?",
    answer:
      "Category 1.8 authorisation includes advice on certain securities and instruments. AS Brokers CC (FSP 17273) may advise on instruments within its licensed categories after assessing a client’s circumstances. Licence category does not mean every product is appropriate for every client.",
  },
  {
    question: "Are illustrative or targeted returns guaranteed?",
    answer:
      "No. Illustrative calculator outputs and any targeted return profiles discussed in product documentation are not guarantees unless a specific contractual guarantee is expressly disclosed. Actual outcomes may differ because of investment performance, fees, taxation, inflation, withdrawals, liquidity constraints, and legislative change.",
  },
  {
    question: "What should I know about unlisted securities?",
    answer:
      "Unlisted securities may involve limited transparency, valuation difficulty, and illiquidity. Early exit may be restricted or subject to notice periods and charges. These characteristics must be considered during advice and confirmed against current provider documentation.",
  },
  {
    question: "Why are some product calculators unavailable?",
    answer:
      "Selected product-specific and legislation-dependent calculators are temporarily restricted while assumptions, formulas, disclosures, and supporting information complete compliance review. Educational calculators that remain available display review notices and do not constitute advice.",
  },
  {
    question: "How do I obtain advice from AS Brokers?",
    answer:
      "Contact AS Brokers CC through the contact page or an authorised representative. Advice follows a needs analysis. Do not treat website pages, FAQs, or calculator outputs as a personal recommendation.",
  },
];

export const metadata = buildPageMetadata({
  path: "/investments/compliance-draft",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  noIndex: true,
  keywords: [
    "AS Brokers investments compliance draft",
    "FSP 17273",
    "FAIS factual information",
  ],
});

export default function InvestmentsComplianceDraftPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/investments-hero-16x9-480.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/investments-hero-16x9-960.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <PageJsonLd
        path="/investments/compliance-draft"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={draftFaqs}
      />
      <InvestmentsComplianceDraftView faqs={draftFaqs} />
    </>
  );
}
