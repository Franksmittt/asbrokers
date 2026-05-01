"use client";

import { useConsent } from "@/components/analytics/ConsentProvider";

export function CookieConsent() {
  const { consent, setConsent } = useConsent();

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 md:px-8 md:py-6 bg-[#0a0a0c]/90 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-zinc-300 leading-relaxed">
          We use cookies for analytics and to save your calculator progress. Your data is processed in line with the{" "}
          <strong className="text-white">Protection of Personal Information Act (POPIA)</strong> and we only use
          non-essential cookies with your consent. You can accept all cookies or restrict to essential only.
        </p>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setConsent("essential")}
            className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => setConsent("all")}
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
