import Link from "next/link";

import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX } from "@/components/PageMediaStrip";
import { RetirementBlueprintForm } from "@/components/forms/RetirementBlueprintForm";

export const metadata = {
  title: "Retirement Survival Blueprint | AS Brokers",
  description:
    "Download the AS Brokers Retirement Survival Blueprint and check whether your retirement income can survive inflation, drawdown, and capital run-out risk.",
};

const proofPoints = [
  {
    label: "Income risk",
    body: "Understand why a retirement plan must be tested against withdrawal rates, not only capital value.",
  },
  {
    label: "Inflation risk",
    body: "See how rising living costs quietly increase the income your capital must produce.",
  },
  {
    label: "Longevity risk",
    body: "Frame the real question: how many years must your capital keep working after your final salary stops?",
  },
];

const blueprintCovers = [
  "How to test whether your capital can sustain your income",
  "The danger of planning only to reach retirement instead of surviving it",
  "Why inflation and drawdown rates must be reviewed together",
  "When a living annuity or income strategy deserves a second opinion",
  "What to prepare before a private retirement income review",
];

const funnelSteps = [
  "Read the retirement problem",
  "Run the income calculator",
  "Download the blueprint",
  "Receive retirement education emails",
  "Book a private review",
];

export default function RetirementSurvivalBlueprintPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-void">
      <section className="relative border-b border-blue-400/20 pb-16 pt-28 md:pb-24 md:pt-36">
        <BackgroundOrbs />
        <div className={`${PAGE_CONTENT_MAX} relative z-10`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                Wealth / Retirement Survival Blueprint
              </p>
              <h1 className="text-5xl font-bold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                Will your money survive your retirement?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                Most retirement plans are designed to reach retirement. The Retirement Survival Blueprint helps you test
                whether your capital can keep producing income after retirement begins.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#download"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:shadow-cta-glow-gold"
                >
                  Download the blueprint
                </Link>
                <Link
                  href="/income-in-retirement"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:border-blue-400/50 hover:bg-blue-400/10"
                >
                  Run the income calculator
                </Link>
              </div>
            </div>

            <div id="download" className="scroll-mt-28">
              <RetirementBlueprintForm />
            </div>
          </div>
        </div>
      </section>

      <main className={PAGE_CONTENT_MAX}>
        <section className="grid gap-4 border-b border-white/5 py-12 md:grid-cols-3 md:py-16">
          {proofPoints.map((point) => (
            <div key={point.label} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">{point.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{point.body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 border-b border-white/5 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
              What is inside
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              A practical guide for retirement income conversations.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              The guide is designed to help prospects arrive at a meeting already thinking about sustainability,
              inflation, drawdown, liquidity, and advice fit.
            </p>
          </div>
          <div className="space-y-3">
            {blueprintCovers.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-sm font-bold text-blue-300">
                  {index + 1}
                </span>
                <p className="self-center text-sm font-semibold text-zinc-200">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-white/5 py-16 md:grid-cols-[1fr_0.9fr] md:py-24">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
              Funnel path
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              From education to a prepared retirement review.
            </h2>
          </div>
          <div className="space-y-3">
            {funnelSteps.map((step, index) => (
              <div key={step} className="rounded-[1.5rem] border border-blue-400/20 bg-blue-400/10 p-4">
                <p className="text-xs font-bold text-blue-300">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="rounded-[2.5rem] border border-blue-400/20 bg-blue-400/10 p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
                  Next best action
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
                  Run the numbers before you book the review.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  The income-in-retirement calculator exposes how drawdown, return assumptions, and inflation can affect
                  the life of your capital.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/income-in-retirement"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
                >
                  Open income calculator
                </Link>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Book a private review
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
