import Link from "next/link";
import { redirect } from "next/navigation";
import { getMockSession } from "@/lib/mock-auth";
import {
  getCrmStats,
  getPipelineByService,
  getStaffPerformance,
  getHighPriorityLeads,
  MOCK_LEADS,
  MOCK_CLIENTS,
} from "@/lib/mock-crm";
import { ExecutiveCharts } from "@/components/crm/ExecutiveCharts";
import { ArrowRight } from "@/components/icons";

export const metadata = {
  title: "Executive dashboard",
  description: "AS Brokers CRM – command center.",
};

export default async function ExecutivePage() {
  const session = await getMockSession();
  if (session?.role !== "admin") redirect("/crm");

  const stats = getCrmStats();
  const byService = getPipelineByService();
  const staffPerf = getStaffPerformance();
  const highPriority = getHighPriorityLeads();
  const conversionRate =
    MOCK_LEADS.length > 0 ? Math.round((MOCK_CLIENTS.length / MOCK_LEADS.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Command center</h1>
        <p className="text-zinc-400 text-sm">Pipeline health, service mix, and team performance (owner only)</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-vault-card border border-white/10 p-4">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total leads</p>
          <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
        </div>
        <div className="rounded-2xl bg-vault-card border border-white/10 p-4">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Clients</p>
          <p className="text-2xl font-bold text-cinematic-teal mt-1">{MOCK_CLIENTS.length}</p>
        </div>
        <div className="rounded-2xl bg-vault-card border border-white/10 p-4">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Conversion</p>
          <p className="text-2xl font-bold text-white mt-1">{conversionRate}%</p>
        </div>
        <div className="rounded-2xl bg-vault-card border border-white/10 p-4">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">In pipeline</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {stats.new + stats.contacted + stats.qualified + stats.proposal}
          </p>
        </div>
      </div>

      <ExecutiveCharts stats={stats} byService={byService} />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Staff performance</h2>
            <Link href="/crm/leads" className="text-sm text-cinematic-teal hover:underline flex items-center gap-1">
              View leads <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-zinc-500 border-b border-white/10">
                  <th className="px-4 sm:px-6 py-3 font-medium">Advisor</th>
                  <th className="px-4 sm:px-6 py-3 font-medium">Leads</th>
                  <th className="px-4 sm:px-6 py-3 font-medium">Clients</th>
                </tr>
              </thead>
              <tbody>
                {staffPerf.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 sm:px-6 py-3 font-medium text-white">{s.name}</td>
                    <td className="px-4 sm:px-6 py-3 text-zinc-400">{s.leads}</td>
                    <td className="px-4 sm:px-6 py-3 text-cinematic-teal">{s.clients}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">High-priority leads</h2>
            <span className="text-xs text-zinc-500">Fit or engagement ≥ 80</span>
          </div>
          <ul className="divide-y divide-white/5">
            {highPriority.map((lead) => (
              <li key={lead.id} className="px-4 sm:px-6 py-3 hover:bg-white/5">
                <Link href={`/crm/leads/${lead.id}`} className="flex items-center justify-between gap-2">
                  <span className="font-medium text-white truncate">{lead.name}</span>
                  <span className="text-xs text-zinc-500 shrink-0">F{lead.fitScore} E{lead.engagementScore}</span>
                </Link>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">{lead.intent}</p>
              </li>
            ))}
            {highPriority.length === 0 && (
              <li className="px-4 sm:px-6 py-6 text-zinc-500 text-sm">No high-priority leads at this threshold.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
