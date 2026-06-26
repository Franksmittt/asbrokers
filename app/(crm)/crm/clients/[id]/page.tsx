import { getClientById } from "@/app/actions/crm";
import { ClientDetailPageClient } from "@/components/crm/ClientDetailPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  return {
    title: client ? `${client.name} · Client` : "Client",
  };
}

export default async function CrmClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);
  return <ClientDetailPageClient client={client} />;
}
