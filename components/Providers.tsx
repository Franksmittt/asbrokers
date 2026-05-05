"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";
import { MotionConfigProvider } from "@/components/MotionConfigProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <ConsentProvider>
        <MotionConfigProvider>{children}</MotionConfigProvider>
      </ConsentProvider>
    </NuqsAdapter>
  );
}
