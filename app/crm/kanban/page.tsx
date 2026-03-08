import { getMockSession } from "@/lib/mock-auth";
import { getLeadsForAdvisor, getLeadsByService, MOCK_LEADS, type ServiceCategory } from "@/lib/mock-crm";
import { LeadsKanban } from "@/components/crm/LeadsKanban";
import { ServiceFilter } from "@/components/crm/ServiceFilter";

export const metadata = {
  title: "Lead pipeline (Kanban)",
  description: "AS Brokers CRM – drag leads by stage.",
};

export default async function KanbanPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const session = await getMockSession();
  const isOwner = session?.role === "admin";
  const rawLeads = isOwner ? MOCK_LEADS : getLeadsForAdvisor(session?.staffId ?? "s5");
  const { service: serviceParam } = await searchParams;
  const service = serviceParam as ServiceCategory | undefined;
  const leads = getLeadsByService(rawLeads, service);

  return (
    <div className="max-w-full mx-auto space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Pipeline</h1>
          <p className="text-zinc-400 text-sm">
            {isOwner ? "All leads." : "Your assigned leads."} Drag cards to change stage; status is saved in browser until backend is connected.
          </p>
        </div>
        <ServiceFilter />
      </div>
      <LeadsKanban initialLeads={leads} isOwner={isOwner} />
    </div>
  );
}
