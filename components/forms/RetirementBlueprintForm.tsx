"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  submitRetirementBlueprintLead,
} from "@/app/actions/retirement-blueprint";
import type { RetirementBlueprintActionState } from "@/lib/validations/schema";

const initialState: RetirementBlueprintActionState = { success: false };

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-cinematic-teal disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

const timelineOptions = [
  { value: "already-retired", label: "Already retired" },
  { value: "within-5-years", label: "Retiring within 5 years" },
  { value: "5-to-10-years", label: "Retiring in 5 to 10 years" },
  { value: "10-plus-years", label: "More than 10 years away" },
];

const concernOptions = [
  { value: "capital-run-out", label: "Running out of capital" },
  { value: "inflation", label: "Inflation eroding income" },
  { value: "drawdown-rate", label: "Drawing too much income" },
  { value: "investment-structure", label: "Current investments are not structured for income" },
  { value: "living-annuity", label: "Living annuity or retirement income review" },
];

const capitalOptions = [
  { value: "under-500k", label: "Under R500k" },
  { value: "500k-1m", label: "R500k to R1m" },
  { value: "1m-5m", label: "R1m to R5m" },
  { value: "5m-plus", label: "R5m+" },
];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-amber-400">
      {message}
    </p>
  );
}

export function RetirementBlueprintForm() {
  const [state, formAction, isPending] = useActionState(submitRetirementBlueprintLead, initialState);

  if (state.success) {
    return (
      <div className="rounded-[2rem] border border-cinematic-teal/25 bg-cinematic-teal/10 p-6 text-center shadow-[0_0_60px_rgba(45,212,191,0.12)] md:p-8">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cinematic-teal/15 text-cinematic-teal">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white">Blueprint request received</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{state.message}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/blueprints/retirement-survival-blueprint"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
          >
            Open the blueprint
          </Link>
          <Link
            href="/contact"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Book a review
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-[2rem] border border-blue-400/25 bg-white/[0.05] p-6 shadow-[0_0_60px_rgba(96,165,250,0.12)] backdrop-blur-xl md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Free guide</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Get the Retirement Survival Blueprint</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Tell us where you are in the retirement journey and we will send the blueprint while tagging your enquiry for the right follow-up.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className={inputClass}
            placeholder="Full name"
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.fullName}
            aria-describedby={state.fieldErrors?.fullName ? "retirement-fullName-error" : undefined}
          />
          <FieldError id="retirement-fullName-error" message={state.fieldErrors?.fullName?.[0]} />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="Phone number"
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.phone}
            aria-describedby={state.fieldErrors?.phone ? "retirement-phone-error" : undefined}
          />
          <FieldError id="retirement-phone-error" message={state.fieldErrors?.phone?.[0]} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={inputClass}
          placeholder="Email address"
          disabled={isPending}
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "retirement-email-error" : undefined}
        />
        <FieldError id="retirement-email-error" message={state.fieldErrors?.email?.[0]} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="retirementTimeline" className={labelClass}>
            Timeline *
          </label>
          <select
            id="retirementTimeline"
            name="retirementTimeline"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.retirementTimeline}
            aria-describedby={state.fieldErrors?.retirementTimeline ? "retirement-timeline-error" : undefined}
          >
            <option value="" disabled>
              Select
            </option>
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="retirement-timeline-error" message={state.fieldErrors?.retirementTimeline?.[0]} />
        </div>

        <div>
          <label htmlFor="currentConcern" className={labelClass}>
            Main concern *
          </label>
          <select
            id="currentConcern"
            name="currentConcern"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.currentConcern}
            aria-describedby={state.fieldErrors?.currentConcern ? "retirement-concern-error" : undefined}
          >
            <option value="" disabled>
              Select
            </option>
            {concernOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="retirement-concern-error" message={state.fieldErrors?.currentConcern?.[0]} />
        </div>

        <div>
          <label htmlFor="capitalRange" className={labelClass}>
            Capital range *
          </label>
          <select
            id="capitalRange"
            name="capitalRange"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.capitalRange}
            aria-describedby={state.fieldErrors?.capitalRange ? "retirement-capital-error" : undefined}
          >
            <option value="" disabled>
              Select
            </option>
            {capitalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="retirement-capital-error" message={state.fieldErrors?.capitalRange?.[0]} />
        </div>
      </div>

      <div className="absolute -left-[9999px] h-1 w-1 overflow-hidden" aria-hidden>
        <label htmlFor="retirement-website">Website</label>
        <input id="retirement-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs text-zinc-500">
          <input
            type="checkbox"
            name="consent"
            value="true"
            disabled={isPending}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 disabled:opacity-60"
          />
          <span>
            I consent to AS Brokers contacting me about this blueprint request and related retirement planning education.
          </span>
        </label>
        <FieldError id="retirement-consent-error" message={state.fieldErrors?.consent?.[0]} />
      </div>

      {state.message && !state.success ? (
        <p className="text-sm text-amber-400" role="alert">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-white px-5 py-4 text-sm font-bold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending blueprint..." : "Send me the blueprint"}
      </button>
    </form>
  );
}
