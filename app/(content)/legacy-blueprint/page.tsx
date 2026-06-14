import Link from "next/link";

import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX } from "@/components/PageMediaStrip";
import { LegacyBlueprintForm } from "@/components/forms/LegacyBlueprintForm";

export const metadata = {
  title: "Legacy Conversations Guide | AS Brokers",
  description:
    "Download the AS Brokers Legacy Conversations Guide and start reviewing wills, trusts, estate duty, beneficiaries, executors, and family wealth transfer.",
};

const proofPoints = [
  {
    label: "Family risk",
    body: "A will can name heirs, but it cannot fix unclear ownership, liquidity shortfalls, or family conflict by itself.",
  },
  {
    label: "Liquidity risk",
    body: "Executor fees, estate duty, debt, and delays can create cash pressure before inheritances are distributed.",
  },
  {
    label: "Transfer risk",
    body: "Beneficiary nominations, trusts, buy-and-sell arrangements, and family conversations must work together.",
  },
];

const guideCovers = [
  "What your family needs to know if you die tomorrow",
  "How wills, trusts, beneficiaries, and ownership structures interact",
  "Where estate duty, executor fees, and liquidity problems usually appear",
  "Why family conversations matter before the executor is involved",
  "What to prepare before a will, trust, or estate liquidity review",
];

const funnelSteps = [
  "Read the legacy problem",
  "Run an estate calculator",
  "Download the guide",
  "Receive estate planning education emails",
  "Book a will, trust, or estate liquidity review",
];

export default function LegacyBlueprintPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-void">
      <section className="relative border-b border-amber-300/20 pb-16 pt-28 md:pb-24 md:pt-36">
        <BackgroundOrbs />
        <div className={`${PAGE_CONTENT_MAX} relative z-10`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
                Legacy / Legacy Conversations Guide
              </p>
              <h1 className="text-5xl font-bold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                What happens to your family and wealth if you die tomorrow?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                The Legacy Conversations Guide helps families start the difficult but necessary conversations around
                wills, trusts, estate duty, executors, beneficiaries, and family wealth transfer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#download"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:shadow-cta-glow-gold"
                >
                  Download the guide
                </Link>
                <Link
                  href="/estate-duty-calculator"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:border-amber-300/50 hover:bg-amber-300/10"
                >
                  Run estate calculator
                </Link>
              </div>
            </div>

            <div id="download" className="scroll-mt-28">
              <LegacyBlueprintForm />
            </div>
          </div>
        </div>
      </section>

      <main className={PAGE_CONTENT_MAX}>
        <section className="grid gap-4 border-b border-white/5 py-12 md:grid-cols-3 md:py-16">
          {proofPoints.map((point) => (
            <div key={point.label} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">{point.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{point.body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 border-b border-white/5 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
              What is inside
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              A guide for starting the right family wealth conversation.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              The guide prepares prospects for a practical estate planning review by making the invisible questions
              visible before a family is forced to answer them under pressure.
            </p>
          </div>
          <div className="space-y-3">
            {guideCovers.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-300/10 text-sm font-bold text-amber-300">
                  {index + 1}
                </span>
                <p className="self-center text-sm font-semibold text-zinc-200">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-white/5 py-16 md:grid-cols-[1fr_0.9fr] md:py-24">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
              Funnel path
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              From estate awareness to a prepared legacy review.
            </h2>
          </div>
          <div className="space-y-3">
            {funnelSteps.map((step, index) => (
              <div key={step} className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-4">
                <p className="text-xs font-bold text-amber-300">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="rounded-[2.5rem] border border-amber-300/20 bg-amber-300/10 p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                  Next best action
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
                  Run the estate duty numbers before the review.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  The estate duty calculator makes the liquidity problem visible before the family has to deal with it in
                  a crisis.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/estate-duty-calculator"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
                >
                  Open estate duty calculator
                </Link>
                <Link
                  href="/annual-estate-reduction-strategy"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Model estate reduction
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
