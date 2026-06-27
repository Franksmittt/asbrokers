"use client";

import dynamic from "next/dynamic";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";

const MagicLinkHashHandler = dynamic(
  () =>
    import("@/components/auth/MagicLinkHashHandler").then((m) => m.MagicLinkHashHandler),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <MagicLinkHashHandler />
      {children}
    </ConsentProvider>
  );
}

/** URL-state adapter scoped to quiz routes only (keeps Nuqs off marketing critical path). */
export function QuizProviders({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
