import { BusinessRiskReviewTool } from "@/components/business-risk/BusinessRiskReviewTool";
import { FAQSchema } from "@/components/FAQSchema";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";

const offer = PLANNING_TOOL_OFFERS["business-risk"];

const faqs = [
  { question: offer.coreQuestion, answer: offer.problem },
  { question: "Is the Business Risk Review free?", answer: offer.freeSummary },
  {
    question: "What happens after my review?",
    answer: `${offer.ascension.summary} Book via ${offer.ascension.label} on the contact page.`,
  },
];

export const metadata = {
  title: "Business Risk Review™ | AS Brokers",
  description:
    "Free business insurance gap analysis for South African business owners. Identify potential cover gaps and request a professional review.",
};

export default function BusinessRiskReviewPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <BusinessRiskReviewTool />
    </>
  );
}
