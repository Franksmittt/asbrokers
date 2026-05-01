import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Health Quiz | AS Brokers",
  description:
    "Answer a few questions and we'll point you to the right calculators and resources for retirement, estate, insurance, and tax.",
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
