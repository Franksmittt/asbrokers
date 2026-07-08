import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    authInterrupts: true,
    optimizePackageImports: ["recharts", "framer-motion"],
    serverActions: {
      /** Large HTML + calculator code drafts exceed the default 1MB action body limit. */
      bodySizeLimit: "12mb",
    },
  },
  async redirects() {
    /** Retired React calculator routes → ASSET hub anchors or service hubs. */
    const legacyCalculatorRedirects = [
      { source: "/income-tax-calculator", destination: "/calculators#asset-006-income-tax" },
      { source: "/estate-duty-calculator", destination: "/calculators#asset-007-estate-duty" },
      { source: "/wealth-building-calculator", destination: "/calculators#asset-001-retirement-growth" },
      { source: "/premium-increase-calculator", destination: "/insurance" },
      { source: "/immediate-higher-income-calculator", destination: "/calculators#asset-009-everest-142-income" },
      { source: "/cost-of-inflation-over-time", destination: "/calculators#asset-005-future-value" },
      { source: "/retirement-readiness", destination: "/retirement-planning", permanent: true },
      { source: "/income-in-retirement", destination: "/calculators#asset-004-life-of-capital" },
      { source: "/annual-estate-reduction-strategy", destination: "/calculators#asset-008-estate-reduction" },
      { source: "/everest-strategic-growth-145", destination: "/investments" },
      { source: "/everest-amethyst-living-annuity", destination: "/calculators#asset-014-living-annuity" },
      { source: "/everest-128-product", destination: "/calculators#asset-010-everest-128-income" },
      { source: "/lab", destination: "/calculators" },
    ] as const;

    const retiredCatalogueRedirects = [
      { source: "/retirement", destination: "/retirement-planning" },
      { source: "/everest-wealth", destination: "/investments" },
      { source: "/solutions", destination: "/insurance" },
      { source: "/solutions/medical-aid", destination: "/insurance" },
      { source: "/solutions/life-insurance", destination: "/insurance" },
      { source: "/solutions/personal-insurance", destination: "/insurance" },
      { source: "/solutions/business-insurance", destination: "/insurance" },
      { source: "/solutions/business-life", destination: "/insurance" },
      { source: "/how-we-work", destination: "/about" },
    ] as const;

    return [
      { source: "/solutions/estate-planning", destination: "/estate-planning", permanent: true },
      ...retiredCatalogueRedirects.map(({ source, destination }) => ({
        source,
        destination,
        permanent: true,
      })),
      { source: "/home2", destination: "/", permanent: true },
      { source: "/home3", destination: "/", permanent: true },
      { source: "/home4", destination: "/", permanent: true },
      { source: "/favicon.ico", destination: "/images/og-default.jpg", permanent: true },
      { source: "/embed/calculators/:path*", destination: "/calculators", permanent: true },
      ...legacyCalculatorRedirects.map(({ source, destination }) => ({
        source,
        destination,
        permanent: true,
      })),
      /** Consolidate alternate hosts onto GSC canonical origin (HTTPS + www). */
      {
        source: "/:path*",
        has: [{ type: "host", value: "asbrokers.online" }],
        destination: "https://www.asbrokers.co.za/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "asbrokers.co.za" }],
        destination: "https://www.asbrokers.co.za/:path*",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    const hoistPath = path.join(
      __dirname,
      "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.min.js"
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      "hoist-non-react-statics": hoistPath,
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "hoist-non-react-statics": hoistPath,
    };
    return config;
  },
};

export default nextConfig;
