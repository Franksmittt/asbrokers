"use client";

import dynamic from "next/dynamic";
import { Nav } from "./Nav";

const QuickActionBar = dynamic(
  () => import("./QuickActionBar").then((m) => m.QuickActionBar),
  { ssr: false, loading: () => null }
);
const FloatingWhatsApp = dynamic(
  () => import("./FloatingWhatsApp").then((m) => m.FloatingWhatsApp),
  { ssr: false, loading: () => null }
);

type Props = {
  children?: React.ReactNode;
  homeOnly?: boolean;
};

export function AppShellChrome({ children, homeOnly }: Props) {
  if (homeOnly) {
    return (
      <>
        <QuickActionBar />
        <FloatingWhatsApp />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
      <QuickActionBar />
      <FloatingWhatsApp />
    </>
  );
}
