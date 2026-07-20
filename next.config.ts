import type { NextConfig } from "next";
import path from "path";

/**
 * Blocking metadata for HTML-limited / preview / answer crawlers.
 * Custom htmlLimitedBots REPLACES Next.js defaults — keep the full Next union, then extend.
 * Source baseline: next/dist/shared/lib/router/utils/html-bots.js (Next 15.5).
 * Aligns with lib/crawler-policy.ts allow-list for answer/search bots (not blocked trainers).
 */
const HTML_LIMITED_BOTS =
  /[\w-]+-Google|Google-[\w-]+|Googlebot|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|bingbot|applebot|Applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|OAI-SearchBot|ChatGPT-User|PerplexityBot|Claude-Web|anthropic-ai|Bytespider|meta-externalagent/i;

/**
 * Report-Only CSP — observe violations without blocking Hotjar / GA / Supabase.
 * Tighten and switch to Content-Security-Policy after reviewing reports (see docs/TASK2-HARDENING.md).
 */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://static.hotjar.com",
    "https://script.hotjar.com",
    "https://*.hotjar.com",
    "https://va.vercel-scripts.com",
    "https://vercel.live",
  ].join(" "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  [
    "connect-src 'self'",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://region1.google-analytics.com",
    "https://www.googletagmanager.com",
    "https://*.hotjar.com",
    "https://*.hotjar.io",
    "wss://*.hotjar.com",
    "https://*.supabase.co",
    "wss://*.supabase.co",
    "https://vercel.live",
    "https://va.vercel-scripts.com",
  ].join(" "),
  [
    "frame-src 'self'",
    "https://vars.hotjar.com",
    "https://*.hotjar.com",
    "https://www.googletagmanager.com",
    "https://vercel.live",
  ].join(" "),
  "worker-src 'self' blob:",
  "media-src 'self' https:",
].join("; ");

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  htmlLimitedBots: HTML_LIMITED_BOTS,
  images: {
    formats: ["image/avif", "image/webp"],
    /**
     * Vercel Image Optimization returns 402 when the plan quota is exhausted.
     * Masters under public/images are already resized/compressed for display,
     * so serving them statically avoids blank logos/cards site-wide.
     */
    unoptimized: true,
  },
  experimental: {
    authInterrupts: true,
    /**
     * Keep CSS external and cacheable. Inline CSS inflated static marketing HTML
     * (Everest: ~374KB) and increased low-end mobile Style/Layout work.
     */
    optimizeCss: true,
    inlineCss: false,
    cssChunking: "strict",
    optimizePackageImports: ["recharts", "framer-motion", "zod", "ai", "@ai-sdk/react", "clsx"],
    serverActions: {
      /** Large HTML + calculator code drafts exceed the default 1MB action body limit. */
      bodySizeLimit: "12mb",
    },
  },
  /**
   * Modern browserslist in package.json (Chrome/Edge/Firefox ≥111, Safari ≥16.4).
   * SWC should not emit legacy polyfills for those targets; webpack alias below
   * is a hard kill-switch for Next's polyfill-module (~11KB LH waste).
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...SECURITY_HEADERS],
      },
      /**
       * ASSET calculators are same-origin iframes of /embed-calculators/*.html.
       * Global X-Frame-Options: DENY makes the browser show “refused to connect”.
       * Later matching sources override duplicate header keys in Next.js.
       */
      {
        source: "/embed-calculators/:path*",
        headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }],
      },
    ];
  },
  async redirects() {
    /** Retired React calculator routes → ASSET hub anchors or service hubs. */
    const legacyCalculatorRedirects = [
      { source: "/wealth-building-calculator", destination: "/calculators/asset-001-retirement-growth" },
      { source: "/calculators/retirement-reality-check", destination: "/calculators/asset-002-retirement-reality-check" },
      { source: "/cost-of-inflation-over-time", destination: "/calculators/asset-005-future-value" },
      { source: "/retirement-readiness", destination: "/retirement-planning", permanent: true },
      { source: "/annual-estate-reduction-strategy", destination: "/calculators/asset-008-estate-reduction" },
      { source: "/income-in-retirement", destination: "/calculators/asset-004-life-of-capital" },
      { source: "/income-tax-calculator", destination: "/calculators/asset-006-income-tax" },
      { source: "/estate-duty-calculator", destination: "/calculators/asset-007-estate-duty" },
      { source: "/immediate-higher-income-calculator", destination: "/calculators/asset-009-everest-142-income" },
      { source: "/everest-128-product", destination: "/calculators/asset-010-everest-128-income" },
      { source: "/everest-strategic-growth-145", destination: "/calculators/asset-012-strategic-growth" },
      { source: "/everest-amethyst-living-annuity", destination: "/calculators/asset-014-living-annuity" },
      { source: "/lab", destination: "/calculators" },
    ] as const;

    const retiredCatalogueRedirects = [
      { source: "/retirement", destination: "/retirement-planning" },
      { source: "/solutions", destination: "/insurance" },
      { source: "/solutions/life-insurance", destination: "/insurance" },
      { source: "/solutions/personal-insurance", destination: "/insurance" },
      { source: "/solutions/business-insurance", destination: "/insurance" },
      { source: "/solutions/business-life", destination: "/insurance" },
      { source: "/how-we-work", destination: "/about" },
    ] as const;

    return [
      { source: "/solutions/estate-planning", destination: "/estate-planning", permanent: true },
      /** Legacy Sanity Studio URL → Blog Studio (intentional CMS). */
      { source: "/studio", destination: "/studio/blog", permanent: true },
      { source: "/studio/", destination: "/studio/blog", permanent: true },
      /** Retired Studio changelog page. */
      {
        source: "/studio/blog/workspace/upgrades",
        destination: "/studio/blog/workspace",
        permanent: true,
      },
      ...retiredCatalogueRedirects.map(({ source, destination }) => ({
        source,
        destination,
        permanent: true,
      })),
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
  webpack: (config, { webpack: wp }) => {
    const hoistPath = path.join(
      __dirname,
      "node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.min.js"
    );
    const emptyPolyfill = path.join(__dirname, "lib/empty-polyfill.js");
    config.resolve.alias = {
      ...config.resolve.alias,
      "hoist-non-react-statics": hoistPath,
      // Drop Next legacy polyfill module (~11KB) — site targets Chrome/Edge/Firefox 111+ / Safari 16.4+.
      "next/dist/build/polyfills/polyfill-module": emptyPolyfill,
      "next/dist/build/polyfills/polyfill-module.js": emptyPolyfill,
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "hoist-non-react-statics": hoistPath,
    };
    config.plugins.push(
      new wp.NormalModuleReplacementPlugin(
        /next[\\/]dist[\\/]build[\\/]polyfills[\\/]polyfill-module(\.js)?$/,
        emptyPolyfill
      )
    );
    return config;
  },
};

export default nextConfig;
