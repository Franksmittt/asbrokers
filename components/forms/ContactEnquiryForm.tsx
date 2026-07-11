"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  "w-full border border-[#1D1D1F] bg-white px-4 py-3 text-shark placeholder:text-stone-400 transition-colors focus:border-cinematic-teal focus:outline-none focus:ring-1 focus:ring-cinematic-teal disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-medium text-stone-700";

const initialState: ContactActionState = { success: false };

export function ContactEnquiryForm() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") ?? "";
  const [state, formAction, isPending] = useActionState(submitContactEnquiry, initialState);

  const [selectedTopics, setSelectedTopics] = useState<string[]>(() => {
    if (
      source.includes("everest") ||
      source === "home_hero" ||
      source === "home_journey" ||
      source === "home_pathways" ||
      source === "nav_cta" ||
      source === "calculator_terminal"
    ) {
      return ["everest"];
    }
    if (source.includes("medical")) return ["medical_gap"];
    if (source.includes("estate") || source.includes("legacy")) return ["estate"];
    if (source.includes("insurance")) return ["short_business"];
    return [];
  });
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
      <div className="border border-[#E5E5E5] bg-[#F7F6F3] p-8 text-center">
        <h3 className="mb-2 font-serif text-2xl font-semibold text-shark">Request received</h3>
        <p className="mb-6 text-sm leading-relaxed text-stone-600">
          We&apos;ll review your enquiry personally and get back to you by phone or WhatsApp. Not a call
          centre.
        </p>
        <a
          href="https://wa.me/27662276044"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-cinematic-teal underline-offset-2 hover:underline"
        >
          WhatsApp us in the meantime
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="topics" value={JSON.stringify(selectedTopics)} />
      <input type="hidden" name="source" value={source} />

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
            aria-labelledby="discussion-topics-label discussion-topics-value"
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
            <span id="discussion-topics-value" className="truncate text-sm text-stone-700">
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
          <span className="text-sm leading-relaxed text-stone-700">
            I consent to AS Brokers CC (FSP 17273) processing my personal information to respond to
            this enquiry and initiate a capital assessment, and to send related transactional
            messages. This is voluntary. See the{" "}
            <a href="/privacy" className="font-semibold text-cinematic-teal hover:opacity-80">
              Privacy Policy
            </a>
            . Reply STOP to opt out of messages.
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
        aria-label={isPending ? "Sending consultation request" : "Request a consultation"}
        className="mt-2 w-full rounded bg-cinematic-teal py-4 text-sm font-semibold text-white transition hover:bg-[#008f8f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Request capital assessment"}
      </button>
    </form>
  );
}
