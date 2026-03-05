import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AS Brokers | The Private Vault",
  description:
    "25+ years helping South Africans with retirement planning, insurance, estate structuring & business continuity. Albert Schuurman & Johnny Farinha. Independent Authorised Financial Service Provider.",
  keywords: [
    "financial advisor",
    "retirement planning",
    "South Africa",
    "insurance",
    "estate planning",
    "AS Brokers",
    "FSP 17273",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0c] text-white selection:bg-blue-500 selection:text-white min-h-screen`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
