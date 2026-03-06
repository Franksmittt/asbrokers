import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team | Independent Financial Advisors Alberton",
  description:
    "Meet Albert Schuurman and Johnny Farinha, independent financial advisors at AS Brokers CC in Alberton. FSP 17273. Retirement, estate, insurance, Everest Wealth.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
