import { HealthyRetirementBlueprint } from "@/components/healthy-retirement/HealthyRetirementBlueprint";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";
import { buildPageMetadata } from "@/lib/seo-metadata";

const offer = PLANNING_TOOL_OFFERS["healthy-retirement"];

const PAGE_TITLE = "Healthy Retirement Blueprint™";
const PAGE_DESCRIPTION =
  "Discover your Retirement Health Gap™ with a free 2-minute assessment. Receive your Healthy Retirement Blueprint™ — the Health pillar of AS Brokers.";

const faqs = [
  { question: offer.coreQuestion, answer: offer.problem },
  { question: "Is the Healthy Retirement assessment free?", answer: offer.freeSummary },
  {
    question: "What is the paid blueprint?",
    answer: offer.paid
      ? `${offer.paid.label} — ${offer.paid.summary} Launch price R299 when available.`
      : "A full guide with action plans — contact AS Brokers for availability.",
  },
];

export const metadata = buildPageMetadata({
  path: "/healthy-retirement-blueprint",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function HealthyRetirementBlueprintPage() {
  return (
    <>
      <PageJsonLd path="/healthy-retirement-blueprint" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} faqs={faqs} />
      <HealthyRetirementBlueprint />
    </>
  );
}
