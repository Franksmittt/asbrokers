"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/icons";
import { funnel, FunnelCheckItem, FunnelSectionHeader } from "@/components/funnel/FunnelLayout";
import { FunnelPriceBadge } from "@/components/funnel/FunnelMarketingSections";
import { PILLAR_FUNNELS, PILLAR_HUB } from "@/lib/site-navigation";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";

const FRAMEWORK = [
  {
    pillar: "Health",
    question: PLANNING_TOOL_OFFERS["healthy-retirement"].coreQuestion,
    asset: "104 Week Watch Challenge",
    href: PLANNING_TOOL_OFFERS["healthy-retirement"].href,
  },
  {
    pillar: "Wealth",
    question: PLANNING_TOOL_OFFERS["retirement-survival"].coreQuestion,
    asset: "Retirement Survival Blueprint™",
    href: PLANNING_TOOL_OFFERS["retirement-survival"].href,
  },
  {
    pillar: "Legacy",
    question: PLANNING_TOOL_OFFERS["legacy-checklist"].coreQuestion,
    asset: "Legacy Blueprint™",
    href: PLANNING_TOOL_OFFERS["legacy-checklist"].href,
  },
  {
    pillar: "Business",
    question: PLANNING_TOOL_OFFERS["business-risk"].coreQuestion,
    asset: "Business Survival Blueprint™",
    href: PLANNING_TOOL_OFFERS["business-risk"].href,
  },
];

const JOURNEY_STEPS = [
  "Article or video",
  "Calculator or assessment",
  "Lead magnet download",
  "Email sequence",
  "Appointment",
  "Client relationship",
];

export function LegacyConversationsHub() {
  return (
    <div className={funnel.page}>
      <div className={funnel.glow} aria-hidden />

      <div className={`${funnel.shell} ${funnel.stack}`}>
        <header>
          <p className={funnel.eyebrow}>{PILLAR_HUB.label}</p>
          <h1 className={`mt-2 ${funnel.h1}`}>Create · Protect · Preserve</h1>
          <p className={`mt-3 max-w-4xl ${funnel.lead}`}>
            People do not wake up wanting products, they worry about their health, money, family, and business. AS
            Brokers solves those problems through structured planning tools.
          </p>
          <p className={`mt-2 max-w-4xl ${funnel.body}`}>
            Start with a free assessment or checklist. Upgrade to full blueprints (R299) when available. Book a review
            when you want personalised advice.
          </p>
        </header>

        <section className={funnel.card}>
          <FunnelSectionHeader
            compact
            title="The four core assets"
            subtitle="Every tool connects to one problem, and one next step in the journey."
          />
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {FRAMEWORK.map((item) => (
              <li key={item.pillar}>
                <Link
                  href={item.href}
                  className="group block h-full rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#00549F]/40 hover:bg-[#00549F]/[0.06]"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#00549F]">{item.pillar}</p>
                  <p className="mt-1 text-sm font-semibold text-white group-hover:text-[#8ec4f0]">{item.asset}</p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500">{item.question}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#00549F]">
                    Start <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={funnel.card}>
          <FunnelSectionHeader compact title="Planning tools" subtitle="Free to start, full guides from R299 when released." />
          <ul className="mt-4 space-y-3">
            {PILLAR_FUNNELS.map((tool) => {
              const offer = Object.values(PLANNING_TOOL_OFFERS).find((o) => o.href === tool.href);
              return (
                <li
                  key={tool.href}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#00549F]">{tool.pillar}</p>
                    <p className="font-semibold text-white">{tool.label}</p>
                    <p className="mt-1 text-sm text-zinc-500">{tool.description}</p>
                    {offer && (
                      <div className="mt-2">
                        <FunnelPriceBadge offer={offer} />
                      </div>
                    )}
                  </div>
                  <Link href={tool.href} className={`shrink-0 ${funnel.cta}`}>
                    Open tool
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={funnel.card}>
          <FunnelSectionHeader
            compact
            title="The system"
            subtitle="Article → calculator → lead magnet → email → appointment → client."
          />
          <ol className="mt-4 flex flex-wrap gap-2">
            {JOURNEY_STEPS.map((step, i) => (
              <li key={step} className={funnel.tile}>
                <span className="text-[#00549F]">{i + 1}.</span> {step}
              </li>
            ))}
          </ol>
          <ul className={`mt-5 ${funnel.grid2}`}>
            {[
              "Health, vitality, fitness, longevity",
              "Wealth, retirement income & capital",
              "Legacy, wills, trusts, succession",
              "Business, commercial & assurance gaps",
            ].map((item) => (
              <FunnelCheckItem key={item}>{item}</FunnelCheckItem>
            ))}
          </ul>
        </section>

        <section
          className={`${funnel.card} flex flex-col items-start justify-between gap-4 md:flex-row md:items-center`}
        >
          <div className="max-w-2xl">
            <h2 className={funnel.h2}>Not sure where to start?</h2>
            <p className={`mt-1.5 ${funnel.body}`}>
              Pick the question that keeps you awake at night, we will meet you there.
            </p>
          </div>
          <Link href="/contact" className={`shrink-0 ${funnel.ctaLg}`}>
            Speak to AS Brokers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <p className={`text-center ${funnel.meta}`}>
          Educational tools only · FSP 17273 ·{" "}
          <Link href="/calculators" className="text-[#00549F] hover:underline">
            Calculators hub
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
}
