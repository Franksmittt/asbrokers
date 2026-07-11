import type { Metadata } from "next";
import { QuizProviders } from "@/components/Providers";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/quiz",
  title: "Financial Health Quiz",
  description:
    "Quick financial health check, answer a few questions and get pointed to relevant calculators and resources. Educational tool from AS Brokers CC, FSP 17273.",
});

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <QuizProviders>{children}</QuizProviders>;
}
