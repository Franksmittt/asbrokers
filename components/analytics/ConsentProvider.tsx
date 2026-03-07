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

  const hasChosen = hasHydrated && consent !== null;

  return (
    <ConsentContext.Provider
      value={{
        consent: hasHydrated ? consent : null,
        setConsent,
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
