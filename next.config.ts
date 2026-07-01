import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    authInterrupts: true,
    optimizePackageImports: ["recharts", "framer-motion"],
    serverActions: {
      /** Large HTML + calculator code drafts exceed the default 1MB action body limit. */
      bodySizeLimit: "12mb",
    },
  },
  async redirects() {
    const legacyCalculatorPaths = [
      "/income-tax-calculator",
      "/estate-duty-calculator",
      "/wealth-building-calculator",
      "/premium-increase-calculator",
      "/immediate-higher-income-calculator",
      "/cost-of-inflation-over-time",
      "/retirement-readiness",
      "/income-in-retirement",
      "/annual-estate-reduction-strategy",
      "/everest-strategic-growth-145",
      "/everest-amethyst-living-annuity",
      "/everest-128-product",
      "/lab",
    ] as const;

    return [
      { source: "/home2", destination: "/", permanent: true },
      { source: "/home3", destination: "/", permanent: true },
      { source: "/home4", destination: "/", permanent: true },
      { source: "/embed/calculators/:path*", destination: "/calculators", permanent: false },
      ...legacyCalculatorPaths.map((source) => ({
        source,
        destination: "/calculators",
        permanent: false,
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
