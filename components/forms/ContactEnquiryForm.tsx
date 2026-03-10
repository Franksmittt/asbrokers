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
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

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
      <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] text-center">
        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Request received</h3>
        <p className="text-zinc-400 text-sm mb-6">
          We&apos;ll review your enquiry personally and get back to you by phone or WhatsApp. Not a call centre. You&apos;ll hear from us.
        </p>
        <a
          href="https://wa.me/27672429946"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
        >
          WhatsApp us in the meantime
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] space-y-6">
      <input type="hidden" name="topics" value={JSON.stringify(selectedTopics)} />

      <div>
        <label htmlFor="fullName" className={labelClass}>Full name *</label>
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
          <p id="fullName-error" className="mt-1 text-sm text-amber-400">{state.fieldErrors.fullName[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>Phone *</label>
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
          <p id="phone-error" className="mt-1 text-sm text-amber-400">{state.fieldErrors.phone[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email *</label>
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
          <p id="email-error" className="mt-1 text-sm text-amber-400">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div className="absolute -left-[9999px] w-1 h-1 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div ref={topicsRef}>
        <p className={labelClass}>What would you like to discuss? *</p>
        <p className="text-zinc-500 text-xs mb-2">Select all that apply. We&apos;ll prepare for a relevant conversation.</p>
        <div className="relative">
          <button
            type="button"
            onClick={() => setTopicsOpen(!topicsOpen)}
            disabled={isPending}
            className={`w-full flex items-center justify-between gap-2 py-3 px-4 rounded-xl border text-left transition-colors disabled:opacity-60 ${
              state.fieldErrors?.topics ? "border-amber-500/50" : "border-white/10 hover:border-white/20"
            } ${topicsOpen ? "border-blue-500/50 bg-white/5" : "bg-white/5"}`}
          >
            <span className="text-sm text-zinc-300 truncate">
              {selectedTopics.length === 0
                ? "Select topics..."
                : `${selectedTopics.length} topic${selectedTopics.length === 1 ? "" : "s"} selected`}
            </span>
            <ChevronDown className={`w-4 h-4 shrink-0 text-zinc-500 transition-transform ${topicsOpen ? "rotate-180" : ""}`} />
          </button>
          {topicsOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 py-2 max-h-56 overflow-y-auto bg-[#0f1116] border border-white/10 rounded-xl shadow-xl z-10 space-y-0.5">
              {serviceOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 py-2 px-4 cursor-pointer transition-colors hover:bg-white/5 ${
                    selectedTopics.includes(opt.id) ? "bg-blue-500/10" : ""
                  } ${isPending ? "pointer-events-none opacity-60" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(opt.id)}
                    onChange={() => toggleTopic(opt.id)}
                    disabled={isPending}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-zinc-300">{opt.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        {state.fieldErrors?.topics?.[0] && (
          <p className="mt-1 text-sm text-amber-400">{state.fieldErrors.topics[0]}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="consent"
            value="true"
            disabled={isPending}
            className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 disabled:opacity-60"
          />
          <span className="text-xs text-zinc-500 group-hover:text-zinc-400">
            I consent to receive transactional messages related to my enquiry (appointment reminders, confirmations, account notifications). Message & data rates may apply. Reply HELP for help or STOP to opt out.
          </span>
        </label>
        {state.fieldErrors?.consent?.[0] && (
          <p className="mt-1 text-sm text-amber-400">{state.fieldErrors.consent[0]}</p>
        )}
      </div>

      {state.message && !state.success && (
        <p className="text-sm text-amber-400 mt-2" role="alert">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : "Initiate Wealth Engineering Request"}
      </button>
    </form>
  );
}
