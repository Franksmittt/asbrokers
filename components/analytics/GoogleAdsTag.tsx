"use client";

import Script from "next/script";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Google Ads (AW-) tag. Rendered only inside ConditionalAnalytics, i.e. after
 * "Accept All" consent. When GA4 is configured, its gtag.js loader is reused
 * and we only push the additional AW config; without GA4 we load gtag.js with
 * the Ads ID directly.
 */
export function GoogleAdsTag() {
  if (!ADS_ID) return null;

  return (
    <>
      {!GA_ID && (
        <Script
          id="google-ads-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
          strategy="afterInteractive"
        />
      )}
      <Script id="google-ads-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${ADS_ID}');`}
      </Script>
    </>
  );
}
