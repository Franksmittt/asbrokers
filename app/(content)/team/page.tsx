import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = privateRouteMetadata(
  "Team | AS Brokers",
  "Team page redirect, not for public indexing."
);

export default function TeamPage() {
  /* Direct to final destination; /how-we-work itself 301s to /about (avoid redirect chain). */
  redirect("/about");
}
