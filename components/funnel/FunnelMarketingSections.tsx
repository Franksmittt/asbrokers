"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  funnel,
  FunnelCheckItem,
  FunnelSectionHeader,
} from "@/components/funnel/FunnelLayout";
import {
  formatOfferPrice,
  type PlanningToolOffer,
} from "@/lib/planning-tools-offers";
import { ArrowRight } from "@/components/icons";

export function FunnelObjectionStripCustom({ items }: { items: string[] }) {
  return (
    <ul className={`${funnel.trustStrip} !justify-start text-left`}>
      {items.map((item, i) => (
        <li
          key={item}
          className={i > 0 && i < items.length - 1 ? "hidden sm:list-item" : undefined}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function FunnelPriceBadge({ offer }: { offer: PlanningToolOffer }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
        {offer.freeLabel}
      </span>
      {offer.paid && (
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
          {offer.paid.status === "coming_soon" ? "Full guide " : ""}
          {formatOfferPrice(offer.paid.priceZar)}
          {offer.paid.status === "coming_soon" ? " · coming soon" : ""}
        </span>
      )}
    </div>
  );
}

/** Value ladder: free → tripwire → ascension (master plan + funnel research) */
export function FunnelValueLadder({ offer }: { offer: PlanningToolOffer }) {
  const steps = [
    { stage: "1", label: offer.freeLabel, detail: offer.freeSummary, active: true },
    ...(offer.paid
      ? [
          {
            stage: "2",
            label: offer.paid.label,
            detail: `${formatOfferPrice(offer.paid.priceZar)} · ${offer.paid.summary}`,
            active: offer.paid.status === "available",
          },
        ]
      : []),
    {
      stage: offer.paid ? "3" : "2",
      label: offer.ascension.label,
      detail: offer.ascension.summary,
      active: false,
    },
  ];

  return (
    <ol className="space-y-2">
      {steps.map((step) => (
        <li
          key={step.stage}
          className={`rounded-xl border px-3.5 py-2.5 ${
            step.active
              ? "border-[#00549F]/35 bg-[#00549F]/[0.08]"
              : "border-white/10 bg-white/[0.02]"
          }`}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#00549F]">
            Stage {step.stage}
            {step.active ? " · start here" : ""}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-white">{step.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function FunnelAscensionHintCustom({
  before = "When you are ready: ",
  label,
  href,
  after = " with AS Brokers.",
}: {
  before?: string;
  label: string;
  href: string;
  after?: string;
}) {
  return (
    <p className={`${funnel.body} border-t border-white/10 pt-4`}>
      <span className="text-zinc-500">{before}</span>
      <Link href={href} className="font-medium text-[#00549F] hover:underline">
        {label}
      </Link>
      {after}
    </p>
  );
}

type FunnelMarketingPageProps = {
  offer: PlanningToolOffer;
  stageLabel?: string;
  capture: ReactNode;
  onScrollToCapture?: () => void;
  primaryCtaLabel?: string;
};

export function FunnelMarketingPage({
  offer,
  stageLabel,
  capture,
  onScrollToCapture,
  primaryCtaLabel = "Get started free",
}: FunnelMarketingPageProps) {
  return (
    <div className={`${funnel.shell} ${funnel.stack}`}>
      <header>
        <p className={funnel.eyebrow}>
          {offer.pillar} · {stageLabel ?? offer.title}
        </p>
        <h1 className={`mt-2 ${funnel.h1}`}>{offer.coreQuestion}</h1>
        <p className={`mt-3 max-w-4xl ${funnel.lead}`}>{offer.problem}</p>
        <p className={`mt-2 max-w-4xl ${funnel.body}`}>{offer.freeSummary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {onScrollToCapture ? (
            <button type="button" onClick={onScrollToCapture} className={funnel.ctaLg}>
              {primaryCtaLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : null}
          <FunnelPriceBadge offer={offer} />
        </div>
        <p className={`mt-3 trust-hallmark ${funnel.meta}`}>AS Brokers · FSP 17273</p>
      </header>

      <div className="lg:hidden">{capture}</div>

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="flex flex-col gap-4 lg:col-span-8 lg:gap-5">
          <section className={funnel.card}>
            <FunnelSectionHeader compact title="What you get" subtitle="Proof of work, structured, not generic promises." />
            <ul className={`mt-4 ${funnel.grid2}`}>
              {offer.proofPoints.map((item) => (
                <li key={item} className={funnel.tile}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={funnel.card}>
            <FunnelSectionHeader compact title="Who this is for" />
            <ul className={`mt-3 ${funnel.grid2}`}>
              {offer.whoFor.map((item) => (
                <FunnelCheckItem key={item}>{item}</FunnelCheckItem>
              ))}
            </ul>
          </section>

          <section className={funnel.card}>
            <FunnelSectionHeader
              compact
              title="Your path"
              subtitle="Article → tool → lead magnet → email → appointment. Start free; upgrade when you want depth."
            />
            <div className="mt-4">
              <FunnelValueLadder offer={offer} />
            </div>
          </section>
        </div>

        <div className="hidden lg:col-span-4 lg:block">
          <div className={`${funnel.cardAccent} ${funnel.cardSticky}`}>{capture}</div>
        </div>
      </div>

      <section
        className={`${funnel.card} flex flex-col items-start justify-between gap-4 md:flex-row md:items-center`}
      >
        <div className="max-w-2xl">
          <h2 className={funnel.h2}>{offer.title}</h2>
          <p className={`mt-1.5 ${funnel.body}`}>{offer.freeSummary}</p>
          <div className="mt-3">
            <FunnelObjectionStripCustom items={offer.objections} />
          </div>
        </div>
        {onScrollToCapture ? (
          <button type="button" onClick={onScrollToCapture} className={`shrink-0 ${funnel.ctaLg}`}>
            {primaryCtaLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : null}
      </section>
    </div>
  );
}

/** Wide container for interactive wizard steps */
export function FunnelToolShell({
  children,
  compactHeader,
}: {
  children: ReactNode;
  compactHeader?: ReactNode;
}) {
  return (
    <div className={`${funnel.shell} ${funnel.toolShell}`}>
      {compactHeader}
      <div className="mx-auto w-full max-w-5xl">
        <div className={`${funnel.card} min-h-[380px]`}>{children}</div>
      </div>
    </div>
  );
}
