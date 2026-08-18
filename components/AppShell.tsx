"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function isMarketingRoute(pathname: string): boolean {
  if (pathname.startsWith("/studio")) return false;
  if (pathname.startsWith("/embed")) return false;
  if (pathname.startsWith("/crm")) return false;
  if (pathname.startsWith("/portal")) return false;
  if (pathname.startsWith("/login")) return false;
  if (pathname.startsWith("/internal")) return false;
  return true;
}

export function AppShell({ children }: Props) {
  const pathname = usePathname() ?? "";

  if (isMarketingRoute(pathname)) {
    return <>{children}</>;
  }

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
