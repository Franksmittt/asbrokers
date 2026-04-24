"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/components/analytics/ConsentProvider";
import { HotjarAnalytics } from "./HotjarAnalytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Renders GA4 and Hotjar only when the user has chosen "Accept All" in the
 * cookie consent banner. Ensures POPIA compliance: no non-essential tracking
 * without explicit consent.
 */
export function ConditionalAnalytics() {
  const { consent } = useConsent();

  if (consent !== "all") return null;

  return (
    <>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      <HotjarAnalytics />
    </>
  );
}
