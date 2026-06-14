import Link from "next/link";

import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Footer } from "@/components/Footer";
import { MasterPlanGateway } from "@/components/MasterPlanGateway";
import { PAGE_CONTENT_MAX } from "@/components/PageMediaStrip";
import { masterPlanPillars, masterPlanStatement, marketingSystemSteps } from "@/lib/master-plan";

export const metadata = {
  title: "AS Brokers Master Plan | Health, Wealth, Legacy & Business Survival",
  description:
    "The AS Brokers master plan: problem-led advice across Health, Wealth, Legacy, and Business Survival.",
};

const strategicPrinciples = [
  "People do not buy products. They buy solutions to urgent life problems.",
  "Every public asset should connect to Health, Wealth, Legacy, or Business Survival.",
  "Every funnel should move from education to assessment, guide, email sequence, appointment, and advice.",
];

export default function MasterPlanPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-void">
      <section className="relative border-b border-white/[0.07] pb-16 pt-28 md:pb-24 md:pt-36">
        <BackgroundOrbs />
        <div className={`${PAGE_CONTENT_MAX} relative z-10`}>
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cinematic-teal">
              AS Brokers / Create / Protect / Preserve
            </p>
            <h1 className="text-5xl font-bold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              A website built around the problems clients wake up worrying about.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              {masterPlanStatement} We do not lead with products. We lead with the survival questions behind them.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#pillars"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:shadow-cta-glow-gold"
              >
                Explore the four assets
              </Link>
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:border-cinematic-teal/50 hover:bg-cinematic-teal/10"
              >
                Book a private review
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {strategicPrinciples.map((principle, index) => (
              <div key={principle} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-bold text-cinematic-teal">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className={PAGE_CONTENT_MAX}>
        <div id="pillars" className="scroll-mt-28">
          <MasterPlanGateway />
        </div>

        <section className="border-t border-white/5 py-16 md:py-24">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cinematic-teal">
              Funnel architecture
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              The simple system every content piece should support.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              The website becomes a conversion path, not a library of disconnected pages. Articles and videos create
              awareness, calculators expose the problem, lead magnets capture intent, and email sequences invite the right
              people into advice conversations.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-6">
            {marketingSystemSteps.map((step, index) => (
              <div key={step} className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-bold text-cinematic-teal">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 py-16 md:py-24">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cinematic-teal">
                What to build first
              </p>
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
                Phase one turns the vision into a working acquisition engine.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Resend email system and automated welcome sequences",
                "Lead capture forms for the three immediate guide downloads",
                "Landing pages for retirement, legacy, and business survival",
                "Calculator follow-up paths and CRM pillar tagging",
                "Google Search Console and conversion measurement",
                "Website backup and operational resilience checks",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm leading-relaxed text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="rounded-[2.5rem] border border-cinematic-teal/20 bg-cinematic-teal/10 p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cinematic-teal">
                  Revenue map
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
                  Each pillar opens the next advice conversation.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  A retirement lead can later need estate planning, life cover, business assurance, medical aid, or
                  ongoing advice. The framework makes those relationships easier to nurture without feeling product-led.
                </p>
              </div>
              <div className="space-y-3">
                {masterPlanPillars.map((pillar) => (
                  <Link
                    key={pillar.slug}
                    href={pillar.href}
                    prefetch={false}
                    className={`block rounded-2xl border ${pillar.accent.border} ${pillar.accent.bg} p-4 transition hover:bg-white/[0.08]`}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${pillar.accent.text}`}>
                      {pillar.pillar}
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">{pillar.asset}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
