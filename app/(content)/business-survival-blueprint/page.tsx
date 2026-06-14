import Link from "next/link";

import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX } from "@/components/PageMediaStrip";
import { BusinessBlueprintForm } from "@/components/forms/BusinessBlueprintForm";

export const metadata = {
  title: "Business Survival Blueprint | AS Brokers",
  description:
    "Download the AS Brokers Business Survival Blueprint and review commercial insurance, business assurance, key person risk, liability, cyber, succession, and continuity planning.",
};

const proofPoints = [
  {
    label: "Operational risk",
    body: "A fire, theft, cyber event, supplier shock, or liability claim can stop revenue faster than most owners expect.",
  },
  {
    label: "People risk",
    body: "If one founder, director, or key employee carries the business, the balance sheet and family wealth are exposed.",
  },
  {
    label: "Continuity risk",
    body: "Commercial cover, buy-and-sell funding, key person cover, and succession planning must work together.",
  },
];

const workbookCovers = [
  "What could stop revenue, damage assets, or trigger liability",
  "Whether business interruption cover matches how the business earns money",
  "Where key person, buy-and-sell, loan account, or surety risks sit",
  "How cyber, contracts, stock, machinery, and premises affect the risk map",
  "What to prepare before a business risk review",
];

const funnelSteps = [
  "Read the business survival problem",
  "Complete the workbook request",
  "Receive business risk education emails",
  "Book a business risk review",
  "Implement commercial, assurance, or continuity solutions",
];

export default function BusinessSurvivalBlueprintPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-void">
      <section className="relative border-b border-rose-300/20 pb-16 pt-28 md:pb-24 md:pt-36">
        <BackgroundOrbs />
        <div className={`${PAGE_CONTENT_MAX} relative z-10`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-rose-300">
                Business Owners / Business Survival Blueprint
              </p>
              <h1 className="text-5xl font-bold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                Could your business survive a major disruption?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                Business owners sit across health, wealth, and legacy. This workbook helps expose the risks that could
                interrupt, damage, or destroy the business that funds the household.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#download"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:shadow-cta-glow-gold"
                >
                  Download the workbook
                </Link>
                <Link
                  href="/solutions/business-insurance"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:border-rose-300/50 hover:bg-rose-300/10"
                >
                  Review commercial cover
                </Link>
              </div>
            </div>

            <div id="download" className="scroll-mt-28">
              <BusinessBlueprintForm />
            </div>
          </div>
        </div>
      </section>

      <main className={PAGE_CONTENT_MAX}>
        <section className="grid gap-4 border-b border-white/5 py-12 md:grid-cols-3 md:py-16">
          {proofPoints.map((point) => (
            <div key={point.label} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">{point.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{point.body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 border-b border-white/5 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-rose-300">
              What is inside
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              A workbook for identifying interruption, liability, and ownership risks.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              The workbook prepares business owners for a risk review by linking commercial cover, business assurance,
              continuity, and succession into one conversation.
            </p>
          </div>
          <div className="space-y-3">
            {workbookCovers.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-300/10 text-sm font-bold text-rose-300">
                  {index + 1}
                </span>
                <p className="self-center text-sm font-semibold text-zinc-200">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-b border-white/5 py-16 md:grid-cols-[1fr_0.9fr] md:py-24">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-rose-300">
              Funnel path
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              From business risk awareness to a prepared owner review.
            </h2>
          </div>
          <div className="space-y-3">
            {funnelSteps.map((step, index) => (
              <div key={step} className="rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-4">
                <p className="text-xs font-bold text-rose-300">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="rounded-[2.5rem] border border-rose-300/20 bg-rose-300/10 p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-rose-300">
                  Next best action
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
                  Review operational and ownership risk together.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  A business survival review should connect commercial insurance, business assurance, key person risk,
                  buy-and-sell funding, liability, cyber, and succession planning.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/solutions/business-insurance"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
                >
                  Commercial insurance overview
                </Link>
                <Link
                  href="/solutions/business-life"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Business assurance overview
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
