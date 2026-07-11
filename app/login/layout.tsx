import type { Metadata } from "next";
import { MinimalAppShell } from "@/components/MinimalAppShell";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "Sign in | AS Brokers",
  "Staff authentication, not for public indexing."
);

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <MinimalAppShell>{children}</MinimalAppShell>;
}
