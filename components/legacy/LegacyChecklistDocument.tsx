"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LEGACY_CHECKLIST_SECTIONS } from "@/lib/legacy-checklist/content";

type Props = {
  recipientName?: string;
  deliveredAt?: string;
};

export function LegacyChecklistDocument({ recipientName, deliveredAt }: Props) {
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
          body {
            background: white !important;
          }
        }
      `}</style>

      <div className="no-print border-b border-[#e5e7eb] bg-[#f5f9fc] px-6 py-4">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#00549F]">Legacy Readiness Checklist™, AS Brokers</p>
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
              Request estate review
            </Link>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-10">
        <header className="border-b border-[#e5e7eb] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00549F]">
            Legacy Conversations™ · Phase 1
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#00549F]">Legacy Readiness Checklist™</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
            Use this checklist to identify potential gaps in your will, trust, beneficiaries, estate liquidity, and
            succession planning. Tick each item you are confident is in order. Unchecked items may warrant a
            professional review.
          </p>
          {recipientName && (
            <p className="mt-3 text-sm text-[#374151]">
              Prepared for <strong>{recipientName}</strong>
              {deliveredAt ? ` · ${new Date(deliveredAt).toLocaleDateString("en-ZA")}` : ""}
            </p>
          )}
        </header>

        <div className="mt-8 space-y-8">
          {LEGACY_CHECKLIST_SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-[#00549F]">{section.title}</h2>
              <ul className="mt-3 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 rounded border border-[#9ca3af]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-[#e5e7eb] pt-6 text-xs leading-relaxed text-[#6b7280]">
          <p>
            <strong>Disclaimer:</strong> This checklist is for educational purposes only. It does not constitute legal,
            tax, or financial advice. Estate planning is complex, consult a qualified adviser for guidance tailored to
            your circumstances.
          </p>
          <p className="mt-3">
            AS Brokers CC · FSP 17273 · Independent Authorised Financial Service Provider ·{" "}
            <a href="https://www.asbrokers.co.za" className="text-[#00549F]">
              www.asbrokers.co.za
            </a>
          </p>
          <p className="mt-2 text-[#9ca3af]">
            Next steps: Legacy Readiness Guide™ · Estate Planning Review™ · Legacy Conversations Guide™
          </p>
        </footer>
      </article>
    </div>
  );
}
