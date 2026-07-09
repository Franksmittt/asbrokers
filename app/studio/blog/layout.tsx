import type { Metadata } from "next";
import { PRIVATE_ROUTE_ROBOTS } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Insights studio",
  description: "Create and publish HTML insight articles for the AS Brokers website.",
  robots: PRIVATE_ROUTE_ROBOTS,
};

export default function StudioBlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-black text-zinc-200 text-[15px] leading-snug antialiased">{children}</div>;
}
