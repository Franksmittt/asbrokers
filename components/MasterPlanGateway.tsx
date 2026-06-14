import Link from "next/link";

import { masterPlanPillars, masterPlanStatement } from "@/lib/master-plan";

export function MasterPlanGateway({
  compact = false,
  variant = "dark",
}: {
  compact?: boolean;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";
  const eyebrowClass = isLight ? "text-teal-800" : "text-cinematic-teal";
  const titleClass = isLight ? "text-zinc-950" : "text-white";
  const bodyClass = isLight ? "text-zinc-700" : "text-zinc-400";
  const secondaryButtonClass = isLight
    ? "border-zinc-300 bg-white text-zinc-950 hover:border-teal-700 hover:bg-teal-50"
    : "border-white/15 bg-white/[0.06] text-white hover:border-cinematic-teal/50 hover:bg-cinematic-teal/10";
  const cardClass = isLight
    ? "border-zinc-200 bg-white text-zinc-950 shadow-[0_18px_60px_rgba(15,23,42,0.08)] hover:border-teal-700/30 hover:bg-white"
    : "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.07]";
  const mutedTextClass = isLight ? "text-zinc-600" : "text-zinc-500";
  const stepCardClass = isLight
    ? "border-zinc-200 bg-zinc-50 text-zinc-950"
    : "border-white/10 bg-black/20 text-white";

  return (
    <section id="blueprints" className={compact ? "py-12" : "py-16 md:py-24"}>
      <div className="mb-10 md:mb-12">
        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${eyebrowClass}`}>
          Create / Protect / Preserve
        </p>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <h2 className={`text-3xl font-bold tracking-[-0.04em] md:text-5xl ${titleClass}`}>
              Choose the conversation that matters most right now.
            </h2>
          </div>
          <div className="space-y-4">
            <p className={`text-base leading-relaxed md:text-lg ${bodyClass}`}>
              {masterPlanStatement} Start with the question that best reflects what you want to protect next.
            </p>
            <Link
              href="/solutions"
              prefetch={false}
              className={`inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-bold transition ${secondaryButtonClass}`}
            >
              Explore all solutions
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
            className={`group flex h-full flex-col rounded-[2rem] border p-6 transition duration-500 hover:-translate-y-1 ${cardClass}`}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${isLight ? "text-teal-800" : pillar.accent.text}`}>
                {pillar.pillar}
              </span>
              <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${isLight ? "border-zinc-200 bg-zinc-100 text-zinc-700" : "border-white/10 bg-black/20 text-zinc-400"}`}>
                Guide
              </span>
            </div>
            <h3 className={`text-xl font-bold tracking-[-0.03em] ${titleClass}`}>{pillar.asset}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${bodyClass}`}>{pillar.coreQuestion}</p>
            <p className={`mt-4 text-sm leading-relaxed ${mutedTextClass}`}>{pillar.problem}</p>
            <span className={`mt-6 inline-flex text-sm font-semibold ${isLight ? "text-teal-800" : pillar.accent.text}`}>
              {pillar.ctaLabel}
            </span>
          </Link>
        ))}
      </div>

      {!compact ? (
        <div className={`mt-8 rounded-[2rem] border p-5 md:p-6 ${isLight ? "border-zinc-200 bg-white" : "border-white/10 bg-white/[0.04]"}`}>
          <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${isLight ? "text-zinc-700" : "text-zinc-500"}`}>
            How the review works
          </p>
          <div className="grid gap-3 md:grid-cols-4">
            {["Choose a guide", "Run a relevant calculator", "Prepare your questions", "Book a private review"].map((step, index) => (
              <div key={step} className={`rounded-2xl border p-4 ${stepCardClass}`}>
                <p className={`text-xs font-bold ${isLight ? "text-teal-800" : "text-cinematic-teal"}`}>{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
