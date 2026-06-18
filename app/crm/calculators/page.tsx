import { CalculatorReviewGrid } from "@/components/crm/CalculatorReviewGrid";

export const metadata = {
  title: "All calculators | Team office",
  description: "Review and test every AS Brokers calculator in one grid.",
  robots: { index: false, follow: false },
};

export default function CrmCalculatorsPage() {
  return <CalculatorReviewGrid />;
}
