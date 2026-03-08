import {
  getPortfolioSummary,
  MOCK_HOLDINGS,
  getProjectedIncomeChartData,
  getAnnuityDrawdownChartData,
  getPortalAdvisor,
} from "@/lib/mock-portal";
import { PortalDashboardCharts } from "@/components/portal/PortalDashboardCharts";
import { PortalMyAdvisor } from "@/components/portal/PortalMyAdvisor";

export const metadata = {
  title: "Wealth Dashboard",
  description: "AS Brokers Client Portal — your wealth at a glance.",
};

const formatZar = (n: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(n);

export default function PortalDashboardPage() {
  const summary = getPortfolioSummary();
  const incomeChartData = getProjectedIncomeChartData();
  const drawdownChartData = getAnnuityDrawdownChartData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Wealth dashboard</h1>
        <p className="text-zinc-400 text-sm">Unified view of your holdings and projections (mock data)</p>
      </div>

      <PortalMyAdvisor advisor={getPortalAdvisor()} />

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-vault-card border border-white/10 p-6">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total portfolio value</p>
          <p className="text-3xl font-bold text-white mt-1">{formatZar(summary.totalValueZar)}</p>
        </div>
        <div className="rounded-2xl bg-vault-card border border-white/10 p-6">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Monthly income (projected)</p>
          <p className="text-3xl font-bold text-cinematic-teal mt-1">{formatZar(summary.monthlyIncomeZar)}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
        <h2 className="px-4 sm:px-6 py-4 border-b border-white/10 text-lg font-bold text-white">Holdings</h2>
        <ul className="divide-y divide-white/5">
          {MOCK_HOLDINGS.map((h) => (
            <li key={h.id} className="px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium text-white">{h.name}</p>
                <p className="text-xs text-zinc-500 capitalize">{h.type.replace("_", " ")}</p>
              </div>
              <div className="text-right">
                {h.valueZar > 0 && <p className="text-white font-semibold">{formatZar(h.valueZar)}</p>}
                {h.monthlyIncomeZar != null && (
                  <p className="text-cinematic-teal text-sm">{formatZar(h.monthlyIncomeZar)}/mo</p>
                )}
                {h.maturityDate && (
                  <p className="text-zinc-500 text-xs">Matures {h.maturityDate}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <PortalDashboardCharts incomeData={incomeChartData} drawdownData={drawdownChartData} />

      <p className="text-zinc-500 text-xs">
        Backend (Supabase, RLS) will replace mock data. Recharts show sample projections.
      </p>
    </div>
  );
}
