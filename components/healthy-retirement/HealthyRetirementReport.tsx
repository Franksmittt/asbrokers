"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  GAP_EXPLANATION,
  getNextSteps,
  HEALTHY_RETIREMENT_FRAMEWORK,
  RETIREE_HEALTH_RISKS,
  VO2_MAX_SECTION,
  WEEK_WATCH_SECTION,
} from "@/lib/healthy-retirement/content";
import { getBandColor, type HealthScoreBand } from "@/lib/healthy-retirement/scoring";

type Props = {
  firstName: string;
  healthScore: number;
  healthGap: number;
  bandLabel: string;
  scoreBand: HealthScoreBand;
  deliveredAt?: string;
};

export function HealthyRetirementReport({
  firstName,
  healthScore,
  healthGap,
  bandLabel,
  scoreBand,
  deliveredAt,
}: Props) {
  const nextSteps = getNextSteps(scoreBand);
  const bandColor = getBandColor(scoreBand);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("print") === "1") {
        window.print();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1f2933] print:bg-white">
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .report-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          body {
            background: white !important;
          }
        }
      `}</style>

      <div className="no-print border-b border-[#e5e7eb] bg-[#f5f9fc] px-6 py-4">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#00549F]">Healthy Retirement Blueprint™, AS Brokers</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg bg-[#00549F] px-4 py-2 text-sm font-bold text-white"
            >
              Print / Save as PDF
            </button>
            <Link
              href="/contact"
              className="rounded-lg border border-[#00549F] px-4 py-2 text-sm font-semibold text-[#00549F]"
            >
              Speak to AS Brokers
            </Link>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-10">
        <header className="border-b border-[#e5e7eb] pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00549F]">
            Legacy Conversations™ · Health Pillar
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#00549F]">Healthy Retirement Blueprint™</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
            Prepared for <strong>{firstName}</strong>
            {deliveredAt ? ` · ${new Date(deliveredAt).toLocaleDateString("en-ZA")}` : ""}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-[#9ca3af]">
            Educational wellness guide only, not medical diagnosis or advice. Consult your doctor for personal
            health decisions.
          </p>
        </header>

        {/* Section 1 */}
        <section className="report-section mt-10">
          <h2 className="text-xl font-bold text-[#00549F]">Section 1, Your Retirement Health Score™</h2>
          <div
            className="mt-6 rounded-2xl border-2 p-8 text-center"
            style={{ borderColor: bandColor, backgroundColor: `${bandColor}12` }}
          >
            <p className="text-5xl font-extrabold" style={{ color: bandColor }}>
              {healthScore} <span className="text-2xl text-[#6b7280]">/ 100</span>
            </p>
            <p className="mt-2 text-lg font-semibold text-[#374151]">{bandLabel}</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="report-section mt-12">
          <h2 className="text-xl font-bold text-[#00549F]">Section 2, Understanding Your Retirement Health Gap™</h2>
          <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6">
            <p className="text-4xl font-bold text-[#00549F]">
              {healthGap} <span className="text-lg font-medium text-[#6b7280]">points</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#4b5563]">{GAP_EXPLANATION}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
              Your gap represents room for improvement between where you are today and the habits that support a long,
              active retirement. Closing even part of this gap over the next 90 days can meaningfully improve your
              outlook.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="report-section mt-12">
          <h2 className="text-xl font-bold text-[#00549F]">
            Section 3, The 5 Biggest Health Risks Facing South African Retirees
          </h2>
          <div className="mt-6 space-y-5">
            {RETIREE_HEALTH_RISKS.map((risk, i) => (
              <div key={risk.title} className="rounded-xl border border-[#e5e7eb] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#00549F]">Risk {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-[#1f2933]">{risk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{risk.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="report-section mt-12">
          <h2 className="text-xl font-bold text-[#00549F]">Section 4, The Healthy Retirement Framework™</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {HEALTHY_RETIREMENT_FRAMEWORK.map((item) => (
              <div key={item.title} className="rounded-xl border border-[#00549F]/15 bg-[#f5f9fc] p-5">
                <h3 className="font-bold text-[#00549F]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 */}
        <section className="report-section mt-12">
          <h2 className="text-xl font-bold text-[#00549F]">Section 5, {VO2_MAX_SECTION.title}</h2>
          <div className="mt-4 space-y-4">
            {VO2_MAX_SECTION.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-[#4b5563]">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Section 6 */}
        <section className="report-section mt-12">
          <h2 className="text-xl font-bold text-[#00549F]">Section 6, {WEEK_WATCH_SECTION.title}</h2>
          <div className="mt-4 space-y-4">
            {WEEK_WATCH_SECTION.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-[#4b5563]">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-[#00549F]">
            Interested in joining? Contact AS Brokers to learn when the next cohort opens.
          </p>
        </section>

        {/* Section 7 */}
        <section className="report-section mt-12">
          <h2 className="text-xl font-bold text-[#00549F]">Section 7, Your Next Steps</h2>
          <p className="mt-3 text-sm text-[#6b7280]">Three actions to improve your score over the next 90 days:</p>
          <ol className="mt-4 list-decimal space-y-3 pl-5">
            {nextSteps.map((step) => (
              <li key={step} className="text-sm leading-relaxed text-[#374151]">
                {step}
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-14 border-t border-[#e5e7eb] pt-6 text-xs leading-relaxed text-[#6b7280]">
          <p>
            AS Brokers CC · FSP 17273 · Independent Authorised Financial Service Provider ·{" "}
            <a href="https://www.asbrokers.co.za" className="text-[#00549F]">
              www.asbrokers.co.za
            </a>
          </p>
          <p className="mt-2">
            AS Brokers guides South Africans toward financial freedom <em>and</em> healthy retirement, because both
            matter.
          </p>
        </footer>
      </article>
    </div>
  );
}
