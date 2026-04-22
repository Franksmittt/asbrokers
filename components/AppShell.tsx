"use client";

import { Nav } from "./Nav";
import { QuickActionBar } from "./QuickActionBar";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
      <QuickActionBar />
      <FloatingWhatsApp />
    </>
  );
}
