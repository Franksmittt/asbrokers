import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work | AS Brokers",
  description:
    "How AS Brokers structures advice: diagnose, design, implement, and review across retirement, risk, and legacy planning.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
