"use client";

import Link from "next/link";
import { useConsent } from "@/components/analytics/ConsentProvider";
import {
  WarmPageWithFooter,
  WarmProse,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import {
  WARM_BODY,
  WARM_BTN_GHOST,
  WARM_BTN_PRIMARY,
  WARM_BTN_SECONDARY,
  WARM_CARD,
  WARM_LINK,
  WARM_META,
} from "@/lib/warm-theme";

export default function ManageCookiesPage() {
  const { consent, setConsent, clearConsent, hasChosen } = useConsent();

  return (
    <WarmPageWithFooter>
      <WarmSimpleHero
        kicker="Legal"
        title="Manage Cookie Preferences"
        description="We use cookies in line with the Protection of Personal Information Act (POPIA). You can change your preferences below."
      />

      <WarmSection narrow>
        <WarmProse>
          <div className={WARM_CARD}>
            {hasChosen ? (
              <p className={WARM_BODY}>
                Current preference:{" "}
                <span className="font-semibold text-shark">
                  {consent === "all" ? "Accept all cookies" : "Essential only"}
                </span>
              </p>
            ) : (
              <p className={WARM_BODY}>
                You have not yet chosen a preference. The cookie banner will appear on the next page load.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => setConsent("all")} className={WARM_BTN_PRIMARY}>
                Accept all cookies
              </button>
              <button type="button" onClick={() => setConsent("essential")} className={WARM_BTN_SECONDARY}>
                Essential only
              </button>
              <button
                type="button"
                onClick={() => {
                  clearConsent();
                  window.location.href = "/";
                }}
                className={WARM_BTN_GHOST}
              >
                Show cookie banner again
              </button>
            </div>

            <p className={`mt-6 ${WARM_META}`}>
              For more detail, see our{" "}
              <Link href="/privacy" className={WARM_LINK}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <p className="text-center">
            <Link href="/" className={WARM_LINK}>
              ← Back to home
            </Link>
          </p>
        </WarmProse>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
