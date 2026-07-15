import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/chat",
  title: "Digital Wealth Assistant",
  description:
    "AS Brokers digital wealth assistant for Discovery Health medical aid, Gap Cover, estate duty, Everest 12.8% income, and Amethyst annuity illustrations. Educational only, not financial advice. FSP 17273.",
});

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
