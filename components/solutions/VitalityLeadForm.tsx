"use client";

import { useActionState, useEffect } from "react";
import { submitDiscoveryVitalityLead } from "@/app/(content)/solutions/discovery-vitality/actions";
import { trackLeadConversion } from "@/lib/analytics/events";
import {
  vitalityInterestLabels,
  vitalityInterestOptions,
  type DiscoveryVitalitySubmitState,
} from "@/lib/validations/discovery-vitality";

const TEAL = "#0F766E";
const inputClass =
  "w-full border border-stone-300 bg-white px-4 py-3 text-shark placeholder:text-stone-400 transition-colors focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E] disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-medium text-stone-700";

const initialState: DiscoveryVitalitySubmitState = { success: false };

type Props = {
  id?: string;
};

export function VitalityLeadForm({ id = "vitality-lead-form" }: Props) {
  const [state, formAction, isPending] = useActionState(submitDiscoveryVitalityLead, initialState);

  useEffect(() => {
    if (state.success) trackLeadConversion("discovery_vitality_form");
  }, [state.success]);

  if (state.success) {
    return (
      <div className="border border-stone-200 bg-[#F7F6F3] p-8 text-center">
        <h3 className="mb-2 font-serif text-2xl font-semibold text-shark">Request received</h3>
        <p className="mb-6 text-sm leading-relaxed text-stone-600">
          {state.message ??
            "We will contact you by phone or WhatsApp about Discovery Vitality through AS Brokers."}
        </p>
        <a
          href="https://wa.me/27662276044"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold underline-offset-2 hover:underline"
          style={{ color: TEAL }}
        >
          WhatsApp us in the meantime
        </a>
      </div>
    );
  }

  return (
    <form id={id} action={formAction} className="space-y-5">
      {state.message && !state.success ? (
        <p className="text-sm text-amber-800" role="alert">
          {state.message}
        </p>
      ) : null}

      <div>
        <label htmlFor={`${id}-fullName`} className={labelClass}>
          Full name *
        </label>
        <input
          id={`${id}-fullName`}
          name="fullName"
          type="text"
          autoComplete="name"
          className={inputClass}
          disabled={isPending}
          aria-invalid={!!state.fieldErrors?.fullName}
        />
        {state.fieldErrors?.fullName?.[0] ? (
          <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.fullName[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-phone`} className={labelClass}>
            WhatsApp / phone *
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.phone}
          />
          {state.fieldErrors?.phone?.[0] ? (
            <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.phone[0]}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Email *
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.email}
          />
          {state.fieldErrors?.email?.[0] ? (
            <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.email[0]}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-interest`} className={labelClass}>
          What do you need? *
        </label>
        <select
          id={`${id}-interest`}
          name="interest"
          className={inputClass}
          disabled={isPending}
          defaultValue=""
          aria-invalid={!!state.fieldErrors?.interest}
        >
          <option value="" disabled>
            Select…
          </option>
          {vitalityInterestOptions.map((value) => (
            <option key={value} value={value}>
              {vitalityInterestLabels[value]}
            </option>
          ))}
        </select>
        {state.fieldErrors?.interest?.[0] ? (
          <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.interest[0]}</p>
        ) : null}
      </div>

      <div className="absolute -left-[9999px] h-1 w-1 overflow-hidden" aria-hidden>
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone-600">
        <input
          type="checkbox"
          name="consent"
          value="true"
          disabled={isPending}
          className="mt-1 h-4 w-4 shrink-0 border-stone-300 text-[#0F766E] focus:ring-[#0F766E]"
          aria-invalid={!!state.fieldErrors?.consent}
        />
        <span>
          I consent to AS Brokers CC (FSP 17273) contacting me about Discovery Vitality and related
          healthcare products under POPIA. My details are not sold to third parties. *
        </span>
      </label>
      {state.fieldErrors?.consent?.[0] ? (
        <p className="text-sm text-amber-700">{state.fieldErrors.consent[0]}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
        style={{ backgroundColor: TEAL }}
      >
        {isPending ? "Submitting…" : "Sign up interest — through AS Brokers"}
      </button>
    </form>
  );
}
