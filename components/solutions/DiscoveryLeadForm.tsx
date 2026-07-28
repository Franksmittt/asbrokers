"use client";

import { useActionState, useEffect } from "react";
import { submitDiscoveryHealthLead } from "@/app/(content)/solutions/discovery-health/actions";
import { trackLeadConversion } from "@/lib/analytics/events";
import {
  discoveryStatusLabels,
  discoveryStatusOptions,
  type DiscoveryHealthSubmitState,
} from "@/lib/validations/discovery-health";

const TEAL = "#0F766E";
const inputClass =
  "w-full border border-stone-300 bg-white px-4 py-3 text-shark placeholder:text-stone-400 transition-colors focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E] disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-medium text-stone-700";

const initialState: DiscoveryHealthSubmitState = { success: false };

type Props = {
  id?: string;
};

export function DiscoveryLeadForm({ id = "discovery-lead-form" }: Props) {
  const [state, formAction, isPending] = useActionState(submitDiscoveryHealthLead, initialState);

  useEffect(() => {
    if (state.success) trackLeadConversion("discovery_health_form");
  }, [state.success]);

  if (state.success) {
    return (
      <div className="border border-stone-200 bg-[#F7F6F3] p-8 text-center">
        <h3 className="mb-2 font-serif text-2xl font-semibold text-shark">Request received</h3>
        <p className="mb-6 text-sm leading-relaxed text-stone-600">
          {state.message ??
            "We'll review your details and contact you by phone or WhatsApp for a Discovery + Gap coverage audit."}
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
      {state.message && !state.success && (
        <p className="text-sm text-amber-800" role="alert">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor={`${id}-fullName`} className={labelClass}>
          Full legal name *
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
        {state.fieldErrors?.fullName?.[0] && (
          <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.fullName[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className={labelClass}>
          WhatsApp / contact number *
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
        {state.fieldErrors?.phone?.[0] && (
          <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.phone[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={labelClass}>
          Email address *
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
        {state.fieldErrors?.email?.[0] && (
          <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-status`} className={labelClass}>
          Current status *
        </label>
        <select
          id={`${id}-status`}
          name="currentStatus"
          className={inputClass}
          disabled={isPending}
          defaultValue=""
          aria-invalid={!!state.fieldErrors?.currentStatus}
        >
          <option value="" disabled>
            Select…
          </option>
          {discoveryStatusOptions.map((value) => (
            <option key={value} value={value}>
              {discoveryStatusLabels[value]}
            </option>
          ))}
        </select>
        {state.fieldErrors?.currentStatus?.[0] && (
          <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.currentStatus[0]}</p>
        )}
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
          I explicitly consent to being contacted by AS Brokers CC (FSP 17273) regarding healthcare
          and financial products in accordance with the Protection of Personal Information Act
          (POPIA). Data is secured and never sold to third parties. *
        </span>
      </label>
      {state.fieldErrors?.consent?.[0] && (
        <p className="text-sm text-amber-700">{state.fieldErrors.consent[0]}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
        style={{ backgroundColor: TEAL }}
      >
        {isPending ? "Submitting…" : "Request my Discovery + Gap audit"}
      </button>
    </form>
  );
}
