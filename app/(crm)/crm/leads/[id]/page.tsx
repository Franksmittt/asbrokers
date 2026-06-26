import { getLeadDetails } from "@/app/actions/crm";
import { LeadDetailPageClient } from "@/components/crm/LeadDetailPageClient";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { staffDisplayName } from "@/lib/crm/session";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const details = await getLeadDetails(id);
  return {
    title: details ? `${details.lead.name} · Lead` : "Lead",
  };
}

export default async function CrmLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const details = await getLeadDetails(id);
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  const staffName = user ? staffDisplayName(user) : "Advisor";

  return <LeadDetailPageClient details={details} staffName={staffName} />;
}
