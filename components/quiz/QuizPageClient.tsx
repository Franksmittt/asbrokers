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

const QUIZ_DISCLAIMER =
  "This quiz provides general informational routing only and constitutes factual information as contemplated in Section 1(3)(a) of the FAIS Act, 37 of 2002. It does not assess your circumstances, recommend any financial product, or constitute personal financial advice. Personal advice requires a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).";

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
        <aside
          className="mb-4 rounded-2xl border border-amber-200/90 bg-amber-50 px-4 py-4"
          role="note"
          aria-label="Quiz information disclaimer"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-900">
            Educational routing only
          </p>
          <p className="mt-2 text-sm leading-relaxed text-amber-950/90">{QUIZ_DISCLAIMER}</p>
        </aside>
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
                <p className="mb-6 text-sm text-stone-500">
                  Choose one topic so we can point you to educational resources.
                </p>
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
                <p className="mb-6 text-sm text-stone-500">
                  This helps us point you to relevant educational topics.
                </p>
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
                  Used only to route you to educational pages. It does not select or recommend a
                  product.
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
                  slugToConcern={SLUG_TO_CONCERN}
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
  slugToConcern: Record<string, PrimaryConcern>;
};

/** Educational routing only. No product recommendations or suitability scores. */
function educationalLinksForConcern(concern: PrimaryConcern | null) {
  if (concern === "Business Risk") {
    return [
      { label: "Insurance hub", href: "/insurance" },
      { label: "Business risk review", href: "/business-risk-review" },
      { label: "Insights library", href: "/insights" },
      { label: "Request a needs analysis", href: "/contact?source=quiz_business" },
    ];
  }
  if (concern === "Retirement Shortfall") {
    return [
      { label: "Retirement planning hub", href: "/retirement-planning" },
      {
        label: "Retirement Reality Check calculator",
        href: "/calculators/asset-002-retirement-reality-check",
      },
      { label: "Educational calculators", href: "/calculators" },
      { label: "Request a needs analysis", href: "/contact?source=quiz_retirement" },
    ];
  }
  if (concern === "Estate Taxes") {
    return [
      { label: "Estate planning hub", href: "/estate-planning" },
      { label: "Educational calculators", href: "/calculators" },
      { label: "Insights library", href: "/insights" },
      { label: "Request a needs analysis", href: "/contact?source=quiz_estate" },
    ];
  }
  if (concern === "Low Investment Yields") {
    return [
      { label: "Investments hub", href: "/investments" },
      { label: "Educational calculators", href: "/calculators" },
      { label: "Retirement planning hub", href: "/retirement-planning" },
      { label: "Request a needs analysis", href: "/contact?source=quiz_investments" },
    ];
  }
  return [
    { label: "Educational calculators", href: "/calculators" },
    { label: "Insights library", href: "/insights" },
    { label: "Request a needs analysis", href: "/contact?source=quiz_general" },
  ];
}

function QuizResults({ concernSlug, slugToConcern }: QuizResultsProps) {
  const concern = concernSlug ? slugToConcern[concernSlug] : null;
  const links = educationalLinksForConcern(concern);

  return (
    <>
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-samsung-blue/10">
        <ArrowRight className="h-7 w-7 text-samsung-blue" />
      </div>
      <h2 className={`${WARM_H3} mb-2`}>Educational next steps</h2>
      <p className={`mb-6 text-sm ${WARM_BODY}`}>
        Based on the topic you selected, here are educational pages you can review. This is not a
        product recommendation or a suitability assessment.
      </p>

      <ul className="mb-8 space-y-3">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} prefetch={false} className={`inline-flex items-center gap-2 font-medium ${WARM_LINK}`}>
              {label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </li>
        ))}
      </ul>

      <p className={`mb-6 text-xs leading-relaxed ${WARM_BODY}`}>{QUIZ_DISCLAIMER}</p>

      <div className="flex flex-wrap gap-3">
        <Link href="/contact?source=quiz_terminal" prefetch={false} className={WARM_BTN_PRIMARY}>
          Request a needs analysis
        </Link>
        <Link href="/insights" prefetch={false} className={WARM_BTN_SECONDARY}>
          Read insights
        </Link>
      </div>
    </>
  );
}
