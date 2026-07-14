import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { QuickActionBar } from "@/components/QuickActionBar";

/** SSR marketing chrome — no client hydration (was a deferred React island). */
export function MarketingChromeExtras() {
  return (
    <>
      <QuickActionBar />
      <FloatingWhatsApp />
    </>
  );
}
