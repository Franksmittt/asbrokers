import type { Metadata } from "next";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "Wealth Projection | AS Brokers",
  "Internal PDF report renderer, not for public indexing."
);

export default function PdfReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
