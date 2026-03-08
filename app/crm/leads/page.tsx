import Link from "next/link";
import { getMockSession } from "@/lib/mock-auth";
import { getLeadsForAdvisor, getLeadsByService, MOCK_LEADS, SERVICE_LABELS, type LeadStatus, type ServiceCategory } from "@/lib/mock-crm";
import { ServiceFilter } from "@/components/crm/ServiceFilter";

export const metadata = {
  title: "Leads",
  description: "AS Brokers CRM leads pipeline.",
};

const statusLabel: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  closed_won: "Closed Won",
  closed_lost: "Closed Lost",
};

export default async function LeadsPage({
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
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Leads</h1>
          <p className="text-zinc-400 text-sm">
            {isOwner ? "All leads." : "Your assigned leads only."} Filter by service below.
          </p>
        </div>
        <ServiceFilter />
      </div>

      <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-white/10">
                <th className="px-4 sm:px-6 py-3 font-medium">Name</th>
                <th className="px-4 sm:px-6 py-3 font-medium hidden sm:table-cell">Contact</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Service</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Intent</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Status</th>
                <th className="px-4 sm:px-6 py-3 font-medium hidden md:table-cell">Assigned</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Fit / Eng</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 sm:px-6 py-3">
                    <Link href={`/crm/leads/${lead.id}`} className="font-medium text-white hover:text-cinematic-teal">
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-400 hidden sm:table-cell">
                    <span className="block">{lead.email}</span>
                    <span className="text-xs text-zinc-500">{lead.phone}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-lg text-xs bg-white/10 text-zinc-400">
                      {SERVICE_LABELS[lead.serviceCategory]}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-400 max-w-[160px] truncate" title={lead.intent}>
                    {lead.intent}
                  </td>
                  <td className="px-4 sm:px-6 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-lg text-xs font-medium bg-white/10 text-zinc-300">
                      {statusLabel[lead.status]}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-400 hidden md:table-cell">{lead.assignedAdvisorName}</td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-500">
                    <span className="text-cinematic-teal">{lead.fitScore}</span>
                    <span className="text-zinc-600 mx-0.5">/</span>
                    <span>{lead.engagementScore}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
