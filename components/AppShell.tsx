"use client";

import { LeadFormProvider } from "./LeadFormContext";
import { Nav } from "./Nav";
import { QuickActionBar } from "./QuickActionBar";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { LeadModal } from "./LeadModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LeadFormProvider>
      <Nav />
      <main className="min-h-screen">{children}</main>
      <QuickActionBar />
      <FloatingWhatsApp />
      <LeadModal />
    </LeadFormProvider>
  );
}
