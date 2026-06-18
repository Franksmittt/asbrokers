import { HealthyRetirementBlueprint } from "@/components/healthy-retirement/HealthyRetirementBlueprint";
import { FAQSchema } from "@/components/FAQSchema";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";

const offer = PLANNING_TOOL_OFFERS["healthy-retirement"];

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

export const metadata = {
  title: "Healthy Retirement Blueprint™ | AS Brokers",
  description:
    "Discover your Retirement Health Gap™ with a free 2-minute assessment. Receive your Healthy Retirement Blueprint™ — the Health pillar of AS Brokers.",
};

export default function HealthyRetirementBlueprintPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <HealthyRetirementBlueprint />
    </>
  );
}
