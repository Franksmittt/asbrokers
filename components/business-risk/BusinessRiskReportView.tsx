"use client";

import { useEffect } from "react";

type Props = {
  business: {
    name: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    createdAt: string;
  };
  score: {
    coveredCount: number;
    totalCount: number;
    gapCount: number;
    protectionPercent: number;
    bandLabel: string;
  };
  selectedLabels: string[];
  missingLabels: string[];
};

export function BusinessRiskReportView({ business, score, selectedLabels, missingLabels }: Props) {
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
          <p className="text-sm text-[#00549F] font-semibold">AS Brokers Business Risk Review™ — Report</p>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-[#00549F] px-4 py-2 text-sm font-bold text-white"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-10">
        <header className="border-b border-[#e5e7eb] pb-6">
          <h1 className="text-2xl font-bold text-[#00549F]">Business Risk Review Report</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Generated {new Date(business.createdAt).toLocaleString("en-ZA")}</p>
        </header>

        <section className="mt-6">
          <h2 className="text-lg font-bold">Business details</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li><strong>Company:</strong> {business.company}</li>
            <li><strong>Contact:</strong> {business.name}</li>
            <li><strong>Email:</strong> {business.email}</li>
            <li><strong>Phone:</strong> {business.phone}</li>
            <li><strong>Industry:</strong> {business.industry}</li>
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-[#00549F]/20 bg-[#f5f9fc] p-6">
          <h2 className="text-lg font-bold">Coverage score</h2>
          <p className="mt-2 text-3xl font-extrabold text-[#00549F]">
            {score.coveredCount} / {score.totalCount}
          </p>
          <p className="mt-2 text-sm">Risk protection: <strong>{score.protectionPercent}%</strong></p>
          <p className="mt-1 text-sm">Assessment: <strong>{score.bandLabel}</strong></p>
          <p className="mt-1 text-sm">Potential gaps: <strong>{score.gapCount}</strong></p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold">Selected covers</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {selectedLabels.length > 0 ? selectedLabels.map((l) => <li key={l}>{l}</li>) : <li>None selected</li>}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold">Potential missing covers</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {missingLabels.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold">Recommendations</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">
            <li>Schedule a professional insurance and risk review with AS Brokers.</li>
            <li>Validate policy wordings, limits, and exclusions for each potential gap.</li>
            <li>Review business assurance alongside short-term commercial cover.</li>
          </ul>
        </section>

        <footer className="mt-10 border-t border-[#e5e7eb] pt-6 text-xs leading-relaxed text-[#6b7280]">
          This report is educational and not financial or insurance advice. A professional review is recommended.
          AS Brokers CC · FSP 17273.
        </footer>
      </article>
    </div>
  );
}
