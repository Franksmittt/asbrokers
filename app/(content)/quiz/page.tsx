"use client";

import { Suspense, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useQueryState } from "nuqs";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/icons";
import {
  useQuizStore,
  AGE_BRACKETS,
  PRIMARY_CONCERNS,
  CAPITAL_RANGES,
  hasCapitalOver100k,
  type AgeBracket,
  type PrimaryConcern,
  type CapitalRangeId,
} from "@/store/useQuizStore";

const STEP_ORDER = ["concern", "age", "capital", "result"] as const;
type StepId = (typeof STEP_ORDER)[number];

const CONCERN_TO_SLUG: Record<PrimaryConcern, string> = {
  "Retirement Shortfall": "retirement",
  "Estate Taxes": "estate",
  "Business Risk": "business",
  "Low Investment Yields": "yields",
};
const AGE_TO_SLUG: Record<AgeBracket, string> = {
  "Under 40": "under40",
  "40-55": "40-55",
  "55+": "55plus",
};
const SLUG_TO_CONCERN: Record<string, PrimaryConcern> = {
  retirement: "Retirement Shortfall",
  estate: "Estate Taxes",
  business: "Business Risk",
  yields: "Low Investment Yields",
};
const SLUG_TO_AGE: Record<string, AgeBracket> = {
  under40: "Under 40",
  "40-55": "40-55",
  "55plus": "55+",
};

type MotionTransition = { x?: number; opacity?: number };
const slideOut: MotionTransition = { x: -100, opacity: 0 };
const slideInFromRight: MotionTransition = { x: 100, opacity: 0 };
const slideInAnimate: MotionTransition = { x: 0, opacity: 1 };
const opacityOnly: MotionTransition = { opacity: 0 };
const opacityOnlyAnimate: MotionTransition = { opacity: 1 };

function QuizPageFallback() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Financial Health</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">Quick Financial Health Check</h1>
          <p className="text-zinc-400">Loading…</p>
        </div>
      </section>
      <section className="px-4 sm:px-6 md:px-8 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl border border-white/10 p-6 md:p-10 min-h-[320px] flex items-center justify-center">
            <p className="text-zinc-500">Preparing your quiz…</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function QuizPageContent() {
  const reducedMotion = useReducedMotion();
  const [concernParam, setConcernParam] = useQueryState("concern", { defaultValue: "" });
  const [ageParam, setAgeParam] = useQueryState("age", { defaultValue: "" });
  const [capitalParam, setCapitalParam] = useQueryState("capital", { defaultValue: "" });

  const {
    primaryConcern,
    ageBracket,
    availableCapital,
    setPrimaryConcern,
    setAgeBracket,
    setAvailableCapital,
  } = useQuizStore();

  useEffect(() => {
    if (!concernParam || !ageParam || !capitalParam) return;
    if (primaryConcern && ageBracket && availableCapital) return;
    const c = SLUG_TO_CONCERN[concernParam];
    const a = SLUG_TO_AGE[ageParam];
    if (c) setPrimaryConcern(c);
    if (a) setAgeBracket(a);
    setAvailableCapital(capitalParam as CapitalRangeId);
    // Intentionally run only when URL params change (shared-link hydration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concernParam, ageParam, capitalParam]);

  const stepIndex = (() => {
    if (primaryConcern && !ageBracket) return 1;
    if (ageBracket && availableCapital === null) return 2;
    if (availableCapital !== null) return 3;
    return 0;
  })();
  const currentStep: StepId = STEP_ORDER[stepIndex];

  const syncStoreToUrl = useCallback(() => {
    if (primaryConcern) setConcernParam(CONCERN_TO_SLUG[primaryConcern]);
    if (ageBracket) setAgeParam(AGE_TO_SLUG[ageBracket]);
    if (availableCapital) setCapitalParam(availableCapital);
  }, [primaryConcern, ageBracket, availableCapital, setConcernParam, setAgeParam, setCapitalParam]);

  useEffect(() => {
    if (currentStep === "result") syncStoreToUrl();
  }, [currentStep, syncStoreToUrl]);

  const exitTransition = reducedMotion ? opacityOnly : slideOut;
  const initialTransition = reducedMotion ? opacityOnly : slideInFromRight;
  const animateTransition = reducedMotion ? opacityOnlyAnimate : slideInAnimate;

  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <a href="#quiz-content" className="skip-link">
        Skip to quiz
      </a>
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Financial Health
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Quick Financial Health Check
          </h1>
          <p className="text-zinc-400">
            Answer a few questions and we&apos;ll point you to the right calculators and resources.
          </p>
        </div>
      </section>

      <section id="quiz-content" className="px-4 sm:px-6 md:px-8 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card glass-card-hover rounded-2xl border border-white/10 p-6 md:p-10 min-h-[320px] overflow-hidden relative">
            <AnimatePresence mode="wait">
              {currentStep === "concern" && (
                <StepPanel
                  stepKey="concern"
                  exitTransition={exitTransition}
                  initialTransition={initialTransition}
                  animateTransition={animateTransition}
                  onBack={null}
                >
                  <h2 className="text-xl font-bold text-white mb-2">
                    What&apos;s your biggest financial concern right now?
                  </h2>
                  <p className="text-zinc-500 text-sm mb-6">Choose the one that matters most to you.</p>
                  <div className="space-y-3">
                    {PRIMARY_CONCERNS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPrimaryConcern(c)}
                        className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 text-left transition-colors"
                      >
                        <span className="text-zinc-200">{c}</span>
                        <ArrowRight className="w-5 h-5 text-blue-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </StepPanel>
              )}

              {currentStep === "age" && (
                <StepPanel
                  stepKey="age"
                  exitTransition={exitTransition}
                  initialTransition={initialTransition}
                  animateTransition={animateTransition}
                  onBack={() => useQuizStore.getState().setPrimaryConcern(null as unknown as PrimaryConcern)}
                >
                  <h2 className="text-xl font-bold text-white mb-2">
                    Roughly, which age group are you in?
                  </h2>
                  <p className="text-zinc-500 text-sm mb-6">This helps us tailor recommendations.</p>
                  <div className="space-y-3">
                    {AGE_BRACKETS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setAgeBracket(a)}
                        className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 text-left transition-colors"
                      >
                        <span className="text-zinc-200">{a}</span>
                        <ArrowRight className="w-5 h-5 text-blue-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </StepPanel>
              )}

              {currentStep === "capital" && (
                <StepPanel
                  stepKey="capital"
                  exitTransition={exitTransition}
                  initialTransition={initialTransition}
                  animateTransition={animateTransition}
                  onBack={() => useQuizStore.getState().setAgeBracket(null as unknown as AgeBracket)}
                >
                  <h2 className="text-xl font-bold text-white mb-2">
                    Roughly how much capital do you have available to invest?
                  </h2>
                  <p className="text-zinc-500 text-sm mb-6">
                    This helps us recommend suitable options (e.g. Everest products from R100k).
                  </p>
                  <div className="space-y-3">
                    {CAPITAL_RANGES.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setAvailableCapital(r.id)}
                        className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 text-left transition-colors"
                      >
                        <span className="text-zinc-200">{r.label}</span>
                        <ArrowRight className="w-5 h-5 text-blue-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </StepPanel>
              )}

              {currentStep === "result" && (
                <StepPanel
                  stepKey="result"
                  exitTransition={exitTransition}
                  initialTransition={initialTransition}
                  animateTransition={animateTransition}
                  onBack={() => useQuizStore.getState().setAvailableCapital(null)}
                >
                  <QuizResults
                    concernSlug={concernParam || (primaryConcern ? CONCERN_TO_SLUG[primaryConcern] : "")}
                    ageSlug={ageParam || (ageBracket ? AGE_TO_SLUG[ageBracket] : "")}
                    capitalSlug={capitalParam || availableCapital || ""}
                    slugToConcern={SLUG_TO_CONCERN}
                    slugToAge={SLUG_TO_AGE}
                  />
                </StepPanel>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizPageFallback />}>
      <QuizPageContent />
    </Suspense>
  );
}

function StepPanel({
  stepKey,
  children,
  exitTransition,
  initialTransition,
  animateTransition,
  onBack,
}: {
  stepKey: string;
  children: React.ReactNode;
  exitTransition: MotionTransition;
  initialTransition: MotionTransition;
  animateTransition: MotionTransition;
  onBack: (() => void) | null;
}) {
  return (
    <motion.div
      key={stepKey}
      initial={initialTransition}
      animate={animateTransition}
      exit={exitTransition}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute inset-0 p-6 md:p-10 flex flex-col"
    >
      {children}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 text-sm text-zinc-500 hover:text-zinc-300"
        >
          ← Back
        </button>
      )}
    </motion.div>
  );
}

type QuizResultsProps = {
  concernSlug: string;
  ageSlug: string;
  capitalSlug: string;
  slugToConcern: Record<string, PrimaryConcern>;
  slugToAge: Record<string, AgeBracket>;
};

function QuizResults({ concernSlug, ageSlug, capitalSlug, slugToConcern, slugToAge }: QuizResultsProps) {
  const concern = concernSlug ? slugToConcern[concernSlug] : null;
  const age = ageSlug ? slugToAge[ageSlug] : null;
  const capitalOver100k = hasCapitalOver100k(capitalSlug as CapitalRangeId | null);

  const primaryRecommendation = (() => {
    if (concern === "Low Investment Yields" && capitalOver100k)
      return {
        title: "Everest Wealth 12.8% Strategic Income",
        href: "/everest-128-product",
        description: "Fixed-return income option for capital from R100,000. Ideal when your main concern is low investment yields.",
      };
    if (concern === "Retirement Shortfall" && age === "55+")
      return {
        title: "Amethyst Living Annuity",
        href: "/everest-amethyst-living-annuity",
        description: "Structure pension/retirement capital with flexible drawdown (2.5%–17.5%). Suited to retirement shortfall and 55+.",
      };
    if (concern === "Estate Taxes")
      return {
        title: "Annual Estate Reduction Strategy",
        href: "/annual-estate-reduction-strategy",
        description: "Use R100k/R200k annual donation allowances to reduce estate duty over time.",
      };
    return null;
  })();

  const fallbackLinks = (() => {
    if (concern === "Business Risk")
      return [
        { label: "Business Life & Key Person", href: "/solutions/business-life" },
        { label: "Business Insurance", href: "/solutions/business-insurance" },
        { label: "All calculators", href: "/calculators" },
      ];
    if (concern === "Retirement Shortfall")
      return [
        { label: "Retirement Reality Calculator", href: "/retirement" },
        { label: "Income in Retirement", href: "/income-in-retirement" },
        { label: "Everest Wealth", href: "/everest-wealth" },
      ];
    if (concern === "Estate Taxes")
      return [
        { label: "Estate Duty Calculator", href: "/estate-duty-calculator" },
        { label: "Annual Estate Reduction Strategy", href: "/annual-estate-reduction-strategy" },
      ];
    if (concern === "Low Investment Yields")
      return [
        { label: "Everest Wealth", href: "/everest-wealth" },
        { label: "12.8% Strategic Income", href: "/everest-128-product" },
        { label: "Calculators", href: "/calculators" },
      ];
    return [
      { label: "Calculator Hub", href: "/calculators" },
      { label: "Everest Wealth", href: "/everest-wealth" },
      { label: "Contact us", href: "/contact" },
    ];
  })();

  return (
    <>
      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
        <ArrowRight className="w-7 h-7 text-blue-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Here&apos;s where to go next</h2>
      <p className="text-zinc-400 text-sm mb-6">
        Based on your answers, we recommend the following. Share this page to keep your results.
      </p>

      {primaryRecommendation && (
        <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
            Top recommendation
          </p>
          <Link
            href={primaryRecommendation.href}
            prefetch={false}
            className="inline-flex items-center gap-2 text-white font-semibold hover:text-blue-300"
          >
            {primaryRecommendation.title}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-zinc-400 mt-2">{primaryRecommendation.description}</p>
        </div>
      )}

      <ul className="space-y-3 mb-8">
        {(primaryRecommendation ? fallbackLinks.filter((l) => l.href !== primaryRecommendation.href) : fallbackLinks)
          .slice(0, 4)
          .map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                prefetch={false}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
              >
                {label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </li>
          ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/contact"
          prefetch={false}
          className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-zinc-200"
        >
          Get a personalised plan
        </Link>
        <Link
          href="/calculators"
          prefetch={false}
          className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full text-sm hover:bg-white/10"
        >
          View all calculators
        </Link>
      </div>
    </>
  );
}
