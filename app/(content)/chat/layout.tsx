import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Wealth Assistant | Chat",
  description:
    "AS Brokers digital wealth assistant. Ask about estate duty, Everest 12.8% Strategic Income, or Amethyst Living Annuity. Deterministic SA tax and product calculations. FSP 17273.",
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
