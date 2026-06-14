import Link from "next/link";

import { masterPlanPillars, masterPlanStatement, marketingSystemSteps } from "@/lib/master-plan";

export function MasterPlanGateway({ compact = false }: { compact?: boolean }) {
  return (
    <section id="master-plan" className={compact ? "py-12" : "py-16 md:py-24"}>
      <div className="mb-10 md:mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cinematic-teal">
          Create / Protect / Preserve
        </p>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              The AS Brokers master plan starts with problems, not products.
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
              {masterPlanStatement} Every article, calculator, guide, email, and review should connect to one of four
              client survival questions.
            </p>
            <Link
              href="/master-plan"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-bold text-white transition hover:border-cinematic-teal/50 hover:bg-cinematic-teal/10"
            >
              View the full framework
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {masterPlanPillars.map((pillar) => (
          <Link
            key={pillar.slug}
            href={pillar.href}
            prefetch={false}
            className={`group flex h-full flex-col rounded-[2rem] border ${pillar.accent.border} ${pillar.accent.bg} p-6 transition duration-500 hover:-translate-y-1 hover:bg-white/[0.07] ${pillar.accent.glow}`}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${pillar.accent.text}`}>
                {pillar.pillar}
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Asset
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[-0.03em] text-white">{pillar.asset}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{pillar.coreQuestion}</p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">{pillar.problem}</p>
            <span className={`mt-6 inline-flex text-sm font-semibold ${pillar.accent.text}`}>
              {pillar.ctaLabel}
            </span>
          </Link>
        ))}
      </div>

      {!compact ? (
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Marketing system rule
          </p>
          <div className="grid gap-3 md:grid-cols-6">
            {marketingSystemSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-bold text-cinematic-teal">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
