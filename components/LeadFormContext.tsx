"use client";

import { createContext, useContext, useState, useCallback } from "react";

type LeadFormContextType = {
  leadFormStep: number;
  setLeadFormStep: (step: number) => void;
  openLeadForm: () => void;
};

const LeadFormContext = createContext<LeadFormContextType | null>(null);

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [leadFormStep, setLeadFormStep] = useState(0);
  const openLeadForm = useCallback(() => setLeadFormStep(1), []);
  return (
    <LeadFormContext.Provider value={{ leadFormStep, setLeadFormStep, openLeadForm }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used within LeadFormProvider");
  return ctx;
}
