"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { funnel, FunnelCheckItem, FunnelSectionHeader } from "@/components/funnel/FunnelLayout";
import { ArrowRight, ShieldCheck } from "@/components/icons";
import { LegacyChecklistLeadForm } from "@/components/legacy/LegacyChecklistLeadForm";

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
  "Retirees",
  "People approaching retirement",
  "Business owners",
  "Property owners",
  "Parents",
  "Blended families",
  "Individuals with trusts",
  "Anyone who has not reviewed their will in the last 3 years",
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

export function LegacyReadinessLanding() {
  return (
    <div className={funnel.page}>
      <div className={funnel.glow} aria-hidden />

      <div className={`${funnel.inner} ${funnel.stack}`}>
        {/* Hero */}
        <header className="text-center">
          <p className={funnel.eyebrow}>Legacy Conversations™</p>
          <h1 className={`mt-4 ${funnel.h1}`}>Don&apos;t die without a plan</h1>
          <p className={`mx-auto mt-5 max-w-2xl ${funnel.lead}`}>
            Most families discover estate planning mistakes only after someone dies.
          </p>
          <p className={`mx-auto mt-3 max-w-2xl ${funnel.body}`}>
            Download the free Legacy Readiness Checklist™ and discover potential gaps in your will, trust,
            beneficiaries, estate liquidity, and succession planning.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <button type="button" onClick={scrollToForm} className={funnel.cta}>
              Download free checklist
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className={`trust-hallmark ${funnel.meta}`}>
              AS Brokers · FSP 17273 · Educational only — not legal advice
            </p>
          </div>
        </header>

        {/* The problem */}
        <section className={funnel.card}>
          <FunnelSectionHeader
            title="The problem"
            subtitle="Most people assume their affairs are in order. Often they are not."
          />
          <ul className="mt-8 space-y-3">
            {ASSUMPTIONS.map((item) => (
              <FunnelCheckItem key={item}>{item}</FunnelCheckItem>
            ))}
          </ul>
          <p className={`mt-8 ${funnel.body}`}>Recent examples we see in practice:</p>
          <ul className={`mt-4 ${funnel.grid2}`}>
            {PROBLEM_EXAMPLES.map((item) => (
              <li key={item} className={funnel.tile}>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base font-medium leading-relaxed text-white">
            A problem discovered after death is usually impossible to fix.
          </p>
        </section>

        {/* What the checklist covers */}
        <section className={funnel.card}>
          <FunnelSectionHeader
            title="What the checklist covers"
            subtitle="Eight areas where gaps commonly appear — before it is too late."
          />
          <ul className={`mt-8 ${funnel.grid2}`}>
            {CHECKLIST_COVERS.map((item) => (
              <li key={item} className={funnel.tile}>
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#00549F]" aria-hidden />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Who should download */}
        <section className={funnel.cardAccent}>
          <FunnelSectionHeader title="Who should download this" subtitle="This checklist is for:" />
          <ul className={`mt-8 ${funnel.grid2}`}>
            {WHO_SHOULD.map((item) => (
              <FunnelCheckItem key={item}>{item}</FunnelCheckItem>
            ))}
          </ul>
        </section>

        {/* Lead capture */}
        <section id="checklist-form" className={`scroll-mt-28 ${funnel.card}`}>
          <FunnelSectionHeader
            title="Get your free Legacy Readiness Checklist™"
            subtitle="Enter your details below. Your checklist opens immediately — no waiting."
          />
          <div className="mt-8">
            <LegacyChecklistLeadForm embedded />
          </div>
        </section>

        {/* Albert / trust */}
        <section className={funnel.card}>
          <p className={funnel.eyebrow}>Your adviser</p>
          <h2 className={`mt-3 ${funnel.h2}`}>Albert Schuurman</h2>
          <p className={`mt-4 max-w-2xl ${funnel.body}`}>
            Albert has been helping South African families protect and preserve wealth since 1999. Through AS
            Brokers he assists clients with estate planning, trusts, retirement structuring, business succession,
            and risk management.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {ALBERT_SERVICES.map((service) => (
              <li
                key={service}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-zinc-300"
              >
                {service}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#00549F] transition hover:text-[#3d8fd4]"
          >
            Speak to AS Brokers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Final CTA */}
        <section className={`${funnel.card} text-center`}>
          <h2 className={funnel.h2}>What happens to your family if you don&apos;t wake up tomorrow?</h2>
          <p className={`mx-auto mt-4 max-w-lg ${funnel.body}`}>
            Download the checklist and find out whether your legacy plan is ready.
          </p>
          <button type="button" onClick={scrollToForm} className={`mt-8 ${funnel.cta}`}>
            Get my free checklist
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </div>

      <Footer />
    </div>
  );
}
