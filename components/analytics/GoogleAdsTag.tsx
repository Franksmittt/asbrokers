"use client";

import Script from "next/script";
import { getGaMeasurementId, getGoogleAdsId } from "@/lib/analytics/env";

/**
 * Google Ads (AW-) tag. Rendered only inside ConditionalAnalytics, i.e. after
 * "Accept All" consent. When GA4 is configured, its gtag.js loader is reused
 * and we only push the additional AW config; without GA4 we load gtag.js with
 * the Ads ID directly.
 */
export function GoogleAdsTag() {
  const adsId = getGoogleAdsId();
  const gaId = getGaMeasurementId();
  if (!adsId) return null;

  const adsIdLiteral = JSON.stringify(adsId);

  return (
    <>
      {!gaId && (
        <Script
          id="google-ads-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`}
          strategy="afterInteractive"
        />
      )}
      <Script
        id="google-ads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', ${adsIdLiteral});`,
        }}
      />
    </>
  );
}
