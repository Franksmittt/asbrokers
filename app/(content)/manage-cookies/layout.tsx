import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/manage-cookies",
  title: "Manage Cookie Preferences",
  description:
    "Update your cookie and analytics preferences for AS Brokers CC in line with POPIA. Choose essential-only or allow analytics cookies on www.asbrokers.co.za.",
  noIndex: true,
});

export default function ManageCookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
