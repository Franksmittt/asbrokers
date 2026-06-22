import { RetirementSurvivalBlueprint } from "@/components/blueprint/RetirementSurvivalBlueprint";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";

const offer = PLANNING_TOOL_OFFERS["retirement-survival"];

const faqs = [
  { question: "Am I going to be okay financially?", answer: offer.freeSummary },
  { question: offer.coreQuestion, answer: offer.problem },
  {
    question: "How much does the Retirement Survival Blueprint cost?",
    answer:
      "The guided diagnostic is free. The full printable blueprint PDF is planned at R299 (~$19 launch band) — payment integration coming soon.",
  },
];

export const metadata = {
  title: "Retirement Survival Blueprint™ | AS Brokers",
  description:
    "An AI-guided diagnostic that helps you answer: Am I going to be okay financially? Discover your Financial Freedom Score™, Gap™, and AS Brokers Freedom Rate™.",
};

export default function RetirementSurvivalBlueprintPage() {
  return (
    <>
      <PageJsonLd path="/retirement-survival-blueprint" webPage={{ name: metadata.title, description: metadata.description }} faqs={faqs} />
      <RetirementSurvivalBlueprint />
    </>
  );
}
