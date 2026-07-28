"use client";

import { useActionState, useEffect } from "react";
import { requestCallback } from "@/app/actions/callback";
import { trackLeadConversion } from "@/lib/analytics/events";
import type { CallbackActionState } from "@/lib/validations/callback-lead";
import type { CallbackSource } from "@/lib/validations/callback-lead";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/whatsapp";

const initialState: CallbackActionState = { success: false };

type Variant = "light" | "dark";

type FormCopy = {
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  emailLabel: string;
  optional: string;
  noteLabel: string;
  notePlaceholder: string;
  consentText: string;
  submitPending: string;
  whatsappButton: string;
  successHeading: string;
  successBody: string;
  successWhatsapp: string;
};

const COPY: Record<"en" | "af", FormCopy> = {
  en: {
    nameLabel: "Full name *",
    namePlaceholder: "Your full name",
    phoneLabel: "Phone / WhatsApp *",
    emailLabel: "Email",
    optional: "(optional)",
    noteLabel: "What do you need help with?",
    notePlaceholder: "e.g. My commercial premium jumped at renewal",
    consentText:
      "I agree that AS Brokers CC (FSP 17273) may contact me about this enquiry. POPIA applies.",
    submitPending: "Sending…",
    whatsappButton: "WhatsApp instead",
    successHeading: "Callback requested",
    successBody: "Thank you. An authorised adviser will phone you within one business day.",
    successWhatsapp: "Prefer same-day? WhatsApp",
  },
  af: {
    nameLabel: "Volle naam *",
    namePlaceholder: "Jou volle naam",
    phoneLabel: "Selfoon / WhatsApp *",
    emailLabel: "E-pos",
    optional: "(opsioneel)",
    noteLabel: "Waarmee kan ons help?",
    notePlaceholder: "bv. My besigheidspremie het skerp gestyg met hernuwing",
    consentText:
      "Ek stem in dat AS Brokers CC (FSP 17273) my oor hierdie navraag mag kontak. POPIA geld.",
    submitPending: "Stuur…",
    whatsappButton: "WhatsApp eerder",
    successHeading: "Terugbelversoek ontvang",
    successBody: "Dankie. 'n Gemagtigde adviseur skakel jou binne een werksdag.",
    successWhatsapp: "Verkies vandag nog? WhatsApp",
  },
};

type Props = {
  /** Allowlisted page key: resolves service category and intent server-side. */
  source: CallbackSource;
  heading?: string;
  description?: string;
  buttonLabel?: string;
  /** Optional free-text note field ("What do you need help with?"). */
  showNote?: boolean;
  /** Hide the optional email field for 3-field ad landing pages. */
  showEmail?: boolean;
  /** Field labels / microcopy language. */
  lang?: "en" | "af";
  variant?: Variant;
  className?: string;
  whatsappMessage?: string;
};

const styles = {
  light: {
    card: "rounded-3xl bg-stone-50 p-6 ring-1 ring-stone-200/90 sm:p-8",
    heading: "font-serif text-xl font-semibold tracking-tight text-shark sm:text-2xl",
    body: "text-sm leading-relaxed text-stone-600",
    label: "mb-1.5 block text-sm font-medium text-stone-700",
    input:
      "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-shark placeholder:text-stone-400 transition-colors focus:border-cinematic-teal focus:outline-none focus:ring-1 focus:ring-cinematic-teal disabled:cursor-not-allowed disabled:opacity-60",
    consent: "flex items-start gap-3 text-sm leading-relaxed text-stone-600",
    checkbox: "mt-1 h-4 w-4 rounded border-stone-300 text-samsung-blue focus:ring-cinematic-teal",
    error: "text-xs text-red-600",
    button:
      "inline-flex items-center justify-center rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#004a9e] disabled:opacity-60",
    whatsapp:
      "inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-shark ring-1 ring-stone-200 transition hover:bg-stone-50",
  },
  dark: {
    card: "rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8",
    heading: "font-serif text-xl font-semibold tracking-tight text-white sm:text-2xl",
    body: "text-sm leading-relaxed text-white/70",
    label: "mb-1.5 block text-sm font-medium text-white/80",
    input:
      "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 transition-colors focus:border-cinematic-teal focus:outline-none focus:ring-1 focus:ring-cinematic-teal disabled:cursor-not-allowed disabled:opacity-60",
    consent: "flex items-start gap-3 text-sm leading-relaxed text-white/70",
    checkbox: "mt-1 h-4 w-4 rounded border-white/30 text-cinematic-teal focus:ring-cinematic-teal",
    error: "text-xs text-amber-400",
    button:
      "inline-flex items-center justify-center rounded-2xl bg-cinematic-teal px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60",
    whatsapp:
      "inline-flex items-center justify-center rounded-2xl bg-white/10 px-5 py-3.5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15",
  },
} as const;

/**
 * Compact embeddable callback form: name + phone (+ optional email/note).
 * One per marketing page; the source key maps to CRM routing server-side.
 * Supports Afrikaans microcopy and a 3-field mode for ad landing pages.
 */
export function CallbackForm({
  source,
  heading = "Prefer us to call you?",
  description = "Leave your name and number. An authorised adviser phones you back within one business day, no call centre, no obligation.",
  buttonLabel = "Request a callback",
  showNote = false,
  showEmail = true,
  lang = "en",
  variant = "light",
  className = "",
  whatsappMessage = "Hi AS Brokers, please call me back about my insurance and planning questions.",
}: Props) {
  const [state, formAction, isPending] = useActionState(requestCallback, initialState);
  const s = styles[variant];
  const t = COPY[lang];
  const waHref = whatsappUrl(whatsappMessage);

  useEffect(() => {
    if (state.success) trackLeadConversion(`callback_${source}`);
  }, [state.success, source]);

  if (state.success) {
    return (
      <div className={`${s.card} ${className}`}>
        <h3 className={s.heading}>{t.successHeading}</h3>
        <p className={`mt-2 max-w-md ${s.body}`}>{t.successBody}</p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-semibold text-cinematic-teal underline-offset-2 hover:underline"
        >
          {t.successWhatsapp} {WHATSAPP_DISPLAY}
        </a>
      </div>
    );
  }

  return (
    <div className={`${s.card} ${className}`}>
      <h3 className={s.heading}>{heading}</h3>
      <p className={`mt-2 max-w-2xl ${s.body}`}>{description}</p>

      <form action={formAction} className="mt-6 space-y-4">
        <input type="hidden" name="source" value={source} />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`cb-${source}-name`} className={s.label}>
              {t.nameLabel}
            </label>
            <input
              id={`cb-${source}-name`}
              name="fullName"
              type="text"
              required
              autoComplete="name"
              disabled={isPending}
              className={s.input}
              placeholder={t.namePlaceholder}
            />
            {state.fieldErrors?.fullName?.[0] ? (
              <p className={`mt-1 ${s.error}`}>{state.fieldErrors.fullName[0]}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor={`cb-${source}-phone`} className={s.label}>
              {t.phoneLabel}
            </label>
            <input
              id={`cb-${source}-phone`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              disabled={isPending}
              className={s.input}
              placeholder="0XX XXX XXXX"
            />
            {state.fieldErrors?.phone?.[0] ? (
              <p className={`mt-1 ${s.error}`}>{state.fieldErrors.phone[0]}</p>
            ) : null}
          </div>
          {showEmail ? (
            <div className="sm:col-span-2">
              <label htmlFor={`cb-${source}-email`} className={s.label}>
                {t.emailLabel} <span className="font-normal opacity-70">{t.optional}</span>
              </label>
              <input
                id={`cb-${source}-email`}
                name="email"
                type="email"
                autoComplete="email"
                disabled={isPending}
                className={s.input}
                placeholder="you@example.com"
              />
              {state.fieldErrors?.email?.[0] ? (
                <p className={`mt-1 ${s.error}`}>{state.fieldErrors.email[0]}</p>
              ) : null}
            </div>
          ) : null}
          {showNote ? (
            <div className="sm:col-span-2">
              <label htmlFor={`cb-${source}-note`} className={s.label}>
                {t.noteLabel} <span className="font-normal opacity-70">{t.optional}</span>
              </label>
              <input
                id={`cb-${source}-note`}
                name="note"
                type="text"
                maxLength={400}
                disabled={isPending}
                className={s.input}
                placeholder={t.notePlaceholder}
              />
              {state.fieldErrors?.note?.[0] ? (
                <p className={`mt-1 ${s.error}`}>{state.fieldErrors.note[0]}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        <label className={s.consent}>
          <input
            type="checkbox"
            name="consent"
            required
            disabled={isPending}
            className={s.checkbox}
          />
          <span>{t.consentText}</span>
        </label>
        {state.fieldErrors?.consent?.[0] ? (
          <p className={s.error}>{state.fieldErrors.consent[0]}</p>
        ) : null}

        {state.message && !state.success ? (
          <p
            className={`text-sm ${variant === "dark" ? "text-amber-400" : "text-red-600"}`}
            role="alert"
          >
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button type="submit" disabled={isPending} className={s.button}>
            {isPending ? t.submitPending : buttonLabel}
          </button>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className={s.whatsapp}>
            {t.whatsappButton}
          </a>
        </div>
      </form>
    </div>
  );
}
