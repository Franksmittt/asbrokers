"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import {
  clearStoredConsent,
  readStoredConsent,
  writeStoredConsent,
  type ConsentLevel,
} from "@/lib/consent-storage";

const CookieConsent = dynamic(
  () => import("@/components/ui/CookieConsent").then((m) => m.CookieConsent),
  { ssr: false }
);
const ConditionalAnalytics = dynamic(
  () => import("./ConditionalAnalytics").then((m) => m.ConditionalAnalytics),
  { ssr: false }
);

type ConsentContextValue = {
  consent: ConsentLevel;
  setConsent: (level: "all" | "essential") => void;
  clearConsent: () => void;
  hasChosen: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

type Props = {
  children?: ReactNode;
  /** Skip idle delay (manage-cookies page). */
  eager?: boolean;
};

/**
 * Consent context + deferred cookie/analytics mounts.
 * Do not wrap the whole app, mount via DeferredConsentIsland or eager on manage-cookies only.
 */
export function ConsentProvider({ children, eager = false }: Props) {
  const [consent, setConsentState] = useState<ConsentLevel>(null);
  const [hasHydrated, setHasHydrated] = useState(eager);

  useEffect(() => {
    setConsentState(readStoredConsent());
    if (eager) {
      setHasHydrated(true);
      return;
    }
    const showBanner = () => setHasHydrated(true);
    const t = window.setTimeout(showBanner, 12_000);
    window.addEventListener("pointerdown", showBanner, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", showBanner);
    };
  }, [eager]);

  const setConsent = useCallback((level: "all" | "essential") => {
    writeStoredConsent(level);
    setConsentState(level);
  }, []);

  const clearConsent = useCallback(() => {
    clearStoredConsent();
    setConsentState(null);
  }, []);

  const hasChosen = hasHydrated && consent !== null;

  return (
    <ConsentContext.Provider
      value={{
        consent: hasHydrated ? consent : null,
        setConsent,
        clearConsent,
        hasChosen,
      }}
    >
      {children}
      {hasHydrated && <CookieConsent />}
      {hasHydrated && <ConditionalAnalytics />}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
