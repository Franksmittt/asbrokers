import { OfficeCalculatorCanvas } from "@/components/crm/OfficeCalculatorCanvas";

export const metadata = {
  title: "Calculator session | Team office",
  description: "Single calculator for live client meetings.",
  robots: { index: false, follow: false },
};

export default async function CalculatorSessionPage({
  searchParams,
}: {
  searchParams: Promise<{ leadId?: string }>;
}) {
  const params = await searchParams;
  return <OfficeCalculatorCanvas leadId={params.leadId} />;
}
