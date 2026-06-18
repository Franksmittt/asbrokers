import { OfficeCalculatorCanvas } from "@/components/crm/OfficeCalculatorCanvas";

export const metadata = {
  title: "Calculator session | Team office",
  description: "Single calculator for live client meetings.",
  robots: { index: false, follow: false },
};

export default function CalculatorSessionPage() {
  return <OfficeCalculatorCanvas />;
}
