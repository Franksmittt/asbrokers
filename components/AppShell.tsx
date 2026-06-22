"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { MarketingNavServer } from "@/components/MarketingNavServer";

const AppShellChrome = dynamic(() => import("./AppShellChrome").then((m) => m.AppShellChrome), {
  loading: () => null,
});

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  const pathname = usePathname() ?? "";
  const clientStudio = pathname.startsWith("/studio/blog");
  const embed = pathname.startsWith("/embed");
  const isHome = pathname === "/";

  if (clientStudio || embed) {
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

  if (isHome) {
    return (
      <>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MarketingNavServer />
        <main id="main-content" className="min-h-screen" tabIndex={-1}>
          {children}
        </main>
        <AppShellChrome homeOnly />
      </>
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AppShellChrome>{children}</AppShellChrome>
    </>
  );
}
