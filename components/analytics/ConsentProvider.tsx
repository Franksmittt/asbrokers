"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ConditionalAnalytics } from "./ConditionalAnalytics";

const STORAGE_KEY = "asbrokers-cookie-consent";

export type ConsentLevel = "all" | "essential" | null;

type ConsentContextValue = {
  consent: ConsentLevel;
  setConsent: (level: "all" | "essential") => void;
  /** Clear stored consent so the cookie banner shows again (e.g. from Manage Cookie Preferences page). */
  clearConsent: () => void;
  hasChosen: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStoredConsent(): ConsentLevel {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "all" || raw === "essential") return raw;
  } catch {
    // ignore
  }
  return null;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentLevel>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setConsentState(readStoredConsent());
    setHasHydrated(true);
  }, []);

  const setConsent = useCallback((level: "all" | "essential") => {
    try {
      localStorage.setItem(STORAGE_KEY, level);
    } catch {
      // ignore
    }
    setConsentState(level);
  }, []);

  const clearConsent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setConsentState(null);
  }, []);

  const hasChosen = hasHydrated && consent !== null;

  return (
    <ConsentContext.Provider
      value={{
        consent: hasHydrated ? consent : null,
        setConsent,
        clearConsent,
        hasChosen: hasChosen ?? false,
      }}
    >
      {children}
      {hasHydrated && <CookieConsent />}
      <ConditionalAnalytics />
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
