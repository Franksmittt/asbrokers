import { notFound } from "next/navigation";
import { LegacyChecklistDocument } from "@/components/legacy/LegacyChecklistDocument";
import { getLegacyChecklistLeadById } from "@/lib/legacy-checklist/repository";

export const metadata = {
  title: "Your Legacy Readiness Checklist™ | AS Brokers",
  description: "Your personalised Legacy Readiness Checklist™ from AS Brokers.",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

export default async function LegacyChecklistDeliveryPage({ params }: Props) {
  const { id } = await params;
  if (id === "preview") {
    return <LegacyChecklistDocument />;
  }

  const lead = await getLegacyChecklistLeadById(id);
  if (!lead) notFound();

  return (
    <LegacyChecklistDocument
      recipientName={`${lead.firstName} ${lead.surname}`}
      deliveredAt={lead.createdAt.toISOString()}
    />
  );
}
