import { User } from "@/components/icons";
import { PortalDashboardChartsLazy } from "@/components/portal/PortalDashboardChartsLazy";
import { PortalRetirementReadiness } from "@/components/portal/PortalRetirementReadiness";
import {
  advisor,
  clientProfile,
  formatPortalCurrency,
  getChartData,
  holdings,
  sanitizePhoneForWhatsApp,
} from "@/lib/mock-portal";

export const metadata = {
  title: "Wealth Dashboard",
  description: "Your portfolio overview, income trends, and dedicated advisor.",
};

export default function PortalDashboardPage() {
  const chartData = getChartData();
  const whatsappHref = `https://wa.me/${sanitizePhoneForWhatsApp(advisor.phone)}`;
  const telHref = `tel:+${sanitizePhoneForWhatsApp(advisor.phone)}`;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="trust-hallmark mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
          FSP 17273 · Private Client
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome back, {clientProfile.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Portfolio snapshot as at June 2026. Illustrative prototype data.
        </p>
      </header>

      <div className="mb-8">
        <PortalRetirementReadiness />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Portfolio summary — spans 2 cols on large screens */}
        <section className="rim-light rounded-[2rem] p-6 lg:col-span-2 lg:p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-white/50">
            Total portfolio value
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-white sm:text-4xl">
            {formatPortalCurrency(clientProfile.totalPortfolioValue)}
          </p>
          <p className="mt-2 text-sm text-cinematic-teal">
            Monthly income · {formatPortalCurrency(clientProfile.monthlyIncome)}
          </p>

          <ul className="mt-8 space-y-3">
            {holdings.map((holding) => (
              <li
                key={holding.id}
                className="flex items-center justify-between gap-4 rounded-2xl bg-shark/80 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{holding.name}</p>
                  {holding.productCode ? (
                    <p className="text-[11px] text-white/40">{holding.productCode}</p>
                  ) : null}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold tabular-nums text-white">
                    {formatPortalCurrency(holding.value)}
                  </p>
                  <p className="text-[11px] text-white/40">{holding.allocationPct}%</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* My Advisor */}
        <section className="rounded-[2rem] bg-shark p-6 lg:p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <User className="h-7 w-7 text-cinematic-teal" aria-hidden />
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/50">My Advisor</p>
          <h2 className="mt-1 text-xl font-bold text-white">{advisor.name}</h2>
          <p className="mt-1 text-sm text-white/60">{advisor.role}</p>
          <p className="mt-4 text-sm tabular-nums text-white/80">{advisor.phone}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={telHref}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-whatsapp px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(37,211,102,0.35)]"
            >
              WhatsApp
            </a>
          </div>
        </section>

        {/* Wealth charts — full width */}
        <section className="rim-light rounded-[2rem] p-6 lg:col-span-3 lg:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-white">Income & drawdown</h2>
              <p className="text-xs text-white/50">Trailing 12 months, gap-filled where data missing</p>
            </div>
            <div className="flex gap-4 text-[11px] text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cinematic-teal" />
                Income
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-samsung-blue" />
                Drawdown
              </span>
            </div>
          </div>
          <PortalDashboardChartsLazy data={chartData} />
        </section>
      </div>
    </main>
  );
}
