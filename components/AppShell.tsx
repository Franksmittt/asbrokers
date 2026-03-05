"use client";

import { LeadFormProvider } from "./LeadFormContext";
import { Nav } from "./Nav";
import { QuickActionBar } from "./QuickActionBar";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { LeadModal } from "./LeadModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LeadFormProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
      <QuickActionBar />
      <FloatingWhatsApp />
      <LeadModal />
    </LeadFormProvider>
  );
}
