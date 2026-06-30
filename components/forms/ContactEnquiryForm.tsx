"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { ChevronDown } from "@/components/icons";
import { submitContactEnquiry, type ContactActionState } from "@/app/actions/contact";

const serviceOptions = [
  { id: "everest", label: "Investment Review / Everest Wealth Quote" },
  { id: "medical_gap", label: "Company Medical & Gap Review" },
  { id: "medical", label: "Medical Aid" },
  { id: "gap", label: "Gap Cover" },
  { id: "short_business", label: "Short-term Business Insurance" },
  { id: "short_personal", label: "Short-term Personal Insurance" },
  { id: "life_business", label: "Life Insurance (Business)" },
  { id: "life_personal", label: "Life Insurance (Personal)" },
  { id: "will", label: "Last Will & Testament" },
  { id: "trust", label: "Trust & Business Structure" },
  { id: "wellness", label: "Wellness & Integration" },
  { id: "estate", label: "Estate Reduction Plan" },
  { id: "general", label: "General enquiry" },
];

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-shark placeholder:text-stone-400 transition-colors focus:border-samsung-blue focus:outline-none focus:ring-2 focus:ring-samsung-blue/25 disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-medium text-stone-700";

const initialState: ContactActionState = { success: false };

export function ContactEnquiryForm() {
  const [state, formAction, isPending] = useActionState(submitContactEnquiry, initialState);

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const topicsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (topicsRef.current && !topicsRef.current.contains(e.target as Node)) {
        setTopicsOpen(false);
      }
    }
    if (topicsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [topicsOpen]);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  if (state.success) {
    return (
      <div className="rounded-2xl bg-stone-50 p-8 text-center ring-1 ring-stone-200/80">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-shark">Request received</h3>
        <p className="mb-6 text-sm leading-relaxed text-stone-600">
          We&apos;ll review your enquiry personally and get back to you by phone or WhatsApp. Not a call
          centre. You&apos;ll hear from us.
        </p>
        <a
          href="https://wa.me/27662276044"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-[#1da851]"
        >
          WhatsApp us in the meantime
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="topics" value={JSON.stringify(selectedTopics)} />

      <div>
        <label htmlFor="fullName" className={labelClass}>
          Full name *
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Full name"
          className={inputClass}
          disabled={isPending}
          aria-invalid={!!state.fieldErrors?.fullName}
          aria-describedby={state.fieldErrors?.fullName ? "fullName-error" : undefined}
        />
        {state.fieldErrors?.fullName?.[0] && (
          <p id="fullName-error" className="mt-1 text-sm text-amber-700">
            {state.fieldErrors.fullName[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Phone number"
          className={inputClass}
          disabled={isPending}
          aria-invalid={!!state.fieldErrors?.phone}
          aria-describedby={state.fieldErrors?.phone ? "phone-error" : undefined}
        />
        {state.fieldErrors?.phone?.[0] && (
          <p id="phone-error" className="mt-1 text-sm text-amber-700">
            {state.fieldErrors.phone[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          className={inputClass}
          disabled={isPending}
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
        />
        {state.fieldErrors?.email?.[0] && (
          <p id="email-error" className="mt-1 text-sm text-amber-700">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div className="absolute -left-[9999px] h-1 w-1 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div ref={topicsRef}>
        <p id="discussion-topics-label" className={labelClass}>
          What would you like to discuss? *
        </p>
        <p className="mb-2 text-xs text-stone-500">
          Select all that apply. We&apos;ll prepare for a relevant conversation.
        </p>
        <div className="relative">
          <button
            type="button"
            id="discussion-topics"
            onClick={() => setTopicsOpen(!topicsOpen)}
            disabled={isPending}
            aria-labelledby="discussion-topics-label"
            aria-expanded={topicsOpen}
            aria-haspopup="listbox"
            className={`flex w-full items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left transition-colors duration-300 ease-in-out disabled:opacity-60 ${
              state.fieldErrors?.topics
                ? "border-amber-400 bg-amber-50/50"
                : topicsOpen
                  ? "border-samsung-blue bg-white ring-2 ring-samsung-blue/20"
                  : "border-stone-200 bg-stone-50 hover:border-stone-300"
            }`}
          >
            <span className="truncate text-sm text-stone-700">
              {selectedTopics.length === 0
                ? "Select topics..."
                : `${selectedTopics.length} topic${selectedTopics.length === 1 ? "" : "s"} selected`}
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-stone-500 transition-transform duration-300 ease-in-out ${topicsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {topicsOpen && (
            <div
              role="listbox"
              aria-labelledby="discussion-topics-label"
              className="absolute top-full left-0 right-0 z-10 mt-1 max-h-56 space-y-0.5 overflow-y-auto rounded-xl border border-stone-200 bg-white py-2 shadow-xl"
            >
              {serviceOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2 transition-colors duration-200 hover:bg-stone-50 ${
                    selectedTopics.includes(opt.id) ? "bg-samsung-blue/5" : ""
                  } ${isPending ? "pointer-events-none opacity-60" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(opt.id)}
                    onChange={() => toggleTopic(opt.id)}
                    disabled={isPending}
                    className="h-4 w-4 rounded border-stone-300 text-samsung-blue focus:ring-samsung-blue focus:ring-offset-0"
                  />
                  <span className="text-sm text-stone-700">{opt.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        {state.fieldErrors?.topics?.[0] && (
          <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.topics[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="consent" className="group flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            name="consent"
            value="true"
            disabled={isPending}
            className="mt-1 h-4 w-4 rounded border-stone-300 text-samsung-blue focus:ring-samsung-blue disabled:opacity-60"
          />
          <span className="text-xs leading-relaxed text-stone-500 group-hover:text-stone-600">
            I consent to receive transactional messages related to my enquiry (appointment reminders,
            confirmations, account notifications). Message & data rates may apply. Reply HELP for help or
            STOP to opt out.
          </span>
        </label>
        {state.fieldErrors?.consent?.[0] && (
          <p className="mt-1 text-sm text-amber-700">{state.fieldErrors.consent[0]}</p>
        )}
      </div>

      {state.message && !state.success && (
        <p className="text-sm text-amber-700" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-2xl bg-samsung-blue py-4 text-sm font-semibold text-white shadow-md shadow-samsung-blue/20 transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Request a Consultation"}
      </button>
    </form>
  );
}
