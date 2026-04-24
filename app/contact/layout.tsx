import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Independent Financial Advisor Krugersdorp | Contact AS Brokers CC",
  description:
    "Contact AS Brokers CC, your independent financial advisor in Krugersdorp, East Rand. FSP 17273. Retirement planning, Everest Wealth, estate planning. Personal response, no call centre.",
  openGraph: {
    title: "Independent Financial Advisor Krugersdorp | Contact AS Brokers CC",
    description: "Contact AS Brokers CC in Krugersdorp. FSP 17273. Retirement, insurance, estate planning.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
