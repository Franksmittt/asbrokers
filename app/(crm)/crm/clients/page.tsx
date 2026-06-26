import { getClients } from "@/app/actions/crm";
import { CrmClientsClient } from "@/components/crm/CrmClientsClient";

export const metadata = {
  title: "Clients",
  description: "AS Brokers converted client relationships.",
};

export default async function CrmClientsPage() {
  const clients = await getClients();
  return <CrmClientsClient clients={clients} />;
}
