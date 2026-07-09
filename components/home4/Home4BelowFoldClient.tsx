"use client";

import dynamic from "next/dynamic";

const Home4BelowFold = dynamic(
  () => import("@/components/home4/Home4BelowFold").then((m) => m.Home4BelowFold),
  { ssr: false, loading: () => <div className="min-h-[40vh]" aria-hidden /> }
);

export function Home4BelowFoldClient() {
  return <Home4BelowFold />;
}
