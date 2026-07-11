"use client";

import { useActionState } from "react";
import {
  submitCalculatorLead,
  type CalculatorLeadActionState,
} from "@/app/actions/calculator-lead";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CALCULATOR_MESSAGE,
} from "@/lib/whatsapp";

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-shark placeholder:text-stone-400 transition-colors focus:border-cinematic-teal focus:outline-none focus:ring-1 focus:ring-cinematic-teal disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700";

const initialState: CalculatorLeadActionState = { success: false };

type Props = {
  calculatorId: string;
  calculatorPath: string;
  calculatorTitle?: string;
};

/** Soft CRM capture after calculator use, tools stay ungated. */
export function CalculatorLeadCapture({
  calculatorId,
  calculatorPath,
  calculatorTitle,
}: Props) {
  const [state, formAction, isPending] = useActionState(submitCalculatorLead, initialState);
  const waHref = whatsappUrl(
    calculatorTitle
      ? `${WHATSAPP_CALCULATOR_MESSAGE} Calculator: ${calculatorTitle}.`
      : WHATSAPP_CALCULATOR_MESSAGE
  );

  if (state.success) {
    return (
      <div className="mt-8 rounded-3xl bg-stone-50 p-6 text-center ring-1 ring-stone-200/90 sm:p-8">
        <h3 className="text-lg font-bold tracking-tight text-shark sm:text-xl">Request received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
          We&apos;ll review personally and get back by phone or WhatsApp. Not a call centre.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-semibold text-cinematic-teal underline-offset-2 hover:underline"
        >
          Prefer same-day? WhatsApp {WHATSAPP_DISPLAY}
        </a>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl bg-stone-50 p-6 ring-1 ring-stone-200/90 sm:p-8">
      <h3 className="text-lg font-bold tracking-tight text-shark sm:text-xl">
        Want us to walk through these numbers with you?
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
        Leave your details for a capital assessment. The calculator stays free and educational, this
        is only if you want an independent FSP 17273 adviser to review your figures.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <input type="hidden" name="calculatorId" value={calculatorId} />
        <input type="hidden" name="calculatorPath" value={calculatorPath} />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="calc-lead-name" className={labelClass}>
              Full name *
            </label>
            <input
              id="calc-lead-name"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              disabled={isPending}
              className={inputClass}
              placeholder="Your full name"
            />
            {state.fieldErrors?.fullName?.[0] ? (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.fullName[0]}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="calc-lead-email" className={labelClass}>
              Email *
            </label>
            <input
              id="calc-lead-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={isPending}
              className={inputClass}
              placeholder="you@example.com"
            />
            {state.fieldErrors?.email?.[0] ? (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.email[0]}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="calc-lead-phone" className={labelClass}>
              Phone / WhatsApp *
            </label>
            <input
              id="calc-lead-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              disabled={isPending}
              className={inputClass}
              placeholder="0XX XXX XXXX"
            />
            {state.fieldErrors?.phone?.[0] ? (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.phone[0]}</p>
            ) : null}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="calc-lead-capital" className={labelClass}>
              Approximate capital to discuss (optional)
            </label>
            <input
              id="calc-lead-capital"
              name="capitalAmount"
              type="number"
              min={0}
              step={1000}
              disabled={isPending}
              className={inputClass}
              placeholder="e.g. 500000"
            />
            {state.fieldErrors?.capitalAmount?.[0] ? (
              <p className="mt-1 text-xs text-red-600">{state.fieldErrors.capitalAmount[0]}</p>
            ) : null}
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-stone-600">
          <input
            type="checkbox"
            name="consent"
            value="on"
            required
            disabled={isPending}
            className="mt-1 h-4 w-4 rounded border-stone-300 text-samsung-blue focus:ring-cinematic-teal"
          />
          <span>
            I agree to be contacted by AS Brokers CC (FSP 17273) about this enquiry. POPIA applies.
          </span>
        </label>
        {state.fieldErrors?.consent?.[0] ? (
          <p className="text-xs text-red-600">{state.fieldErrors.consent[0]}</p>
        ) : null}

        {state.message && !state.success ? (
          <p className="text-sm text-red-600" role="alert">
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue transition hover:bg-[#004a9e] disabled:opacity-60"
          >
            {isPending ? "Sending…" : "Request capital assessment"}
          </button>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-shark ring-1 ring-stone-200 transition hover:bg-stone-50"
          >
            WhatsApp same day
          </a>
        </div>
      </form>
    </div>
  );
}
