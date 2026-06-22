import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/how-we-work",
  title: "How We Work | Structured Financial Advice",
  description:
    "AS Brokers uses a four-step process — diagnose, design, implement, and review — for retirement, risk, and legacy planning. FSP 17273, Krugersdorp.",
});

export default function HowWeWorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
