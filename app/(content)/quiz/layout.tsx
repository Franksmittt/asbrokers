import type { Metadata } from "next";
import { QuizProviders } from "@/components/QuizProviders";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/quiz",
  title: "Financial Health Quiz",
  description:
    "Educational financial topic quiz from AS Brokers CC (FSP 17273). Points you to learning resources only. Not personal financial advice and not a product recommendation.",
});

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <QuizProviders>{children}</QuizProviders>;
}
