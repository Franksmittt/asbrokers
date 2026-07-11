import type { ReactNode } from "react";
import { MarketingNav } from "@/components/MarketingNav";
import { MarketingChromeExtras } from "@/components/MarketingChromeExtras";

type Props = {
  children: ReactNode;
};

/** Lightweight marketing chrome, server nav, deferred floating widgets. */
export function MarketingShell({ children }: Props) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <MarketingNav />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
      <MarketingChromeExtras />
    </>
  );
}
