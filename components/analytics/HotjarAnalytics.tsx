"use client";

import Script from "next/script";
import { getHotjarId } from "@/lib/analytics/env";

/**
 * Loads the Hotjar tracking script asynchronously. Only mount this component
 * after the user has consented to analytics (e.g. "Accept All" in cookie banner).
 * Uses next/script for optimal loading; no script is injected if HOTJAR_ID is missing.
 */
export function HotjarAnalytics() {
  const hotjarId = getHotjarId();
  if (!hotjarId) return null;

  const idLiteral = JSON.stringify(hotjarId);

  const snippet = `(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:${idLiteral},hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;

  return (
    <Script
      id="hotjar-analytics"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: snippet }}
    />
  );
}
