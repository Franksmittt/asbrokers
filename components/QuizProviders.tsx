"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

/** URL-state adapter scoped to quiz routes only (keeps Nuqs off marketing critical path). */
export function QuizProviders({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
