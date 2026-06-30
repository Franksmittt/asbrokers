"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { funnel } from "@/components/funnel/FunnelLayout";
import {
  submitLegacyChecklistLead,
  type LegacyChecklistSubmitState,
} from "@/app/(content)/legacy-readiness-checklist/actions";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#00549F]/50 focus:outline-none focus:ring-2 focus:ring-[#00549F]/20 disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

const initialState: LegacyChecklistSubmitState = { success: false };

type Props = {
  id?: string;
  /** When true, form renders without outer card chrome (parent provides section card). */
  embedded?: boolean;
};

export function LegacyChecklistLeadForm({ id = "checklist-form", embedded = false }: Props) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(submitLegacyChecklistLead, initialState);

  useEffect(() => {
    if (state.success && state.checklistUrl) {
      router.push(state.checklistUrl);
    }
  }, [state.success, state.checklistUrl, router]);

  if (state.success && state.checklistUrl) {
    return (
      <div className="rounded-2xl border border-[#00549F]/30 bg-[#00549F]/10 px-6 py-8 text-center">
        <p className="text-sm text-zinc-300">{state.message ?? "Preparing your checklist…"}</p>
      </div>
    );
  }

  return (
    <form id={embedded ? undefined : id} action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${id}-firstName`}>
            First name *
          </label>
          <input
            id={`${id}-firstName`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            className={inputClass}
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.firstName}
          />
          {state.fieldErrors?.firstName?.[0] && (
            <p className="mt-1.5 text-sm text-amber-400">{state.fieldErrors.firstName[0]}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor={`${id}-surname`}>
            Surname *
          </label>
          <input
            id={`${id}-surname`}
            name="surname"
            type="text"
            autoComplete="family-name"
            className={inputClass}
            disabled={isPending}
            aria-invalid={!!state.fieldErrors?.surname}
          />
          {state.fieldErrors?.surname?.[0] && (
            <p className="mt-1.5 text-sm text-amber-400">{state.fieldErrors.surname[0]}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor={`${id}-email`}>
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
          {state.fieldErrors?.email?.[0] && (
            <p className="mt-1.5 text-sm text-amber-400">{state.fieldErrors.email[0]}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor={`${id}-phone`}>
            Mobile number *
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
            <p className="mt-1.5 text-sm text-amber-400">{state.fieldErrors.phone[0]}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor={`${id}-age`}>
            Age <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <input
            id={`${id}-age`}
            name="age"
            type="number"
            min={18}
            max={120}
            className={inputClass}
            disabled={isPending}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`${id}-businessOwner`}>
            Business owner <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <select
            id={`${id}-businessOwner`}
            name="businessOwner"
            className={inputClass}
            disabled={isPending}
            defaultValue=""
          >
            <option value="" className="bg-zinc-900">
              Select…
            </option>
            <option value="yes" className="bg-zinc-900">
              Yes
            </option>
            <option value="no" className="bg-zinc-900">
              No
            </option>
          </select>
        </div>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {state.message && !state.success && (
        <p className="text-sm text-amber-400" role="alert">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={isPending} className={`w-full sm:w-auto ${funnel.cta}`}>
        {isPending ? "Sending…" : "Send my checklist"}
      </button>

      <p className={`${funnel.meta} normal-case tracking-normal`}>
        Educational only, not legal advice. By submitting, you agree to receive your checklist and follow-up
        communications from AS Brokers. FSP 17273.
      </p>
    </form>
  );
}
