"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AppShellChrome } from "@/components/AppShellChrome";
import { MarketingNavServer } from "@/components/MarketingNavServer";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  const pathname = usePathname() ?? "";
  const clientStudio = pathname.startsWith("/studio/blog");
  const embed = pathname.startsWith("/embed");
  const isHome = pathname === "/";
  const isCrmOrPortal =
    pathname.startsWith("/crm") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/login");

  if (clientStudio || embed || isCrmOrPortal) {
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
