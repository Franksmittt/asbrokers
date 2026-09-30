import { FunnelLeadsTable } from "@/components/crm/FunnelLeadsTable";
import { listLeadsBySourceFunnel } from "@/lib/crm/list-leads-by-funnel";

export const metadata = {
  title: "Newsletter subscribers | Team office",
  description: "People who subscribed via the website newsletter form.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewsletterSubscribersCrmPage() {
  const rows = await listLeadsBySourceFunnel("newsletter");
  return (
    <FunnelLeadsTable
      eyebrow="CRM · Newsletter"
      title="Newsletter subscribers"
      description="Emails collected from the website newsletter form. These also appear in Leads and the CRM bell when status is new."
      emptyMessage="No newsletter signups yet. When someone subscribes in the footer, they show up here."
      rows={rows}
      studioHref={{ href: "/studio/newsletter/subscribers", label: "Open in Studio →" }}
    />
  );
}
