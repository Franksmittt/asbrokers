"use client";

import { usePathname } from "next/navigation";

import { Nav } from "./Nav";
import { QuickActionBar } from "./QuickActionBar";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const clientStudio = pathname.startsWith("/studio/blog");

  if (clientStudio) {
    return (
      <>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content" className="min-h-screen" tabIndex={-1}>
          {children}
        </main>
      </>
    );
  }

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
