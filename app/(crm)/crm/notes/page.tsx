import { getGlobalNotes } from "@/app/actions/crm";
import { CrmNotesClient } from "@/components/crm/CrmNotesClient";

export const metadata = {
  title: "Notes",
  description: "AS Brokers CRM team notes and daily workflow capture.",
};

export default async function CrmNotesPage() {
  const notes = await getGlobalNotes();
  return <CrmNotesClient initialNotes={notes} />;
}
