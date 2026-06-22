import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { Providers } from "@/components/Providers";
import { SpeculationRulesClient } from "@/components/seo/SpeculationRulesClient";
import { FallbackPageJsonLdClient } from "@/components/seo/FallbackPageJsonLdClient";
import { getSiteOrigin } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: "AS Brokers CC | Independent Financial Advisor Krugersdorp",
    template: "%s | AS Brokers CC",
  },
  description:
    "25+ years helping South Africans with retirement planning, insurance, estate structuring & business continuity. Albert Schuurman & Johnny Farinha. Independent Authorised Financial Service Provider.",
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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AS Brokers CC" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-void text-white selection:bg-samsung-blue selection:text-white min-h-screen">
        <FallbackPageJsonLdClient />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
        <SpeculationRulesClient />
      </body>
    </html>
  );
}
