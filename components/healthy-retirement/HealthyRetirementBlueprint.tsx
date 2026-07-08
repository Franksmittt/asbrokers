"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
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
import {
  submitHealthyRetirementAssessment,
  type HealthyRetirementSubmitState,
} from "@/app/(content)/healthy-retirement-blueprint/actions";
import { GAP_EXPLANATION } from "@/lib/healthy-retirement/content";
import { HEALTH_QUESTIONS, type HealthyRetirementAnswers } from "@/lib/healthy-retirement/questions";
import { calculateHealthyRetirementScore, getBandColor, getScoreBand } from "@/lib/healthy-retirement/scoring";
import { PLANNING_TOOL_OFFERS } from "@/lib/planning-tools-offers";

type Phase = "landing" | "assessment" | "lead" | "results";

const OFFER = PLANNING_TOOL_OFFERS["healthy-retirement"];

const INITIAL_ANSWERS: HealthyRetirementAnswers = {
  age: "",
  exerciseDays: "",
  walk30Minutes: "",
  smoke: "",
  sleepHours: "",
  checkup12Months: "",
  knowBloodPressure: "",
  knowCholesterol: "",
  healthRating: "",
  retirement20Years: "",
};

const inputClass = funnelForm.input;
const labelClass = funnelForm.label;

const initialSubmitState: HealthyRetirementSubmitState = { success: false };

export function HealthyRetirementBlueprint() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("landing");
  const [questionStep, setQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<HealthyRetirementAnswers>(INITIAL_ANSWERS);
  const [error, setError] = useState<string | null>(null);
  const [submitState, formAction, isPending] = useActionState(
    submitHealthyRetirementAssessment,
    initialSubmitState
  );

  const previewScore = useMemo(() => {
    const complete = HEALTH_QUESTIONS.every((q) => answers[q.id]);
    if (!complete) return null;
    return calculateHealthyRetirementScore(answers as HealthyRetirementAnswers);
  }, [answers]);

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.3 },
      };

  const totalSteps = HEALTH_QUESTIONS.length + 1;
  const currentStep =
    phase === "landing"
      ? 0
      : phase === "assessment"
        ? questionStep + 1
        : phase === "lead"
          ? HEALTH_QUESTIONS.length
          : totalSteps;
  const progress = phase === "landing" ? 0 : (currentStep / totalSteps) * 100;

  const currentQuestion = HEALTH_QUESTIONS[questionStep];

  function startAssessment() {
    setPhase("assessment");
  }

  function selectAnswer(value: string) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setError(null);

    if (questionStep < HEALTH_QUESTIONS.length - 1) {
      setTimeout(() => setQuestionStep((s) => s + 1), reducedMotion ? 0 : 180);
    } else {
      setTimeout(() => setPhase("lead"), reducedMotion ? 0 : 220);
    }
  }

  function goBack() {
    setError(null);
    if (phase === "lead") {
      setPhase("assessment");
      setQuestionStep(HEALTH_QUESTIONS.length - 1);
      return;
    }
    if (phase === "assessment" && questionStep > 0) {
      setQuestionStep((s) => s - 1);
      return;
    }
    if (phase === "assessment" && questionStep === 0) {
      setPhase("landing");
    }
  }

  const displayScore = submitState.score ?? previewScore?.score;
  const displayGap = submitState.gap ?? previewScore?.gap;
  const displayBand = submitState.bandLabel ?? previewScore?.bandLabel;
  const bandColor =
    displayScore != null ? getBandColor(getScoreBand(displayScore).band) : "#00549F";

  useEffect(() => {
    if (submitState.success && submitState.score != null) {
      setPhase("results");
    }
  }, [submitState.success, submitState.score]);

  const captureCard = (
    <>
      <p className={funnel.eyebrow}>{OFFER.freeLabel}</p>
      <h2 className={`mt-2 ${funnel.h2}`}>Start your assessment</h2>
      <p className={`mt-2 ${funnel.body}`}>{OFFER.freeSummary}</p>
      <div className="mt-4">
        <FunnelObjectionStripCustom items={OFFER.objections} />
      </div>
      <button type="button" onClick={startAssessment} className={`mt-5 ${funnel.ctaLg}`}>
        Start free assessment
        <ArrowRight className="h-4 w-4" />
      </button>
      <FunnelAscensionHintCustom
        before="After your score: "
        label={OFFER.ascension.label}
        href={OFFER.ascension.href}
      />
    </>
  );

  return (
    <div className={funnel.page}>
      <div className={funnel.glow} aria-hidden />

      {phase === "landing" && (
        <FunnelMarketingPage
          offer={OFFER}
          heroImage="/images/home4-goal-retire-16x9.png"
          heroImageAlt="Healthy retirement planning — wellness and longevity"
          capture={captureCard}
          onScrollToCapture={startAssessment}
          primaryCtaLabel="Start free assessment"
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
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          }
        >
          <div id="health-tool" className={funnel.toolScrollMargin}>
            <AnimatePresence mode="wait">
              <motion.div key={`${phase}-${questionStep}`} {...motionProps}>
                {phase === "assessment" && currentQuestion && (
                  <div>
                    <p className={funnelForm.questionMeta}>
                      Question {questionStep + 1} of {HEALTH_QUESTIONS.length}
                    </p>
                    <h2 className={funnelForm.questionTitle}>{currentQuestion.question}</h2>
                    <div className="mt-6 grid gap-2.5">
                      {currentQuestion.options.map((opt) => {
                        const selected = answers[currentQuestion.id] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => selectAnswer(opt.value)}
                            className={`${funnelForm.option} ${
                              selected ? funnelForm.optionSelected : ""
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    {error && <p className={`mt-4 ${funnelForm.error}`}>{error}</p>}
                  </div>
                )}

                {phase === "lead" && (
                  <div>
                    <h2 className={funnelForm.questionTitle}>Where should we send your results?</h2>
                    <p className={`mt-2 ${funnel.body}`}>
                      Enter your details to unlock your Retirement Health Score™ and blueprint snapshot.
                    </p>

                    <form action={formAction} className="mt-6 space-y-4">
                      {HEALTH_QUESTIONS.map((q) => (
                        <input key={q.id} type="hidden" name={q.id} value={answers[q.id]} />
                      ))}
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                      <div>
                        <label className={labelClass} htmlFor="hrb-firstName">
                          First name *
                        </label>
                        <input
                          id="hrb-firstName"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          className={inputClass}
                          disabled={isPending}
                        />
                        {submitState.fieldErrors?.firstName?.[0] && (
                          <p className="mt-1 text-sm text-amber-800">{submitState.fieldErrors.firstName[0]}</p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="hrb-email">
                          Email address *
                        </label>
                        <input
                          id="hrb-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className={inputClass}
                          disabled={isPending}
                        />
                        {submitState.fieldErrors?.email?.[0] && (
                          <p className="mt-1 text-sm text-amber-800">{submitState.fieldErrors.email[0]}</p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="hrb-phone">
                          Mobile number <span className="text-stone-500">(optional)</span>
                        </label>
                        <input
                          id="hrb-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          className={inputClass}
                          disabled={isPending}
                        />
                      </div>

                      {submitState.message && !submitState.success && (
                        <p className="text-sm text-amber-800" role="alert">
                          {submitState.message}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isPending}
                        className={`${funnel.ctaLg} disabled:opacity-60`}
                      >
                        {isPending ? "Calculating…" : "See my results"}
                      </button>
                    </form>
                  </div>
                )}

                {phase === "results" && displayScore != null && (
                  <div className="text-center">
                    <p className={funnel.eyebrow}>Your results</p>
                    <h2 className={`mt-2 ${funnel.h2}`}>Retirement Health Score™</h2>
                    <p className="mt-5 text-5xl font-extrabold sm:text-6xl" style={{ color: bandColor }}>
                      {displayScore} <span className="text-2xl text-stone-500">/ 100</span>
                    </p>
                    {displayBand && <p className="mt-2 text-lg font-semibold text-stone-700">{displayBand}</p>}

                    <div className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-5 text-left">
                      <p className={funnel.h3}>Your Retirement Health Gap™</p>
                      <p className="mt-2 text-3xl font-bold text-samsung-blue">
                        {displayGap} <span className="text-base font-medium text-stone-500">points</span>
                      </p>
                      <p className={`mt-3 ${funnel.body}`}>{GAP_EXPLANATION}</p>
                    </div>

                    {submitState.reportId && (
                      <Link
                        href={`/healthy-retirement-blueprint/report/${submitState.reportId}${submitState.reportId !== "preview" ? "?print=1" : ""}`}
                        className={`mt-6 inline-flex ${funnel.ctaLg}`}
                      >
                        Open my blueprint
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}

                    <FunnelAscensionHintCustom
                      before="Want the full guide (R299 coming soon)? "
                      label={OFFER.ascension.label}
                      href={OFFER.ascension.href}
                      after=""
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {phase !== "results" && (
              <button type="button" onClick={goBack} className="mt-6 text-sm text-stone-500 hover:text-[#1D1D1F]">
                ← Back
              </button>
            )}
          </div>
        </FunnelToolShell>
      )}

      <Footer />
    </div>
  );
}
