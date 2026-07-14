"use client";

import Link from "next/link";
import { ConsentProvider, useConsent } from "@/components/analytics/ConsentProvider";
import {
  LegalDocumentLayout,
  LegalSection,
} from "@/components/legal/LegalDocumentLayout";

function ManageCookiesInner() {
  const { consent, setConsent, clearConsent, hasChosen } = useConsent();

  return (
    <LegalDocumentLayout
      kicker="Legal · POPIA"
      title="Manage Cookie Preferences"
      description="We use cookies in line with the Protection of Personal Information Act (POPIA). You can change your preferences below."
      lastUpdated="July 2026"
      footerLinks={[
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/", label: "Home" },
      ]}
    >
      <LegalSection title="Your current preference">
        {hasChosen ? (
          <p>
            Current preference:{" "}
            <strong>{consent === "all" ? "Accept all cookies" : "Essential only"}</strong>
          </p>
        ) : (
          <p>
            You have not yet chosen a preference. The cookie banner will appear on the next page load.
          </p>
        )}
      </LegalSection>

      <LegalSection title="Update preferences">
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setConsent("all")}
            className="inline-flex items-center justify-center rounded-2xl bg-samsung-blue px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue hover:bg-[#004a9e]"
          >
            Accept all cookies
          </button>
          <button
            type="button"
            onClick={() => setConsent("essential")}
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-stone-800 ring-1 ring-stone-200/90 hover:bg-stone-50"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => {
              clearConsent();
              window.location.href = "/";
            }}
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50"
          >
            Show cookie banner again
          </button>
        </div>
        <p className="mt-6 text-sm text-stone-600">
          For more detail, see our{" "}
          <Link href="/privacy" prefetch={false}>
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDocumentLayout>
  );
}

export function ManageCookiesPageView() {
  return (
    <ConsentProvider eager>
      <ManageCookiesInner />
    </ConsentProvider>
  );
}
