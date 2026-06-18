"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/icons";
import {
  submitHealthyRetirementAssessment,
  type HealthyRetirementSubmitState,
} from "@/app/(content)/healthy-retirement-blueprint/actions";
import { GAP_EXPLANATION } from "@/lib/healthy-retirement/content";
import { HEALTH_QUESTIONS, type HealthyRetirementAnswers } from "@/lib/healthy-retirement/questions";
import { calculateHealthyRetirementScore, getBandColor, getScoreBand } from "@/lib/healthy-retirement/scoring";

type Phase = "intro" | "assessment" | "lead" | "results";

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

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder:text-zinc-600 focus:border-[#00549F]/50 focus:outline-none focus:ring-2 focus:ring-[#00549F]/25 disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

const initialSubmitState: HealthyRetirementSubmitState = { success: false };

export function HealthyRetirementBlueprint() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
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

  const totalSteps = HEALTH_QUESTIONS.length + 2;
  const currentStep =
    phase === "intro"
      ? 0
      : phase === "assessment"
        ? questionStep + 1
        : phase === "lead"
          ? HEALTH_QUESTIONS.length + 1
          : totalSteps;
  const progress = (currentStep / totalSteps) * 100;

  const currentQuestion = HEALTH_QUESTIONS[questionStep];

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
      setPhase("intro");
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

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <section className="relative overflow-hidden px-4 pb-8 pt-28 sm:px-6 md:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0,84,159,0.4), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#00549F]">
            Healthy Retirement Blueprint™
          </p>
          {phase === "intro" ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                How healthy is your retirement?
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Most people spend years planning their money and almost no time planning their health.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
                Complete this 2-minute assessment to discover your Retirement Health Gap™ and receive your free
                Healthy Retirement Blueprint™.
              </p>
              <button
                type="button"
                onClick={() => setPhase("assessment")}
                className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-[#00549F] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#0066b8]"
              >
                Start my assessment
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <h1 className="text-xl font-bold text-white sm:text-2xl">Retirement Health Gap™ Assessment</h1>
          )}
        </div>
      </section>

      {phase !== "intro" && (
        <div className="mx-auto mb-6 h-1 max-w-3xl overflow-hidden rounded-full bg-white/10 px-4 sm:px-0">
          <div
            className="h-full rounded-full bg-[#00549F] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <section className="px-4 pb-24 sm:px-6 md:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={`${phase}-${questionStep}`} {...motionProps}>
                {phase === "assessment" && currentQuestion && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Question {questionStep + 1} of {HEALTH_QUESTIONS.length}
                    </p>
                    <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">{currentQuestion.question}</h2>
                    <div className="mt-8 grid gap-3">
                      {currentQuestion.options.map((opt) => {
                        const selected = answers[currentQuestion.id] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => selectAnswer(opt.value)}
                            className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition sm:text-base ${
                              selected
                                ? "border-[#00549F] bg-[#00549F]/15 text-white"
                                : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07]"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    {error && <p className="mt-4 text-sm text-amber-400">{error}</p>}
                  </div>
                )}

                {phase === "lead" && (
                  <div>
                    <h2 className="text-xl font-bold text-white sm:text-2xl">Almost done — where should we send your blueprint?</h2>
                    <p className="mt-3 text-sm text-zinc-400">
                      Enter your details to see your Retirement Health Score™ and receive your full Healthy Retirement
                      Blueprint™.
                    </p>

                    <form action={formAction} className="mt-8 space-y-4">
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
                          <p className="mt-1 text-sm text-amber-400">{submitState.fieldErrors.firstName[0]}</p>
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
                          <p className="mt-1 text-sm text-amber-400">{submitState.fieldErrors.email[0]}</p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="hrb-phone">
                          Mobile number <span className="text-zinc-500">(optional)</span>
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
                        <p className="text-sm text-amber-400" role="alert">
                          {submitState.message}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full rounded-2xl bg-[#00549F] px-6 py-4 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-60 sm:w-auto"
                      >
                        {isPending ? "Calculating…" : "See my results"}
                      </button>
                    </form>

                    <p className="mt-4 text-xs text-zinc-500">
                      Educational only — not medical diagnosis. FSP 17273.
                    </p>
                  </div>
                )}

                {phase === "results" && displayScore != null && (
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#00549F]">Your results</p>
                    <h2 className="mt-3 text-2xl font-bold text-white">Retirement Health Score™</h2>
                    <p className="mt-6 text-5xl font-extrabold sm:text-6xl" style={{ color: bandColor }}>
                      {displayScore} <span className="text-2xl text-zinc-500">/ 100</span>
                    </p>
                    {displayBand && (
                      <p className="mt-2 text-lg font-semibold text-zinc-300">{displayBand}</p>
                    )}

                    <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Your Retirement Health Gap™
                      </p>
                      <p className="mt-2 text-3xl font-bold text-[#00549F]">
                        {displayGap} <span className="text-base font-medium text-zinc-500">points</span>
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-400">{GAP_EXPLANATION}</p>
                    </div>

                    {submitState.reportId && (
                      <Link
                        href={`/healthy-retirement-blueprint/report/${submitState.reportId}${submitState.reportId !== "preview" ? "?print=1" : ""}`}
                        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#00549F] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#0066b8]"
                      >
                        Open my blueprint
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}

                    <p className="mt-6 text-xs text-zinc-500">
                      Your full Healthy Retirement Blueprint™ includes the framework, risks, VO₂ max guide, 104 Week
                      Watch Challenge intro, and 90-day action plan.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {phase !== "intro" && phase !== "results" && (
              <button
                type="button"
                onClick={goBack}
                className="mt-8 text-sm text-zinc-500 hover:text-white"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
