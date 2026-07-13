"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/icons";
import {
  FunnelAscensionHintCustom,
  FunnelMarketingPage,
  FunnelObjectionStripCustom,
  FunnelToolShell,
} from "@/components/funnel/FunnelMarketingSections";
import { funnel, funnelForm } from "@/components/funnel/FunnelLayout";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";
import {
  BUSINESS_RISK_SECTIONS,
  INDUSTRY_OPTIONS,
  TOTAL_RISK_COVER_COUNT,
  type RiskCoverItem,
} from "@/lib/business-risk/catalog";
import {
  calculateBusinessRiskScore,
  getProtectionBandColor,
  type BusinessRiskScore,
} from "@/lib/business-risk/scoring";
import { submitBusinessRiskReview } from "@/app/(content)/business-risk-review/actions";

type Phase = "landing" | "lead" | "covers" | "results";

const OFFER = PLANNING_TOOL_OFFERS["business-risk"];

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: (typeof INDUSTRY_OPTIONS)[number];
};

const inputClass = funnelForm.input;
const labelClass = funnelForm.label;

export function BusinessRiskReviewTool() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("landing");
  const [lead, setLead] = useState<LeadForm>({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "Other",
  });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeInfo, setActiveInfo] = useState<RiskCoverItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const score = useMemo(() => calculateBusinessRiskScore([...selected]), [selected]);

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.3 },
      };

  function toggleCover(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function startReview() {
    setPhase("lead");
  }

  function handleLeadContinue() {
    if (!lead.name.trim() || !lead.email.trim() || !lead.phone.trim() || !lead.company.trim()) {
      setError("Please complete all contact fields.");
      return;
    }
    setError(null);
    setPhase("covers");
  }

  function handleSeeResults() {
    setError(null);
    const fd = new FormData();
    fd.set("name", lead.name);
    fd.set("email", lead.email);
    fd.set("phone", lead.phone);
    fd.set("company", lead.company);
    fd.set("industry", lead.industry);
    for (const id of selected) fd.append("selectedCoverIds", id);

    startTransition(async () => {
      const result = await submitBusinessRiskReview({ success: false }, fd);
      if (!result.success) {
        setError(result.message ?? "Could not save your review.");
        return;
      }
      setReportId(result.reportId ?? null);
      setPhase("results");
    });
  }

  const captureCard = (
    <>
      <p className={funnel.eyebrow}>{OFFER.freeLabel}</p>
      <h2 className={`mt-2 ${funnel.h2}`}>Start your review</h2>
      <p className={`mt-2 ${funnel.body}`}>{OFFER.freeSummary}</p>
      <div className="mt-4">
        <FunnelObjectionStripCustom items={OFFER.objections} />
      </div>
      <button type="button" onClick={startReview} className={`mt-5 ${funnel.ctaLg}`}>
        Start free workbook
        <ArrowRight className="h-4 w-4" />
      </button>
      <FunnelAscensionHintCustom
        before="After your score: "
        label={OFFER.ascension.label}
        href={OFFER.ascension.href}
      />
    </>
  );

  const toolProgress =
    phase === "lead" ? 33 : phase === "covers" ? 66 : phase === "results" ? 100 : 0;

  return (
    <div className={funnel.page}>
      <div className={funnel.glow} aria-hidden />

      {phase === "landing" && (
        <FunnelMarketingPage
          offer={OFFER}
          heroImage="/images/home4-goal-insure-16x9.jpg"
          heroImageAlt="Business owner reviewing commercial risk protection"
          capture={captureCard}
          onScrollToCapture={startReview}
          primaryCtaLabel="Start free workbook"
        />
      )}

      {phase !== "landing" && (
        <FunnelToolShell
          offer={OFFER}
          compactHeader={
            <div className="mb-4">
              <p className={funnel.eyebrow}>{OFFER.title}</p>
              <div className={funnelForm.progressTrack}>
                <div
                  className={funnelForm.progressFill}
                  style={{ width: `${toolProgress}%` }}
                />
              </div>
            </div>
          }
        >
          <div id="business-tool" className={funnel.toolScrollMargin}>
            <AnimatePresence mode="wait">
              <motion.div key={phase} {...motionProps}>
                {phase === "lead" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#1D1D1F]">Step 1, Your details</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className={labelClass} htmlFor="brr-name">Name</label>
                        <input id="brr-name" className={inputClass} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="brr-email">Email</label>
                        <input id="brr-email" type="email" className={inputClass} value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="brr-phone">Mobile number</label>
                        <input id="brr-phone" className={inputClass} value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="brr-company">Company name</label>
                        <input id="brr-company" className={inputClass} value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="brr-industry">Industry</label>
                        <select id="brr-industry" className={inputClass} value={lead.industry} onChange={(e) => setLead({ ...lead, industry: e.target.value as LeadForm["industry"] })}>
                          {INDUSTRY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {phase === "covers" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold text-[#1D1D1F]">Step 2, What cover do you have?</h2>
                      <p className="mt-2 text-sm text-stone-600">
                        Tick every category you believe is already in place. Unticked items are flagged as potential gaps.
                      </p>
                    </div>
                    {BUSINESS_RISK_SECTIONS.map((section) => (
                      <div key={section.id}>
                        <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-cinematic-teal">{section.title}</h3>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item.id} className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3">
                              <input
                                type="checkbox"
                                id={`cover-${item.id}`}
                                checked={selected.has(item.id)}
                                onChange={() => toggleCover(item.id)}
                                className="mt-1 h-4 w-4 shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <label htmlFor={`cover-${item.id}`} className="cursor-pointer font-medium text-[#1D1D1F]">
                                  {item.label}
                                </label>
                              </div>
                              <button
                                type="button"
                                onClick={() => setActiveInfo(item)}
                                className="shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-xs text-stone-600 hover:text-[#1D1D1F]"
                                aria-label={`More information about ${item.label}`}
                              >
                                ⓘ
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <p className="text-xs text-stone-500">
                      Selected: {selected.size} of {TOTAL_RISK_COVER_COUNT} categories
                    </p>
                  </div>
                )}

                {phase === "results" && (
                  <ResultsPanel score={score} reportId={reportId} company={lead.company} />
                )}
              </motion.div>
            </AnimatePresence>

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

            <div className="mt-6 flex flex-wrap gap-3">
              {phase === "lead" && (
                <>
                  <button type="button" onClick={() => setPhase("landing")} className="rounded-xl border border-stone-200 px-5 py-3 text-sm text-stone-600 hover:bg-stone-50">
                    Back
                  </button>
                  <button type="button" onClick={handleLeadContinue} className="rounded-xl bg-[#00549F] px-6 py-3 text-sm font-bold text-white hover:brightness-110">
                    Continue to cover checklist
                  </button>
                </>
              )}
              {phase === "covers" && (
                <>
                  <button type="button" onClick={() => setPhase("lead")} className="rounded-xl border border-stone-200 px-5 py-3 text-sm text-stone-600 hover:bg-stone-50">
                    Back
                  </button>
                  <button type="button" onClick={handleSeeResults} disabled={isPending} className="rounded-xl bg-[#00549F] px-6 py-3 text-sm font-bold text-white hover:brightness-110 disabled:opacity-60">
                    {isPending ? "Saving…" : "See my Business Risk Score"}
                  </button>
                </>
              )}
              {phase === "results" && reportId && (
                <a
                  href={`/business-risk-review/report/${reportId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black hover:bg-zinc-200"
                >
                  Download PDF report
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </FunnelToolShell>
      )}

      <p className={`${funnel.shell} pb-6 text-center ${funnel.meta}`}>
        Educational only, not insurance advice · AS Brokers CC · FSP 17273
      </p>

      {activeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4" role="dialog" aria-modal="true">
          <div className="max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1D1D1F]">{activeInfo.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">{activeInfo.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/contact" className="rounded-xl bg-[#00549F] px-4 py-2 text-sm font-semibold text-[#1D1D1F]">
                Learn more, request review
              </Link>
              <button type="button" onClick={() => setActiveInfo(null)} className="rounded-xl border border-white/15 px-4 py-2 text-sm text-stone-600">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function ResultsPanel({
  score,
  reportId,
  company,
}: {
  score: BusinessRiskScore;
  reportId: string | null;
  company: string;
}) {
  const bandColor = getProtectionBandColor(score.band);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#1D1D1F]">Your Business Risk Score</h2>
      <div className="rounded-2xl border p-6 text-center" style={{ borderColor: `${bandColor}55`, backgroundColor: `${bandColor}15` }}>
        <p className="text-sm font-bold uppercase tracking-wide" style={{ color: bandColor }}>
          {score.bandLabel}
        </p>
        <p className="mt-4 text-5xl font-extrabold text-samsung-blue">{score.protectionPercent}%</p>
        <p className="mt-2 text-sm text-stone-600">Risk Protection</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-wide text-stone-500">Coverage score</p>
          <p className="mt-1 text-2xl font-bold text-[#1D1D1F]">
            {score.coveredCount} / {score.totalCount}
          </p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-wide text-stone-500">Potential gaps</p>
          <p className="mt-1 text-2xl font-bold text-[#1D1D1F]">{score.gapCount}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-wide text-stone-500">Company</p>
          <p className="mt-1 text-lg font-bold text-[#1D1D1F]">{company}</p>
        </div>
      </div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-stone-700">
        <p className="font-semibold text-amber-100">Recommendations</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Request a professional insurance and risk review with AS Brokers.</li>
          <li>Prioritise potential gaps in liability, interruption, and crime cover.</li>
          <li>Align business assurance (key person, buy &amp; sell) with ownership structure.</li>
        </ul>
      </div>
      {reportId && (
        <p className="text-sm text-stone-600">
          Your report has been saved. Download the PDF for your records or share it with your adviser.
        </p>
      )}
      <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:underline">
        Book a professional business risk review
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
