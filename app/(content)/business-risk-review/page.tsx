import { BusinessRiskReviewTool } from "@/components/business-risk/BusinessRiskReviewTool";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";
import { buildPageMetadata } from "@/lib/seo-metadata";

const offer = PLANNING_TOOL_OFFERS["business-risk"];

const PAGE_TITLE = "Business Risk Review™";
const PAGE_DESCRIPTION =
  "Free business insurance gap analysis for South African business owners. Identify potential cover gaps and request a professional review.";

const faqs = [
  { question: offer.coreQuestion, answer: offer.problem },
  { question: "Is the Business Risk Review free?", answer: offer.freeSummary },
  {
    question: "What happens after my review?",
    answer: `${offer.ascension.summary} Book via ${offer.ascension.label} on the contact page.`,
  },
];

export const metadata = buildPageMetadata({
  path: "/business-risk-review",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function BusinessRiskReviewPage() {
  return (
    <>
      <PageJsonLd path="/business-risk-review" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} faqs={faqs} />
      <BusinessRiskReviewTool />
    </>
  );
}
