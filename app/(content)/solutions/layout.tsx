import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/solutions",
  title: "Engineered Wealth & Risk Architecture | Financial Solutions",
  description:
    "Retirement yield, Everest Wealth, personal and business insurance, medical aid, and estate planning from AS Brokers CC. Independent advisor FSP 17273, Krugersdorp.",
});

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
