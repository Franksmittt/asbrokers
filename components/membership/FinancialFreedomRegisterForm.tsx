"use client";

import { useActionState } from "react";
import { submitFinancialFreedomRegistration } from "@/app/actions/financial-freedom-register";

const initialState = { success: false as boolean, message: "" as string };

const PROVINCES = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Outside South Africa",
] as const;

const HEAR_OPTIONS = [
  "AS Brokers website",
  "Referral",
  "Social media",
  "YouTube",
  "Existing client",
  "Other",
] as const;

/**
 * Registration fields for Financial Freedom Community™.
 * Payment step follows in a later release after this capture is live.
 */
export function FinancialFreedomRegisterForm() {
  const [state, formAction, pending] = useActionState(
    submitFinancialFreedomRegistration,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-3xl bg-white p-6 ring-1 ring-stone-200 sm:p-8">
        <h2 className="text-xl font-bold text-shark">Registration received</h2>
        <p className="mt-3 text-base leading-relaxed text-stone-600">
          {state.message ||
            "Thank you. The next step is programme payment. Once payment is confirmed, your membership will activate and unlock the Goal Engineering Planner™."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-3xl bg-white p-6 ring-1 ring-stone-200 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Surname" name="surname" required autoComplete="family-name" />
      </div>
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field
        label="Mobile number"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        hint="South African mobile preferred"
      />
      <Field
        label="ID / passport number (optional)"
        name="identityNumber"
        autoComplete="off"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City" name="city" required autoComplete="address-level2" />
        <label className="block text-sm font-semibold text-stone-800">
          Province
          <select
            name="province"
            required
            defaultValue=""
            className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900"
          >
            <option value="" disabled>
              Select province
            </option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm font-semibold text-stone-800">
        Primary financial goal
        <textarea
          name="primaryGoal"
          required
          rows={3}
          className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900"
          placeholder="e.g. Retire with sustainable income / fund education / clear debt"
        />
      </label>
      <label className="block text-sm font-semibold text-stone-800">
        How did you hear about us? (optional)
        <select
          name="howDidYouHear"
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900"
        >
          <option value="">Prefer not to say</option>
          {HEAR_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-start gap-3 text-sm text-stone-700">
        <input type="checkbox" name="consentPrivacy" value="true" required className="mt-1" />
        <span>
          I accept the AS Brokers privacy notice and consent to processing my details for programme
          registration (POPIA).
        </span>
      </label>
      <label className="flex items-start gap-3 text-sm text-stone-700">
        <input type="checkbox" name="consentProgramme" value="true" required className="mt-1" />
        <span>
          I want to join the Financial Freedom Community™ and understand access requires programme
          payment after registration.
        </span>
      </label>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {state.message && !state.success ? (
        <p className="text-sm font-medium text-red-700" role="alert">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-[#1D1D1F] px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Continue to payment step"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-stone-800">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900"
      />
      {hint ? <span className="mt-1 block text-xs font-normal text-stone-500">{hint}</span> : null}
    </label>
  );
}
