"use client";

import Link from "next/link";
import { useActionState } from "react";

import { submitBusinessBlueprintLead } from "@/app/actions/business-blueprint";
import type { BusinessBlueprintActionState } from "@/lib/validations/schema";

const initialState: BusinessBlueprintActionState = { success: false };

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-rose-300 disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

const stageOptions = [
  { value: "owner-managed", label: "Owner-managed business" },
  { value: "growing-team", label: "Growing team or multiple branches" },
  { value: "partnership", label: "Partners or shareholders" },
  { value: "asset-heavy", label: "Asset, stock, or machinery heavy" },
  { value: "professional-services", label: "Professional services or advice business" },
];

const riskOptions = [
  { value: "fire-theft-damage", label: "Fire, theft, property, or stock loss" },
  { value: "business-interruption", label: "Business interruption or revenue stoppage" },
  { value: "key-person", label: "Key person or owner dependency" },
  { value: "liability", label: "Liability, contracts, or professional risk" },
  { value: "succession", label: "Buy-and-sell, succession, or shareholder risk" },
  { value: "cyber", label: "Cyber, data, or operational systems risk" },
];

const readinessOptions = [
  { value: "not-sure", label: "Not sure what is covered" },
  { value: "policy-exists", label: "Policy exists but has not been reviewed recently" },
  { value: "no-continuity-plan", label: "No continuity or succession plan" },
  { value: "needs-board-review", label: "Needs a board/partner risk review" },
];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-amber-400">
      {message}
    </p>
  );
}

export function BusinessBlueprintForm() {
  const [state, formAction, isPending] = useActionState(submitBusinessBlueprintLead, initialState);

  if (state.success) {
    return (
      <div className="rounded-[2rem] border border-rose-300/25 bg-rose-300/10 p-6 text-center shadow-[0_0_60px_rgba(251,113,133,0.12)] md:p-8">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-300/15 text-rose-300">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white">Workbook request received</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{state.message}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/blueprints/business-survival-blueprint"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
          >
            Open the workbook
          </Link>
          <Link
            href="/solutions/business-insurance"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Review commercial cover
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-[2rem] border border-rose-300/25 bg-white/[0.05] p-6 shadow-[0_0_60px_rgba(251,113,133,0.12)] backdrop-blur-xl md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">Free workbook</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Get the Business Survival Blueprint</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Identify the risks that could interrupt, damage, or destroy the business before they become a claim, dispute, or cash-flow crisis.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="business-fullName" className={labelClass}>
            Full name *
          </label>
          <input
            id="business-fullName"
            name="fullName"
            type="text"
            className={inputClass}
            placeholder="Full name"
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.fullName}
            aria-describedby={state.fieldErrors?.fullName ? "business-fullName-error" : undefined}
          />
          <FieldError id="business-fullName-error" message={state.fieldErrors?.fullName?.[0]} />
        </div>

        <div>
          <label htmlFor="business-phone" className={labelClass}>
            Phone *
          </label>
          <input
            id="business-phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="Phone number"
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.phone}
            aria-describedby={state.fieldErrors?.phone ? "business-phone-error" : undefined}
          />
          <FieldError id="business-phone-error" message={state.fieldErrors?.phone?.[0]} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="business-email" className={labelClass}>
            Email *
          </label>
          <input
            id="business-email"
            name="email"
            type="email"
            className={inputClass}
            placeholder="Email address"
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.email}
            aria-describedby={state.fieldErrors?.email ? "business-email-error" : undefined}
          />
          <FieldError id="business-email-error" message={state.fieldErrors?.email?.[0]} />
        </div>

        <div>
          <label htmlFor="businessName" className={labelClass}>
            Business name *
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            className={inputClass}
            placeholder="Business name"
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.businessName}
            aria-describedby={state.fieldErrors?.businessName ? "business-name-error" : undefined}
          />
          <FieldError id="business-name-error" message={state.fieldErrors?.businessName?.[0]} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="businessStage" className={labelClass}>
            Business profile *
          </label>
          <select
            id="businessStage"
            name="businessStage"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.businessStage}
            aria-describedby={state.fieldErrors?.businessStage ? "business-stage-error" : undefined}
          >
            <option value="" disabled>
              Select
            </option>
            {stageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="business-stage-error" message={state.fieldErrors?.businessStage?.[0]} />
        </div>

        <div>
          <label htmlFor="biggestRisk" className={labelClass}>
            Biggest risk *
          </label>
          <select
            id="biggestRisk"
            name="biggestRisk"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.biggestRisk}
            aria-describedby={state.fieldErrors?.biggestRisk ? "business-risk-error" : undefined}
          >
            <option value="" disabled>
              Select
            </option>
            {riskOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="business-risk-error" message={state.fieldErrors?.biggestRisk?.[0]} />
        </div>

        <div>
          <label htmlFor="continuityReadiness" className={labelClass}>
            Readiness *
          </label>
          <select
            id="continuityReadiness"
            name="continuityReadiness"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
            aria-invalid={!!state.fieldErrors?.continuityReadiness}
            aria-describedby={state.fieldErrors?.continuityReadiness ? "business-readiness-error" : undefined}
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
          <FieldError id="business-readiness-error" message={state.fieldErrors?.continuityReadiness?.[0]} />
        </div>
      </div>

      <div className="absolute -left-[9999px] h-1 w-1 overflow-hidden" aria-hidden>
        <label htmlFor="business-website">Website</label>
        <input id="business-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs text-zinc-500">
          <input
            type="checkbox"
            name="consent"
            value="true"
            disabled={isPending}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-rose-500 focus:ring-rose-500 disabled:opacity-60"
          />
          <span>
            I consent to AS Brokers contacting me about this workbook request and related business risk education.
          </span>
        </label>
        <FieldError id="business-consent-error" message={state.fieldErrors?.consent?.[0]} />
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
        {isPending ? "Sending workbook..." : "Send me the workbook"}
      </button>
    </form>
  );
}
