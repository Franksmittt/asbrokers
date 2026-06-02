import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { GlobalSchema } from "@/components/seo/GlobalSchema";
import { Providers } from "@/components/Providers";
import { getSiteOrigin } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: "AS Brokers CC | Independent Financial Advisor Krugersdorp",
    template: "%s | AS Brokers CC",
  },
  description:
    "25+ years helping South Africans with retirement planning, insurance, estate structuring & business continuity. Albert Schuurman & Johnny Farinha. Independent Authorised Financial Service Provider.",
  alternates: {
    canonical: "./",
  },
  keywords: [
    "independent financial advisor Krugersdorp",
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
  verification: {
    google: "zgoH05kyB4lknFvZmobzDyb9Hl9au5byOwC9fNZgyp4",
  },
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
      <body className={`${inter.variable} font-sans antialiased bg-void text-white selection:bg-samsung-blue selection:text-white min-h-screen`}>
        <Providers>
          <GlobalSchema />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
