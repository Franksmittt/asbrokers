"use client";

import Link from "next/link";
import { useActionState } from "react";

import { submitLegacyBlueprintLead } from "@/app/actions/legacy-blueprint";
import type { LegacyBlueprintActionState } from "@/lib/validations/schema";

const initialState: LegacyBlueprintActionState = { success: false };

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-amber-300 disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

const familyOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married or life partner" },
  { value: "children", label: "Children or dependants" },
  { value: "blended-family", label: "Blended family" },
  { value: "business-owner", label: "Business owner or trust involvement" },
];

const concernOptions = [
  { value: "will-outdated", label: "Will is outdated or unclear" },
  { value: "estate-duty", label: "Estate duty and executor costs" },
  { value: "liquidity", label: "Estate liquidity at death" },
  { value: "trusts", label: "Trust or asset protection questions" },
  { value: "beneficiaries", label: "Beneficiary nominations and family transfer" },
];

const readinessOptions = [
  { value: "no-plan", label: "No formal plan yet" },
  { value: "will-only", label: "I have a will only" },
  { value: "needs-review", label: "Plan exists but needs review" },
  { value: "complex-assets", label: "Complex assets, business, or trust structures" },
];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-amber-400">
      {message}
    </p>
  );
}

export function LegacyBlueprintForm() {
  const [state, formAction, isPending] = useActionState(submitLegacyBlueprintLead, initialState);

  if (state.success) {
    return (
      <div className="rounded-[2rem] border border-amber-300/25 bg-amber-300/10 p-6 text-center shadow-[0_0_60px_rgba(251,191,36,0.12)] md:p-8">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-300/15 text-amber-300">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white">Guide request received</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{state.message}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/blueprints/legacy-blueprint"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
          >
            Open the guide
          </Link>
          <Link
            href="/estate-duty-calculator"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Run estate calculator
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-[2rem] border border-amber-300/25 bg-white/[0.05] p-6 shadow-[0_0_60px_rgba(251,191,36,0.12)] backdrop-blur-xl md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Free guide</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Get the Legacy Conversations Guide</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Start the family wealth conversation with the right questions about wills, trusts, beneficiaries, liquidity, and estate duty.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="legacy-fullName" className={labelClass}>
            Full name *
          </label>
          <input
            id="legacy-fullName"
            name="fullName"
            type="text"
            className={inputClass}
            placeholder="Full name"
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.fullName}
            aria-describedby={state.fieldErrors?.fullName ? "legacy-fullName-error" : undefined}
          />
          <FieldError id="legacy-fullName-error" message={state.fieldErrors?.fullName?.[0]} />
        </div>

        <div>
          <label htmlFor="legacy-phone" className={labelClass}>
            Phone *
          </label>
          <input
            id="legacy-phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="Phone number"
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.phone}
            aria-describedby={state.fieldErrors?.phone ? "legacy-phone-error" : undefined}
          />
          <FieldError id="legacy-phone-error" message={state.fieldErrors?.phone?.[0]} />
        </div>
      </div>

      <div>
        <label htmlFor="legacy-email" className={labelClass}>
          Email *
        </label>
        <input
          id="legacy-email"
          name="email"
          type="email"
          className={inputClass}
          placeholder="Email address"
          disabled={isPending}
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "legacy-email-error" : undefined}
        />
        <FieldError id="legacy-email-error" message={state.fieldErrors?.email?.[0]} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="familySituation" className={labelClass}>
            Family situation *
          </label>
          <select
            id="familySituation"
            name="familySituation"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.familySituation}
            aria-describedby={state.fieldErrors?.familySituation ? "legacy-family-error" : undefined}
          >
            <option value="" disabled>
              Select
            </option>
            {familyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="legacy-family-error" message={state.fieldErrors?.familySituation?.[0]} />
        </div>

        <div>
          <label htmlFor="estateConcern" className={labelClass}>
            Main concern *
          </label>
          <select
            id="estateConcern"
            name="estateConcern"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.estateConcern}
            aria-describedby={state.fieldErrors?.estateConcern ? "legacy-concern-error" : undefined}
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
          <FieldError id="legacy-concern-error" message={state.fieldErrors?.estateConcern?.[0]} />
        </div>

        <div>
          <label htmlFor="estateReadiness" className={labelClass}>
            Readiness *
          </label>
          <select
            id="estateReadiness"
            name="estateReadiness"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.estateReadiness}
            aria-describedby={state.fieldErrors?.estateReadiness ? "legacy-readiness-error" : undefined}
          >
            <option value="" disabled>
              Select
            </option>
            {readinessOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="legacy-readiness-error" message={state.fieldErrors?.estateReadiness?.[0]} />
        </div>
      </div>

      <div className="absolute -left-[9999px] h-1 w-1 overflow-hidden" aria-hidden>
        <label htmlFor="legacy-website">Website</label>
        <input id="legacy-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs text-zinc-500">
          <input
            type="checkbox"
            name="consent"
            value="true"
            disabled={isPending}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500 disabled:opacity-60"
          />
          <span>
            I consent to AS Brokers contacting me about this guide request and related legacy planning education.
          </span>
        </label>
        <FieldError id="legacy-consent-error" message={state.fieldErrors?.consent?.[0]} />
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
        {isPending ? "Sending guide..." : "Send me the guide"}
      </button>
    </form>
  );
}
