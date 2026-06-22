import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/lab",
  title: "The Lab | Free Financial Calculators",
  description:
    "Free retirement, investment, and risk calculators from AS Brokers CC. Model capital longevity, tax, and estate liquidity before you book advice. FSP 17273.",
});

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
