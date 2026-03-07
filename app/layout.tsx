import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";
import { AppShell } from "@/components/AppShell";
import { GlobalSchema } from "@/components/seo/GlobalSchema";
import { MotionConfigProvider } from "@/components/MotionConfigProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AS Brokers CC | Independent Financial Advisor Alberton",
    template: "%s | AS Brokers CC",
  },
  description:
    "25+ years helping South Africans with retirement planning, insurance, estate structuring & business continuity. Albert Schuurman & Johnny Farinha. Independent Authorised Financial Service Provider.",
  keywords: [
    "independent financial advisor Alberton",
    "Code 1.8 FSP license broker",
    "financial advisor",
    "retirement planning",
    "South Africa",
    "insurance",
    "estate planning",
    "AS Brokers",
    "FSP 17273",
    "Everest Wealth brokers",
    "alternative private equity investments South Africa",
  ],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "AS Brokers CC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0c] text-white selection:bg-blue-500 selection:text-white min-h-screen`}>
        <NuqsAdapter>
          <ConsentProvider>
            <MotionConfigProvider>
              <GlobalSchema />
              <AppShell>{children}</AppShell>
            </MotionConfigProvider>
          </ConsentProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
