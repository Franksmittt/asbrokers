import { getWhatsAppInbox } from "@/app/actions/crm";
import { CrmWhatsAppClient } from "@/components/crm/CrmWhatsAppClient";

export const metadata = {
  title: "WhatsApp | CRM",
  description: "WhatsApp conversations with CRM leads.",
};

export default async function CrmWhatsAppPage() {
  const inbox = await getWhatsAppInbox();
  const whatsappConfigured = Boolean(
    process.env.WHATSAPP_PHONE_NUMBER_ID?.trim() && process.env.WHATSAPP_ACCESS_TOKEN?.trim()
  );

  return <CrmWhatsAppClient inbox={inbox} whatsappConfigured={whatsappConfigured} />;
}
