import { RetirementSurvivalBlueprint } from "@/components/blueprint/RetirementSurvivalBlueprint";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";
import { buildPageMetadata } from "@/lib/seo-metadata";

const offer = PLANNING_TOOL_OFFERS["retirement-survival"];

const faqs = [
  { question: "Am I going to be okay financially?", answer: offer.freeSummary },
  { question: offer.coreQuestion, answer: offer.problem },
  {
    question: "How much does the Retirement Survival Blueprint cost?",
    answer:
      "The guided diagnostic is free. The full printable blueprint PDF is planned at R299 (~$19 launch band), payment integration coming soon.",
  },
];

const PAGE_TITLE = "Retirement Survival Blueprint™";
const PAGE_DESCRIPTION =
  "An AI-guided diagnostic that helps you answer: Am I going to be okay financially? Discover your Financial Freedom Score™, Gap™, and AS Brokers Freedom Rate™.";

export const metadata = buildPageMetadata({
  path: "/retirement-survival-blueprint",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function RetirementSurvivalBlueprintPage() {
  return (
    <>
      <PageJsonLd path="/retirement-survival-blueprint" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} faqs={faqs} />
      <RetirementSurvivalBlueprint />
    </>
  );
}
