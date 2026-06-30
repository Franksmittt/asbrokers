"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import {
  funnel,
  FunnelCheckItem,
  FunnelSectionHeader,
} from "@/components/funnel/FunnelLayout";
import {
  FunnelAscensionHintCustom,
  FunnelObjectionStripCustom,
  FunnelPriceBadge,
} from "@/components/funnel/FunnelMarketingSections";
import { ArrowRight, ShieldCheck } from "@/components/icons";
import { LegacyChecklistLeadForm } from "@/components/legacy/LegacyChecklistLeadForm";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";

const OFFER = PLANNING_TOOL_OFFERS["legacy-checklist"];

const ASSUMPTIONS = [
  "I have a will",
  "My family is protected",
  "My beneficiaries are correct",
  "My estate will be simple",
];

const PROBLEM_EXAMPLES = [
  "Unsigned wills",
  "Outdated beneficiary nominations",
  "Estates with insufficient cash",
  "Business succession failures",
  "Family disputes",
];

const CHECKLIST_COVERS = [
  "Will Planning",
  "Trust Planning",
  "Estate Liquidity",
  "Beneficiary Nominations",
  "Family Succession",
  "Business Succession",
  "Estate Duty Risks",
  "Executor Readiness",
];

const WHO_SHOULD = [
  "Retirees & pre-retirees",
  "Business & property owners",
  "Parents & blended families",
  "Anyone with a trust",
  "Will not reviewed in 3+ years",
];

const ALBERT_SERVICES = [
  "Estate Planning",
  "Trust Planning",
  "Retirement Planning",
  "Business Succession",
  "Risk Management",
];

function scrollToForm() {
  document.getElementById("checklist-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function LeadCaptureCard() {
  return (
    <section id="checklist-form" className={`scroll-mt-24 ${funnel.cardAccent} ${funnel.cardSticky}`}>
      <p className={funnel.eyebrow}>{OFFER.freeLabel}</p>
      <h2 className={`mt-2 ${funnel.h2}`}>Get your {OFFER.title}</h2>
      <p className={`mt-2 ${funnel.body}`}>{OFFER.freeSummary}</p>
      <div className="mt-3">
        <FunnelPriceBadge offer={OFFER} />
      </div>
      <div className="mt-4">
        <FunnelObjectionStripCustom items={OFFER.objections} />
      </div>
      <div className="mt-4">
        <LegacyChecklistLeadForm embedded />
      </div>
      <FunnelAscensionHintCustom
        before="After your checklist: "
        label={OFFER.ascension.label}
        href={OFFER.ascension.href}
      />
    </section>
  );
}

export function LegacyReadinessLanding() {
  return (
    <div className={funnel.page}>
      <div className={funnel.glow} aria-hidden />

      <div className={`${funnel.shell} ${funnel.stack}`}>
        {/* Hero, full shell width, answer-first, single primary CTA */}
        <header>
          <p className={funnel.eyebrow}>Legacy Conversations™ · Stage 1</p>
          <h1 className={`mt-2 ${funnel.h1}`}>Don&apos;t die without a plan</h1>
          <p className={`mt-3 max-w-4xl ${funnel.lead}`}>
            Most families believe their affairs are in order. Many are not, and problems found after
            death cannot be fixed.
          </p>
          <p className={`mt-2 max-w-4xl ${funnel.body}`}>
            The Legacy Readiness Checklist™ reviews wills, trusts, beneficiaries, liquidity, and succession
            in plain language. Free. Immediate. Built for South African families.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" onClick={scrollToForm} className={funnel.ctaLg}>
              Download free checklist
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className={`trust-hallmark ${funnel.meta}`}>AS Brokers · FSP 17273</p>
          </div>
        </header>

        {/* Mobile: form early (value ladder, capture before long scroll) */}
        <div className="lg:hidden">
          <LeadCaptureCard />
        </div>

        {/* Main band: content + sticky form (desktop) */}
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="flex flex-col gap-4 lg:col-span-8 lg:gap-5">
            {/* Problem + pre-handled objection */}
            <section className={funnel.card}>
              <FunnelSectionHeader
                compact
                title="The problem"
                subtitle="If you assume the four statements below are true, you are in good company, and that is exactly why estates fail."
              />
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {ASSUMPTIONS.map((item) => (
                  <FunnelCheckItem key={item}>{item}</FunnelCheckItem>
                ))}
              </ul>
              <p className={`mt-4 ${funnel.h3}`}>What we see when plans are reviewed</p>
              <ul className={`mt-2.5 ${funnel.grid2}`}>
                {PROBLEM_EXAMPLES.map((item) => (
                  <li key={item} className={funnel.tile}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-medium text-white">
                A gap discovered after death is usually impossible to fix.
              </p>
            </section>

            {/* Checklist covers, proof of work / substance */}
            <section className={funnel.card}>
              <FunnelSectionHeader
                compact
                title="What the checklist covers"
                subtitle="Eight areas. One structured review. No legal jargon."
              />
              <ul className={`mt-4 ${funnel.grid4}`}>
                {CHECKLIST_COVERS.map((item) => (
                  <li key={item} className={funnel.tileRow}>
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#00549F]" aria-hidden />
                    <span className="font-medium leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Who + social proof framing */}
            <section className={funnel.card}>
              <FunnelSectionHeader compact title="Who this is for" />
              <ul className={`mt-3 ${funnel.grid2}`}>
                {WHO_SHOULD.map((item) => (
                  <FunnelCheckItem key={item}>{item}</FunnelCheckItem>
                ))}
              </ul>
              <div className={`mt-4 ${funnel.divider} pt-4`}>
                <p className={funnel.eyebrow}>Your adviser</p>
                <h3 className="mt-2 text-lg font-bold text-white">Albert Schuurman</h3>
                <p className={`mt-2 ${funnel.body}`}>
                  Helping South African families protect wealth since 1999, estate planning, trusts,
                  succession, and risk.
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ALBERT_SERVICES.map((service) => (
                    <li
                      key={service}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Desktop sticky form */}
          <div className="hidden lg:col-span-4 lg:block">
            <LeadCaptureCard />
          </div>
        </div>

        {/* Final CTA, compact bar, not another tall card */}
        <section
          className={`${funnel.card} flex flex-col items-start justify-between gap-4 md:flex-row md:items-center`}
        >
          <div className="max-w-2xl">
            <h2 className={funnel.h2}>What happens if you don&apos;t wake up tomorrow?</h2>
            <p className={`mt-1.5 ${funnel.body}`}>
              Find out whether your legacy plan is ready, takes two minutes.
            </p>
          </div>
          <button type="button" onClick={scrollToForm} className={`shrink-0 ${funnel.ctaLg}`}>
            Get my checklist
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        <p className={`text-center ${funnel.meta}`}>
          Educational only, not legal advice ·{" "}
          <Link href="/contact" className="text-[#00549F] hover:underline">
            Speak to AS Brokers
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
}
