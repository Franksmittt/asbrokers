"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  funnel,
  FunnelCheckItem,
  FunnelSectionHeader,
} from "@/components/funnel/FunnelLayout";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { HubReveal } from "@/components/hub/HubReveal";
import {
  formatOfferPrice,
  type PlanningToolOffer,
} from "@/lib/planning-tools-offers";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;

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
      <span className="rounded-full border border-emerald-600/25 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
        {offer.freeLabel}
      </span>
      {offer.paid && (
        <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-600">
          {offer.paid.status === "coming_soon" ? "Full guide " : ""}
          {formatOfferPrice(offer.paid.priceZar)}
          {offer.paid.status === "coming_soon" ? " · coming soon" : ""}
        </span>
      )}
    </div>
  );
}

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
              ? "border-samsung-blue/30 bg-samsung-blue/[0.06]"
              : "border-stone-200 bg-stone-50"
          }`}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-samsung-blue">
            Stage {step.stage}
            {step.active ? " · start here" : ""}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-[#1D1D1F]">{step.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-stone-600">{step.detail}</p>
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
    <p className={`${funnel.body} border-t border-stone-200/80 pt-4`}>
      <span className="text-stone-500">{before}</span>
      <Link href={href} className="font-medium text-samsung-blue hover:text-cinematic-teal">
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
  heroImage: string;
  heroImageAlt?: string;
  whyTitle?: string;
  whySubtitle?: string;
};

export function FunnelMarketingPage({
  offer,
  stageLabel,
  capture,
  onScrollToCapture,
  primaryCtaLabel = "Get started free",
  heroImage,
  heroImageAlt,
  whyTitle = "Why take this diagnostic?",
  whySubtitle,
}: FunnelMarketingPageProps) {
  return (
    <div className={`${funnel.shell} ${funnel.stack}`}>
      <div className={`${GRID} items-center gap-y-8`}>
        <HubReveal className="col-span-12 lg:col-span-6">
          <p className={funnel.eyebrow}>
            {offer.pillar} · {stageLabel ?? offer.title}
          </p>
          <h1 className={`mt-4 ${funnel.h1}`}>{offer.coreQuestion}</h1>
          <p className={`mt-5 max-w-xl ${funnel.lead}`}>{offer.problem}</p>
          <p className={`mt-3 max-w-xl ${funnel.body}`}>{offer.freeSummary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {onScrollToCapture ? (
              <button type="button" onClick={onScrollToCapture} className={funnel.ctaLg}>
                {primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : null}
            <FunnelPriceBadge offer={offer} />
          </div>
          <p className={`mt-4 trust-hallmark ${funnel.meta}`}>AS Brokers · FSP 17273</p>
        </HubReveal>

        <HubReveal delay={0.06} className="col-span-12 lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
            <Image
              src={heroImage}
              alt={getAlt(heroImage, heroImageAlt ?? offer.title)}
              fill
              priority
              className="object-cover object-center"
              sizes={HUB_SPLIT_HERO_SIZES}
            />
          </div>
        </HubReveal>
      </div>

      <div className="lg:hidden">{capture}</div>

      <div className={GRID}>
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-5 lg:gap-8">
          <section className={funnel.card}>
            <FunnelSectionHeader
              compact
              title={whyTitle}
              subtitle={whySubtitle ?? offer.freeSummary}
            />
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
              subtitle="Start free; upgrade when you want depth."
            />
            <div className="mt-4">
              <FunnelValueLadder offer={offer} />
            </div>
          </section>
        </div>

        <div className="hidden lg:col-span-7 lg:block">
          <div className={`${funnel.cardAccent} ${funnel.cardSticky} shadow-2xl`}>{capture}</div>
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

/** Interactive wizard — left educational panel, right glass form card. */
export function FunnelToolShell({
  children,
  compactHeader,
  sidebar,
  offer,
}: {
  children: ReactNode;
  compactHeader?: ReactNode;
  sidebar?: ReactNode;
  offer?: PlanningToolOffer;
}) {
  const defaultSidebar = offer ? (
    <div className={funnel.card}>
      <p className={funnel.eyebrow}>Why this matters</p>
      <h2 className={`mt-2 ${funnel.h2}`}>{offer.coreQuestion}</h2>
      <p className={`mt-3 ${funnel.body}`}>{offer.problem}</p>
      <ul className="mt-4 space-y-2">
        {offer.proofPoints.map((item) => (
          <li key={item} className={funnel.checkRow}>
            <span className="font-medium text-cinematic-teal" aria-hidden>
              ·
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <FunnelObjectionStripCustom items={offer.objections.slice(0, 3)} />
      </div>
    </div>
  ) : null;

  return (
    <div className={`${funnel.shell} ${funnel.toolShell}`}>
      {compactHeader ? <div className="mb-6">{compactHeader}</div> : null}
      <div className={GRID}>
        <aside className="col-span-12 lg:col-span-5">{sidebar ?? defaultSidebar}</aside>
        <div className="col-span-12 lg:col-span-7">
          <div className="min-h-[380px] rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-stone-200/90 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
