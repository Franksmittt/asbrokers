import Script from "next/script";
import { readConsentCookie } from "@/lib/consent-cookie";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;

/**
 * Analytics only when consent cookie is "all".
 * Uses next/script lazyOnload — no React client island on the critical path.
 */
export async function AnalyticsWhenConsented() {
  const consent = await readConsentCookie();
  if (consent !== "all") return null;

  return (
    <>
      {GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
          <Script id="ga4-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {HOTJAR_ID ? (
        <Script id="hotjar-init" strategy="lazyOnload">
          {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${Number(HOTJAR_ID)},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      ) : null}
    </>
  );
}
