"use client";

import { Suspense, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useQueryState } from "nuqs";
import { ArrowRight } from "@/components/icons";
import {
  WARM_BODY,
  WARM_BTN_PRIMARY,
  WARM_BTN_SECONDARY,
  WARM_CARD,
  WARM_H3,
  WARM_LINK,
  WARM_WRAP,
} from "@/lib/warm-theme";
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

export function QuizPageLoading() {
  return (
    <section id="quiz-content" className="pb-24">
      <div className={`${WARM_WRAP} max-w-2xl`}>
        <div className={`${WARM_CARD} flex min-h-[320px] items-center justify-center`}>
          <p className="text-stone-500">Preparing your quiz…</p>
        </div>
      </div>
    </section>
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
    <section id="quiz-content" className="pb-24">
      <div className={`${WARM_WRAP} max-w-2xl`}>
        <div className={`${WARM_CARD} relative min-h-[320px] overflow-hidden`}>
          <AnimatePresence mode="wait">
            {currentStep === "concern" && (
              <StepPanel
                stepKey="concern"
                exitTransition={exitTransition}
                initialTransition={initialTransition}
                animateTransition={animateTransition}
                onBack={null}
              >
                <h2 className={`${WARM_H3} mb-2`}>
                  What&apos;s your biggest financial concern right now?
                </h2>
                <p className="mb-6 text-sm text-stone-500">Choose the one that matters most to you.</p>
                <div className="space-y-3">
                  {PRIMARY_CONCERNS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setPrimaryConcern(c)}
                      className="flex w-full items-center justify-between gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 text-left transition-colors hover:border-samsung-blue/30 hover:bg-white"
                    >
                      <span className="text-shark">{c}</span>
                      <ArrowRight className="h-5 w-5 shrink-0 text-samsung-blue" />
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
                <h2 className={`${WARM_H3} mb-2`}>Roughly, which age group are you in?</h2>
                <p className="mb-6 text-sm text-stone-500">This helps us tailor recommendations.</p>
                <div className="space-y-3">
                  {AGE_BRACKETS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAgeBracket(a)}
                      className="flex w-full items-center justify-between gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 text-left transition-colors hover:border-samsung-blue/30 hover:bg-white"
                    >
                      <span className="text-shark">{a}</span>
                      <ArrowRight className="h-5 w-5 shrink-0 text-samsung-blue" />
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
                <h2 className={`${WARM_H3} mb-2`}>
                  Roughly how much capital do you have available to invest?
                </h2>
                <p className="mb-6 text-sm text-stone-500">
                  This helps us recommend suitable options (e.g. Everest products from R100k).
                </p>
                <div className="space-y-3">
                  {CAPITAL_RANGES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setAvailableCapital(r.id)}
                      className="flex w-full items-center justify-between gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 text-left transition-colors hover:border-samsung-blue/30 hover:bg-white"
                    >
                      <span className="text-shark">{r.label}</span>
                      <ArrowRight className="h-5 w-5 shrink-0 text-samsung-blue" />
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
  );
}

export function QuizPageClient() {
  return (
    <Suspense fallback={<QuizPageLoading />}>
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
        <button type="button" onClick={onBack} className="mt-6 text-sm text-stone-500 hover:text-shark">
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
        href: "/everest-wealth",
        description:
          "Targeted income option for capital from R100,000. Ideal when your main concern is low investment yields.",
      };
    if (concern === "Retirement Shortfall" && age === "55+")
      return {
        title: "Amethyst Living Annuity",
        href: "/calculators#asset-014-living-annuity",
        description:
          "Structure pension/retirement capital with flexible drawdown (2.5%–17.5%). Suited to retirement shortfall and 55+.",
      };
    if (concern === "Estate Taxes")
      return {
        title: "Annual Estate Reduction Strategy",
        href: "/calculators#asset-008-estate-reduction",
        description: "Use R100k/R200k annual donation allowances to reduce estate duty over time.",
      };
    return null;
  })();

  const fallbackLinks = (() => {
    if (concern === "Business Risk")
      return [
        { label: "Business Life & Key Person", href: "/solutions/business-life" },
        { label: "Business Insurance", href: "/solutions/business-insurance" },
        { label: "Insights", href: "/insights" },
      ];
    if (concern === "Retirement Shortfall")
      return [
        { label: "Retirement Reality Calculator", href: "/retirement" },
        { label: "Life of capital calculator", href: "/calculators#asset-004-life-of-capital" },
        { label: "Everest Wealth", href: "/everest-wealth" },
      ];
    if (concern === "Estate Taxes")
      return [
        { label: "Planning tools", href: "/calculators" },
        { label: "Estate reduction calculator", href: "/calculators#asset-008-estate-reduction" },
      ];
    if (concern === "Low Investment Yields")
      return [
        { label: "Everest Wealth", href: "/everest-wealth" },
        { label: "12.8% Strategic Income", href: "/calculators#asset-010-everest-128-income" },
        { label: "Retirement planning", href: "/retirement" },
      ];
    return [
      { label: "Insights", href: "/insights" },
      { label: "Everest Wealth", href: "/everest-wealth" },
      { label: "Contact us", href: "/contact" },
    ];
  })();

  return (
    <>
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-samsung-blue/10">
        <ArrowRight className="h-7 w-7 text-samsung-blue" />
      </div>
      <h2 className={`${WARM_H3} mb-2`}>Here&apos;s where to go next</h2>
      <p className={`mb-6 text-sm ${WARM_BODY}`}>
        Based on your answers, we recommend the following. Share this page to keep your results.
      </p>

      {primaryRecommendation && (
        <div className="mb-6 rounded-xl border border-samsung-blue/25 bg-samsung-blue/5 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-samsung-blue">Top recommendation</p>
          <Link
            href={primaryRecommendation.href}
            prefetch={false}
            className="inline-flex items-center gap-2 font-semibold text-shark hover:text-samsung-blue"
          >
            {primaryRecommendation.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className={`mt-2 text-sm ${WARM_BODY}`}>{primaryRecommendation.description}</p>
        </div>
      )}

      <ul className="mb-8 space-y-3">
        {(primaryRecommendation ? fallbackLinks.filter((l) => l.href !== primaryRecommendation.href) : fallbackLinks)
          .slice(0, 4)
          .map(({ label, href }) => (
            <li key={href}>
              <Link href={href} prefetch={false} className={`inline-flex items-center gap-2 font-medium ${WARM_LINK}`}>
                {label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link href="/contact" prefetch={false} className={WARM_BTN_PRIMARY}>
          Get a personalised plan
        </Link>
        <Link href="/insights" prefetch={false} className={WARM_BTN_SECONDARY}>
          Read insights
        </Link>
      </div>
    </>
  );
}
