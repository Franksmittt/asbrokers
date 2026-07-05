"use client";

import dynamic from "next/dynamic";

export const HomeFloatingChat = dynamic(
  () => import("@/components/FloatingChat").then((m) => m.FloatingChat),
  { ssr: false, loading: () => null }
);
