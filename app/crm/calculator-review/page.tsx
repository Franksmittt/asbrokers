import { CalculatorReviewGrid } from "@/components/crm/CalculatorReviewGrid";

export const metadata = {
  title: "Calculator review | Team office",
  description: "Internal calculator review grid for AS Brokers team.",
  robots: { index: false, follow: false },
};

export default function CalculatorReviewPage() {
  return <CalculatorReviewGrid />;
}
