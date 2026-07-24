"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { submitRetirementSurvivalBlueprint } from "@/app/(content)/retirement-survival-blueprint/actions";
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
  calculateBlueprintResults,
  formatBlueprintRand,
} from "@/lib/blueprint/calculations";
import { getBlueprintOptions } from "@/lib/blueprint/options";

type Phase = "landing" | "intro" | "step1" | "step2" | "step3" | "step4" | "step5" | "results";

const OFFER = PLANNING_TOOL_OFFERS["retirement-survival"];

type Answers = {
  currentAge: number;
  freedomAge: number;
  desiredMonthlyIncomeToday: number;
  lifeExpectancy: number;
  currentSavings: number;
  monthlySavings: number;
  investmentsOwned: string;
};

const INITIAL_ANSWERS: Answers = {
  currentAge: 50,
  freedomAge: 65,
  desiredMonthlyIncomeToday: 40_000,
  lifeExpectancy: 90,
  currentSavings: 0,
  monthlySavings: 3_000,
  investmentsOwned: "",
};

type ContactDetails = {
  firstName: string;
  email: string;
  phone: string;
};

const INITIAL_CONTACT: ContactDetails = {
  firstName: "",
  email: "",
  phone: "",
};

const PHASES: Phase[] = ["landing", "intro", "step1", "step2", "step3", "step4", "step5", "results"];

const inputClass = funnelForm.input;
const labelClass = funnelForm.label;

function CoachMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-cinematic-teal/20 bg-cinematic-teal/5 px-5 py-4 text-sm leading-relaxed text-stone-700">
      {children}
    </div>
  );
}

function MetricCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${highlight ? "border-[#00549F]/50 bg-[#00549F]/10" : "border-stone-200 bg-stone-50"}`}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-stone-500">{label}</p>
      <p className={`mt-2 font-bold ${highlight ? "text-3xl text-samsung-blue sm:text-4xl" : "text-xl text-[#1D1D1F]"}`}>
        {value}
      </p>
    </div>
  );
}

export function RetirementSurvivalBlueprint() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("landing");
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [contact, setContact] = useState<ContactDetails>(INITIAL_CONTACT);
  const [error, setError] = useState<string | null>(null);
  const [savedToCrm, setSavedToCrm] = useState(false);
  const [pending, startTransition] = useTransition();

  const results = useMemo(() => {
    return calculateBlueprintResults({
      currentAge: answers.currentAge,
      freedomAge: answers.freedomAge,
      desiredMonthlyIncomeToday: answers.desiredMonthlyIncomeToday,
      lifeExpectancy: answers.lifeExpectancy,
      currentSavings: answers.currentSavings,
      monthlySavings: answers.monthlySavings,
    });
  }, [answers]);

  const options = useMemo(() => {
    if ("error" in results) return [];
    return getBlueprintOptions(results.freedomRatePercent, results.financialFreedomGap);
  }, [results]);

  const phaseIndex = PHASES.indexOf(phase);
  const progress = phase === "landing" ? 0 : ((phaseIndex) / (PHASES.length - 1)) * 100;

  function startBlueprint() {
    setPhase("intro");
  }

  function patchAnswers(patch: Partial<Answers>) {
    setAnswers((prev) => ({ ...prev, ...patch }));
    setError(null);
  }

  function patchContact(patch: Partial<ContactDetails>) {
    setContact((prev) => ({ ...prev, ...patch }));
    setError(null);
  }

  function submitBlueprintToCrm(onSuccess: () => void) {
    if ("error" in results) {
      setError(results.error);
      return;
    }

    if (!contact.firstName.trim() || !contact.email.trim()) {
      setError("Please enter your name and email before viewing your results.");
      setPhase("intro");
      return;
    }

    const fd = new FormData();
    fd.set("firstName", contact.firstName.trim());
    fd.set("email", contact.email.trim());
    fd.set("phone", contact.phone.trim());
    fd.set("currentAge", String(answers.currentAge));
    fd.set("freedomAge", String(answers.freedomAge));
    fd.set("desiredMonthlyIncomeToday", String(answers.desiredMonthlyIncomeToday));
    fd.set("lifeExpectancy", String(answers.lifeExpectancy));
    fd.set("currentSavings", String(answers.currentSavings));
    fd.set("monthlySavings", String(answers.monthlySavings));
    fd.set("investmentsOwned", answers.investmentsOwned);
    fd.set("financialFreedomScore", String(results.financialFreedomScore));
    fd.set("financialFreedomGap", String(results.financialFreedomGap));
    fd.set("freedomRatePercent", String(results.freedomRatePercent));
    fd.set("capitalRequired", String(results.capitalRequired));
    fd.set("projectedCapital", String(results.projectedCapital));
    fd.set("yearsToFreedom", String(results.yearsToFreedom));
    fd.set("onTrack", results.onTrack ? "true" : "false");

    startTransition(async () => {
      const state = await submitRetirementSurvivalBlueprint({ success: false }, fd);
      if (!state.success) {
        setError(state.message ?? "Could not save your blueprint. Please try again.");
        return;
      }
      setSavedToCrm(true);
      onSuccess();
    });
  }

  function goNext() {
    if (phase === "intro") {
      if (!contact.firstName.trim()) {
        setError("Please enter your first name.");
        return;
      }
      if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
        setError("Please enter a valid email address.");
        return;
      }
      setPhase("step1");
      return;
    }

    if (phase === "step1") {
      const partial = calculateBlueprintResults({
        currentAge: answers.currentAge,
        freedomAge: answers.freedomAge,
        desiredMonthlyIncomeToday: answers.desiredMonthlyIncomeToday,
        lifeExpectancy: answers.lifeExpectancy,
        currentSavings: 0,
        monthlySavings: 0,
      });
      if ("error" in partial) {
        setError(partial.error);
        return;
      }
      setPhase("step2");
      return;
    }

    if (phase === "step3") {
      if ("error" in results) {
        setError(results.error);
        return;
      }
      setPhase("step4");
      return;
    }

    if (phase === "step5") {
      submitBlueprintToCrm(() => setPhase("results"));
      return;
    }

    const nextIndex = phaseIndex + 1;
    if (nextIndex < PHASES.length) {
      setPhase(PHASES[nextIndex]);
    }
  }

  function goBack() {
    if (phaseIndex > 1) setPhase(PHASES[phaseIndex - 1]);
    else if (phase === "intro") setPhase("landing");
  }

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.35 },
      };

  const readyResults = !("error" in results) ? results : null;

  const captureCard = (
    <>
      <p className={funnel.eyebrow}>{OFFER.freeLabel}</p>
      <h2 className={`mt-2 ${funnel.h2}`}>Start your Blueprint</h2>
      <p className={`mt-2 ${funnel.body}`}>{OFFER.freeSummary}</p>
      <div className="mt-4">
        <FunnelObjectionStripCustom items={OFFER.objections} />
      </div>
      <button type="button" onClick={startBlueprint} className={`mt-5 ${funnel.ctaLg}`}>
        Start free diagnostic
        <ArrowRight className="h-4 w-4" />
      </button>
      <FunnelAscensionHintCustom
        before="After your scores: "
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
          heroImage="/images/home4-goal-retire-16x9.jpg"
          heroImageAlt="Retirement survival planning, will your money last?"
          capture={captureCard}
          onScrollToCapture={startBlueprint}
          primaryCtaLabel="Start free diagnostic"
        />
      )}

      {phase !== "landing" && (
        <FunnelToolShell
          offer={OFFER}
          compactHeader={
            <div className="mb-4">
              <p className={funnel.eyebrow}>{OFFER.title}</p>
              <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                <span>Your journey</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className={funnelForm.progressTrack}>
                <div className={funnelForm.progressFill} style={{ width: `${progress}%` }} />
              </div>
            </div>
          }
        >
          <div id="blueprint-tool" className={funnel.toolScrollMargin}>
            <AnimatePresence mode="wait">
              <motion.div key={phase} {...motionProps}>
                {phase === "intro" && (
                  <div className="space-y-6">
                    <CoachMessage>
                      <p className="mb-3 font-semibold text-[#1D1D1F]">There is something most retirement tools skip.</p>
                      <p>
                        They spit out a number, &quot;You need R15 million&quot;, and leave you with anxiety, not
                        understanding. This Blueprint is different. It is a conversation that creates clarity.
                      </p>
                    </CoachMessage>
                    <p className="text-sm text-stone-500">
                      This is educational only. It does not constitute financial advice. You will see your Financial
                      Freedom Score™, Gap™, and AS Brokers Freedom Rate™ at the end.
                    </p>
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 space-y-4">
                      <p className="text-sm font-medium text-[#1D1D1F]">Your details</p>
                      <p className="text-xs text-stone-500">
                        So we can save your blueprint and follow up if you would like a clarity conversation.
                      </p>
                      <div>
                        <label className={labelClass} htmlFor="bp-first-name">
                          First name
                        </label>
                        <input
                          id="bp-first-name"
                          type="text"
                          autoComplete="given-name"
                          value={contact.firstName}
                          onChange={(e) => patchContact({ firstName: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="bp-email">
                          Email address
                        </label>
                        <input
                          id="bp-email"
                          type="email"
                          autoComplete="email"
                          value={contact.email}
                          onChange={(e) => patchContact({ email: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="bp-phone">
                          Mobile number (optional)
                        </label>
                        <input
                          id="bp-phone"
                          type="tel"
                          autoComplete="tel"
                          value={contact.phone}
                          onChange={(e) => patchContact({ phone: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {phase === "step1" && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cinematic-teal">Step 1</p>
                      <h2 className="mt-1 text-2xl font-bold text-[#1D1D1F]">What do I want?</h2>
                      <p className="mt-2 text-sm text-stone-600">Let&apos;s define your destination first.</p>
                    </div>
                    <CoachMessage>
                      Before we talk numbers, tell me about the life you are planning toward, in today&apos;s money.
                    </CoachMessage>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="bp-current-age">
                          How old are you?
                        </label>
                        <input
                          id="bp-current-age"
                          type="number"
                          value={answers.currentAge}
                          onChange={(e) => patchAnswers({ currentAge: Number(e.target.value) || 0 })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="bp-freedom-age">
                          When should work become optional?
                        </label>
                        <input
                          id="bp-freedom-age"
                          type="number"
                          value={answers.freedomAge}
                          onChange={(e) => patchAnswers({ freedomAge: Number(e.target.value) || 0 })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="bp-income">
                        Desired monthly income if you were financially free today
                      </label>
                      <input
                        id="bp-income"
                        type="number"
                        step={500}
                        value={answers.desiredMonthlyIncomeToday}
                        onChange={(e) => patchAnswers({ desiredMonthlyIncomeToday: Number(e.target.value) || 0 })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="bp-life">
                        How long do you expect to live?
                      </label>
                      <input
                        id="bp-life"
                        type="number"
                        value={answers.lifeExpectancy}
                        onChange={(e) => patchAnswers({ lifeExpectancy: Number(e.target.value) || 0 })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                {phase === "step2" && readyResults && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cinematic-teal">Step 2</p>
                      <h2 className="mt-1 text-2xl font-bold text-[#1D1D1F]">What will it cost?</h2>
                    </div>
                      <CoachMessage>
                        <p>
                          You have <strong>{readyResults.yearsToFreedom} years</strong> until work becomes optional at age{" "}
                          <strong>{answers.freedomAge}</strong>.
                        </p>
                        <p className="mt-3">
                          {formatBlueprintRand(answers.desiredMonthlyIncomeToday)} per month in today&apos;s buying power
                          could mean about <strong>{formatBlueprintRand(readyResults.futureMonthlyIncome)}</strong> per
                          month by then, after inflation (assumed 6% p.a. for illustration only).
                        </p>
                        <p className="mt-3">
                          Using a 5% illustrative income yield, that lifestyle may require approximately:
                        </p>
                      </CoachMessage>
                    <MetricCard
                      label="Required Financial Freedom Capital"
                      value={formatBlueprintRand(readyResults.capitalRequired)}
                      highlight
                    />
                  </div>
                )}

                {phase === "step3" && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cinematic-teal">Step 3</p>
                      <h2 className="mt-1 text-2xl font-bold text-[#1D1D1F]">What is my gap?</h2>
                    </div>
                    <CoachMessage>
                      Now let&apos;s look at where you are today, what you have built and what you are putting aside
                      each month.
                    </CoachMessage>
                    <div>
                      <label className={labelClass} htmlFor="bp-savings">
                        How much have you already accumulated?
                      </label>
                      <input
                        id="bp-savings"
                        type="number"
                        step={1000}
                        value={answers.currentSavings}
                        onChange={(e) => patchAnswers({ currentSavings: Number(e.target.value) || 0 })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="bp-monthly">
                        How much do you save monthly?
                      </label>
                      <input
                        id="bp-monthly"
                        type="number"
                        step={500}
                        value={answers.monthlySavings}
                        onChange={(e) => patchAnswers({ monthlySavings: Number(e.target.value) || 0 })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="bp-investments">
                        What investments do you currently own? (optional)
                      </label>
                      <textarea
                        id="bp-investments"
                        rows={3}
                        value={answers.investmentsOwned}
                        onChange={(e) => patchAnswers({ investmentsOwned: e.target.value })}
                        placeholder="e.g. RA, unit trusts, property equity, business interest…"
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                {phase === "step4" && readyResults && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cinematic-teal">Step 4</p>
                      <h2 className="mt-1 text-2xl font-bold text-[#1D1D1F]">What must change?</h2>
                    </div>
                    <CoachMessage>
                      <p>
                        On your current path, assuming 10% annual growth on existing and future savings
                        (illustrative; actual returns vary), you are projected to reach about{" "}
                        <strong>{formatBlueprintRand(readyResults.projectedCapital)}</strong> by age {answers.freedomAge}.
                      </p>
                      <p className="mt-3">
                        Your Financial Freedom Gap™ is{" "}
                        <strong>
                          {readyResults.onTrack
                            ? "closed, you are on track for your stated target"
                            : formatBlueprintRand(readyResults.financialFreedomGap)}
                        </strong>
                        .
                      </p>
                      <p className="mt-3">
                        To close the gap from here, the annual rate of progress required is your AS Brokers Freedom
                        Rate™. This measures the gap, it is not a recommended investment return.
                      </p>
                    </CoachMessage>
                    <MetricCard
                      label="AS Brokers Freedom Rate™"
                      value={`${readyResults.freedomRatePercent.toFixed(2)}% p.a.`}
                      highlight
                    />
                  </div>
                )}

                {phase === "step5" && readyResults && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cinematic-teal">Step 5</p>
                      <h2 className="mt-1 text-2xl font-bold text-[#1D1D1F]">What are my options?</h2>
                    </div>
                    <CoachMessage>
                      Awareness is only the first step. Most people close a gap through several levers, not one magic
                      fix. Here are practical directions to explore.
                    </CoachMessage>
                    <ul className="space-y-3">
                      {options.map((option) => (
                        <li
                          key={option.id}
                          className={`rounded-2xl border p-4 ${
                            option.relevant
                              ? "border-cinematic-teal/30 bg-cinematic-teal/5"
                              : "border-stone-200 bg-stone-50 opacity-80"
                          }`}
                        >
                          <p className="font-semibold text-[#1D1D1F]">{option.title}</p>
                          <p className="mt-1 text-sm text-stone-600">{option.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {phase === "results" && readyResults && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cinematic-teal">Your Blueprint</p>
                      <h2 className="mt-1 text-2xl font-bold text-[#1D1D1F]">Your retirement survival picture</h2>
                    </div>
                    <CoachMessage>
                      <p>
                        You asked: <em>Am I going to be okay financially?</em> Here is your illustrative retirement
                        picture, three numbers that help show where you are and what progress may require.
                      </p>
                    </CoachMessage>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <MetricCard
                        label="Financial Freedom Score™"
                        value={`${readyResults.financialFreedomScore} / 100`}
                        highlight
                      />
                      <MetricCard
                        label="Financial Freedom Gap™"
                        value={
                          readyResults.onTrack
                            ? "On track"
                            : formatBlueprintRand(readyResults.financialFreedomGap)
                        }
                      />
                      <MetricCard
                        label="AS Brokers Freedom Rate™"
                        value={`${readyResults.freedomRatePercent.toFixed(2)}%`}
                      />
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm leading-relaxed text-stone-600">
                      <p>
                        Target capital: <strong>{formatBlueprintRand(readyResults.capitalRequired)}</strong> · Projected
                        at current pace: <strong>{formatBlueprintRand(readyResults.projectedCapital)}</strong> ·{" "}
                        {readyResults.yearsToFreedom} years to financial freedom.
                      </p>
                      {readyResults.freedomRatePercent > 15 && (
                        <p className="mt-3 text-amber-200/90">
                          Your current plan requires significant growth to reach your target. This result is not a
                          recommended investment return and is not linked to any product. It indicates the size of the
                          gap between your current position and your desired outcome.
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-black hover:bg-zinc-200"
                      >
                        Book a clarity conversation
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/calculators"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-medium text-stone-600 hover:bg-white/5"
                      >
                        Explore calculators
                      </Link>
                    </div>
                    {savedToCrm ? (
                      <p className="text-xs text-stone-600">
                        Your blueprint is saved. We can reference these numbers in a clarity conversation.
                      </p>
                    ) : null}
                  </div>
                )}

                {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
              </motion.div>
            </AnimatePresence>

            {phase !== "results" && (
              <div className="mt-6 flex flex-wrap gap-3">
                {phaseIndex > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-stone-600 hover:bg-white/5"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={goNext}
                  disabled={pending}
                  className="rounded-xl bg-[#00549F] px-6 py-3 text-sm font-bold text-white hover:brightness-110 disabled:opacity-60"
                >
                  {pending
                    ? "Saving…"
                    : phase === "intro"
                      ? "Start my Blueprint"
                      : phase === "step5"
                        ? "View my results"
                        : "Continue"}
                </button>
              </div>
            )}
          </div>
        </FunnelToolShell>
      )}

      <p className={`${funnel.shell} pb-6 text-center ${funnel.meta}`}>
        This tool produces illustrative estimates only and constitutes factual information under Section&nbsp;1(3)(a)
        of the FAIS Act, 37 of 2002. It does not constitute financial advice or a product recommendation.
        AS Brokers CC · FSP 17273.
      </p>
      <Footer />
    </div>
  );
}
