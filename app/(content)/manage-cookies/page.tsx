"use client";

import Link from "next/link";
import { useConsent } from "@/components/analytics/ConsentProvider";

export default function ManageCookiesPage() {
  const { consent, setConsent, clearConsent, hasChosen } = useConsent();

  return (
    <div className="min-h-screen bg-void py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Manage Cookie Preferences
        </h1>
        <p className="text-gray-400 text-sm tracking-[0.01em] mb-8">
          We use cookies in line with the Protection of Personal Information Act (POPIA). You can change your preferences below.
        </p>

        <div className="rounded-[2rem] rim-light border-0 p-6 md:p-8 space-y-6">
          {hasChosen ? (
            <p className="text-sm text-gray-300">
              Current preference:{" "}
              <span className="trust-hallmark text-white">
                {consent === "all" ? "Accept all cookies" : "Essential only"}
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              You have not yet chosen a preference. The cookie banner will appear on the next page load.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setConsent("all")}
              className="px-5 py-2.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
            >
              Accept all cookies
            </button>
            <button
              type="button"
              onClick={() => setConsent("essential")}
              className="px-5 py-2.5 rounded-2xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => {
                clearConsent();
                window.location.href = "/";
              }}
              className="px-5 py-2.5 rounded-2xl border border-white/10 text-gray-400 text-sm font-medium hover:text-white hover:border-white/20 transition-colors"
            >
              Show cookie banner again
            </button>
          </div>

          <p className="text-xs text-gray-500">
            For more detail, see our{" "}
            <Link href="/privacy" className="text-cinematic-teal hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <p className="mt-8 text-center">
          <Link href="/" className="text-sm text-cinematic-teal hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
