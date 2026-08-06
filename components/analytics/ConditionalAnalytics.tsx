"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/components/analytics/ConsentProvider";
import { getGaMeasurementId } from "@/lib/analytics/env";
import { HotjarAnalytics } from "./HotjarAnalytics";
import { GoogleAdsTag } from "./GoogleAdsTag";

/**
 * Renders GA4, Google Ads, and Hotjar only when the user has chosen
 * "Accept All" in the cookie consent banner. Ensures POPIA compliance:
 * no non-essential tracking without explicit consent.
 */
export function ConditionalAnalytics() {
  const { consent } = useConsent();
  const gaId = getGaMeasurementId();

  if (consent !== "all") return null;

  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      <GoogleAdsTag />
      <HotjarAnalytics />
    </>
  );
}
