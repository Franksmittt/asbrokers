"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
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

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-zinc-300 sm:text-base">
      <span className="mt-0.5 text-[#00549F]" aria-hidden>
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export function LegacyReadinessLanding() {
  const reducedMotion = useReducedMotion();

  const fade = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.45 },
      };

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Section 1 — Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 md:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,84,159,0.35), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(0,84,159,0.12), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#00549F]">
            Legacy Conversations™
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Don&apos;t die without a plan
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Most families discover estate planning mistakes only after someone dies.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Download the free Legacy Readiness Checklist™ and discover potential gaps in your will, trust,
            beneficiaries, estate liquidity, and succession planning.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-[#00549F] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#0066b8]"
          >
            Download free checklist
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="trust-hallmark mt-8 text-[10px] uppercase tracking-wider text-zinc-600">
            AS Brokers · FSP 17273 · Educational only — not legal advice
          </p>
        </div>
      </section>

      {/* Section 2 — The Problem */}
      <motion.section {...fade} className="px-4 py-20 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card rounded-3xl border border-white/10 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">The problem</h2>
            <p className="mt-4 text-zinc-400">Most people assume:</p>
            <ul className="mt-6 space-y-3">
              {ASSUMPTIONS.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
            <p className="mt-8 text-zinc-300">
              Unfortunately those assumptions are often wrong.
            </p>
            <p className="mt-4 text-sm text-zinc-500">Recent examples include:</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {PROBLEM_EXAMPLES.map((item) => (
                <li key={item} className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base font-medium text-white">
              A problem discovered after death is usually impossible to fix.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Section 3 — What the checklist covers */}
      <motion.section {...fade} className="px-4 py-20 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">What the checklist covers</h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-500">
            Eight areas where gaps commonly appear — before it is too late.
          </p>
          <ul className="mt-10 grid gap-3 text-left sm:grid-cols-2">
            {CHECKLIST_COVERS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-zinc-200"
              >
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#00549F]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Section 4 — Who should download */}
      <motion.section {...fade} className="px-4 py-20 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-[#00549F]/20 bg-[#00549F]/5 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Who should download this</h2>
            <p className="mt-4 text-zinc-400">This checklist is for:</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {WHO_SHOULD.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Section 5 — Lead capture */}
      <motion.section {...fade} id="checklist-form" className="scroll-mt-24 px-4 py-20 sm:px-6 md:px-8">
        <div className="mx-auto max-w-2xl">
          <LegacyChecklistLeadForm />
        </div>
      </motion.section>

      {/* Section 6 — Trust / Albert */}
      <motion.section {...fade} className="px-4 py-20 sm:px-6 md:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rim-light rounded-3xl border border-white/10 p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00549F]">Your adviser</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Albert Schuurman</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Albert Schuurman has been helping South African families protect and preserve wealth since 1999.
              Through AS Brokers he assists clients with:
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ALBERT_SERVICES.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300"
                >
                  {service}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#00549F] hover:text-[#3d8fd4]"
            >
              Speak to AS Brokers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Section 7 — Final CTA */}
      <motion.section {...fade} className="px-4 pb-24 pt-8 sm:px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            What happens to your family if you don&apos;t wake up tomorrow?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-500">
            Download the checklist and find out whether your legacy plan is ready.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#00549F] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#0066b8]"
          >
            Get my free checklist
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
