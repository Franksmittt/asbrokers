import Link from "next/link";
import { getMockSession } from "@/lib/mock-auth";
import { getCrmStats, getLeadsForAdvisor, getAllLeads } from "@/lib/crm-data";
import { ArrowRight } from "@/components/icons";

export const metadata = {
  title: "CRM Dashboard",
  description: "AS Brokers CRM dashboard.",
};

export default async function CrmDashboardPage() {
  const session = await getMockSession();
  const isOwner = session?.role === "admin";
  const advisorId = isOwner ? undefined : session?.staffId ?? undefined;
  const [stats, leads] = await Promise.all([
    getCrmStats(advisorId),
    advisorId ? getLeadsForAdvisor(advisorId) : getAllLeads(),
  ]);
  const recentLeads = leads.slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-zinc-500 tabular-nums mb-2">
          FSP 17273
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-zinc-400 text-sm">Lead pipeline and activity</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "New", value: stats.new, color: "bg-blue-500/20 text-blue-400" },
          { label: "Contacted", value: stats.contacted, color: "bg-amber-500/20 text-amber-400" },
          { label: "Qualified", value: stats.qualified, color: "bg-teal-500/20 text-teal-400" },
          { label: "Proposal", value: stats.proposal, color: "bg-violet-500/20 text-violet-400" },
          { label: "Won", value: stats.closedWon, color: "bg-green-500/20 text-green-400" },
          { label: "Lost", value: stats.closedLost, color: "bg-zinc-500/20 text-zinc-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl rim-light bg-vault-card border border-white/10 p-4">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl rim-light bg-vault-card border border-white/10 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent leads</h2>
          <div className="flex items-center gap-3">
            <Link href="/crm/kanban" className="text-sm text-zinc-400 hover:text-white">Kanban</Link>
            <Link
            href="/crm/leads"
            className="text-sm font-medium text-cinematic-teal hover:text-teal-300 flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-white/10">
                <th className="px-4 sm:px-6 py-3 font-medium">Name</th>
                <th className="px-4 sm:px-6 py-3 font-medium hidden sm:table-cell">Intent</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Status</th>
                <th className="px-4 sm:px-6 py-3 font-medium">Assigned</th>
                <th className="px-4 sm:px-6 py-3 font-medium hidden md:table-cell">Score</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 sm:px-6 py-3">
                    <Link href={`/crm/leads/${lead.id}`} className="font-medium text-white hover:text-cinematic-teal">
                      {lead.name}
                    </Link>
                    <p className="text-zinc-500 text-xs sm:hidden">{lead.intent}</p>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-400 hidden sm:table-cell">{lead.intent}</td>
                  <td className="px-4 sm:px-6 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-lg text-xs font-medium bg-white/10 text-zinc-300 capitalize">
                      {lead.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-400">{lead.assignedAdvisorName}</td>
                  <td className="px-4 sm:px-6 py-3 text-zinc-500 hidden md:table-cell">
                    F{lead.fitScore} E{lead.engagementScore}
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
