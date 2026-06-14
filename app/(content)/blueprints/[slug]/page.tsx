import Link from "next/link";
import { notFound } from "next/navigation";

import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { Footer } from "@/components/Footer";
import { PAGE_CONTENT_MAX } from "@/components/PageMediaStrip";
import { getMasterPlanPillar, masterPlanPillars } from "@/lib/master-plan";

export function generateStaticParams() {
  return masterPlanPillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pillar = getMasterPlanPillar(slug);

  if (!pillar) {
    return {
      title: "Blueprint Not Found | AS Brokers",
    };
  }

  return {
    title: `${pillar.asset} | AS Brokers ${pillar.pillar}`,
    description: `${pillar.coreQuestion} Explore the ${pillar.asset} from AS Brokers.`,
  };
}

export default async function BlueprintPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pillar = getMasterPlanPillar(slug);

  if (!pillar) {
    notFound();
  }

  const relatedPillars = masterPlanPillars.filter((item) => item.slug !== pillar.slug);
  const primaryCtaHref =
    pillar.slug === "retirement-survival-blueprint"
      ? "/retirement-survival-blueprint#download"
      : pillar.slug === "legacy-blueprint"
        ? "/legacy-blueprint#download"
        : pillar.slug === "business-survival-blueprint"
          ? "/business-survival-blueprint#download"
        : "/contact";

  return (
    <div className="min-h-screen overflow-hidden bg-void">
      <section className={`relative border-b ${pillar.accent.border} pb-16 pt-28 md:pb-24 md:pt-36`}>
        <BackgroundOrbs />
        <div className={`${PAGE_CONTENT_MAX} relative z-10`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className={`mb-4 text-sm font-semibold uppercase tracking-[0.24em] ${pillar.accent.text}`}>
                {pillar.pillar} / {pillar.shortAsset}
              </p>
              <h1 className="text-5xl font-bold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                {pillar.coreQuestion}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">{pillar.theme}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={primaryCtaHref}
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:shadow-cta-glow-gold"
                >
                  {pillar.ctaLabel}
                </Link>
                <Link
                  href="/#blueprints"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:border-cinematic-teal/50 hover:bg-cinematic-teal/10"
                >
                  Explore all blueprints
                </Link>
              </div>
            </div>

            <div className={`rounded-[2.5rem] border ${pillar.accent.border} ${pillar.accent.bg} p-5 ${pillar.accent.glow}`}>
              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${pillar.accent.text}`}>
                  Core asset
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white">{pillar.asset}</h2>
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Problem</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">{pillar.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Purpose</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">{pillar.purpose}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Lead magnet</p>
                    <p className="mt-2 text-sm font-semibold text-white">{pillar.leadMagnet}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className={PAGE_CONTENT_MAX}>
        <section className="grid gap-8 border-b border-white/5 py-16 md:grid-cols-[0.85fr_1.15fr] md:py-24">
          <div>
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${pillar.accent.text}`}>
              Client concerns
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              The topics this asset should own.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Content should educate around these subjects and then move the visitor into the next practical step.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {pillar.topics.map((topic) => (
              <div key={topic} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-semibold text-zinc-200">{topic}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-white/5 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${pillar.accent.text}`}>
              Funnel path
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              How a visitor becomes a prepared advice conversation.
            </h2>
          </div>
          <div className="space-y-3">
            {pillar.funnel.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${pillar.accent.border} ${pillar.accent.bg} text-sm font-bold text-white`}
                >
                  {index + 1}
                </span>
                <p className="self-center text-sm font-semibold text-zinc-200">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-b border-white/5 py-16 md:grid-cols-[0.85fr_1.15fr] md:py-24">
          <div>
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${pillar.accent.text}`}>
              Advice outcomes
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              The revenue conversation stays connected to the problem.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {pillar.revenueConversations.map((item) => (
              <div key={item} className={`rounded-2xl border ${pillar.accent.border} ${pillar.accent.bg} p-4`}>
                <p className="text-sm font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${pillar.accent.text}`}>
                  Next best action
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">
                  Build this into a downloadable guide and automated follow-up sequence.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  This page is the public strategy layer. The production funnel should add a Zod-validated lead capture
                  form, Resend email delivery, CRM pillar tagging, and a timed invitation to book a review.
                </p>
                <Link
                  href={primaryCtaHref}
                  prefetch={false}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:shadow-cta-glow-gold"
                >
                  {pillar.slug === "retirement-survival-blueprint"
                    ? "Download the guide"
                    : pillar.slug === "legacy-blueprint"
                      ? "Download the guide"
                      : pillar.slug === "business-survival-blueprint"
                        ? "Download the workbook"
                    : "Book a review"}
                </Link>
              </div>
              <div className="space-y-3">
                {relatedPillars.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    prefetch={false}
                    className={`block rounded-2xl border ${item.accent.border} ${item.accent.bg} p-4 transition hover:bg-white/[0.08]`}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${item.accent.text}`}>
                      {item.pillar}
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">{item.asset}</p>
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
