import { buildPageGraph, validateGraphOrphans, type PageGraphInput } from "@/lib/seo";

const samples: PageGraphInput[] = [
  {
    path: "/",
    webPage: {
      name: "AS Brokers CC | Independent Financial Advisor Krugersdorp",
      description: "Comprehensive financial planning, investment, and insurance solutions. FSP 17273.",
    },
  },
  {
    path: "/calculators",
    webPage: {
      name: "Financial Calculators for South Africans | AS Brokers CC",
      description: "Retirement and wealth planning calculators. Educational only.",
    },
    faqs: [{ question: "Are calculator results advice?", answer: "No. Illustrations only." }],
  },
  {
    path: "/solutions",
    webPage: {
      name: "Financial Solutions by AS Brokers CC",
      description: "Retirement, insurance, medical aid, and estate planning.",
    },
    service: {
      name: "Financial Solutions by AS Brokers CC",
      description: "Comprehensive financial planning and insurance broking.",
      serviceType: "Financial Planning, Investment Advisory, Insurance Broking",
    },
  },
  {
    path: "/insights/retirement-income-inflation",
    webPage: {
      name: "Retirement Income in a High-Inflation World",
      description: "Insights article on drawdown and inflation.",
    },
    article: {
      headline: "Retirement Income in a High-Inflation World",
      description: "How to design drawdowns when inflation is volatile.",
      datePublished: "2025-01-12",
    },
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
      { name: "Retirement Income in a High-Inflation World", path: "/insights/retirement-income-inflation" },
    ],
  },
];

function main() {
  let failed = false;

  for (const sample of samples) {
    const graph = buildPageGraph(sample);
    const orphans = validateGraphOrphans(graph);
    if (orphans.length) {
      console.error(`FAIL: orphan @id on ${sample.path}:`, orphans.join(", "));
      failed = true;
    } else {
      console.log(`PASS: ${sample.path} @graph connectivity`);
    }
  }

  const dupPatterns = [
    "components/FAQSchema.tsx",
    "components/seo/GlobalSchema.tsx",
  ];
  for (const file of dupPatterns) {
    const fs = require("node:fs") as typeof import("node:fs");
    const path = require("node:path") as typeof import("node:path");
    const full = path.join(process.cwd(), file);
    if (fs.existsSync(full)) {
      console.error(`FAIL: legacy schema file still present: ${file}`);
      failed = true;
    }
  }

  const layout = require("node:fs").readFileSync(require("node:path").join(process.cwd(), "app/layout.tsx"), "utf8");
  if (layout.includes("GlobalSchema")) {
    console.error("FAIL: app/layout.tsx still injects GlobalSchema (duplicate JSON-LD)");
    failed = true;
  } else {
    console.log("PASS: root layout has no GlobalSchema duplicate");
  }

  const jsonLdFiles = [
    "app/(content)/page.tsx",
    "app/(content)/solutions/page.tsx",
    "components/contact/ContactPageView.tsx",
  ];
  for (const rel of jsonLdFiles) {
    const src = require("node:fs").readFileSync(require("node:path").join(process.cwd(), rel), "utf8");
    const blocks = (src.match(/application\/ld\+json/g) ?? []).length;
    if (blocks > 1) {
      console.error(`FAIL: ${rel} has ${blocks} JSON-LD blocks (expected 1 via PageJsonLd)`);
      failed = true;
    }
    if (blocks === 0 && !src.includes("PageJsonLd")) {
      console.error(`FAIL: ${rel} missing PageJsonLd`);
      failed = true;
    }
  }

  if (!failed) console.log("\nPhase 4 static checks passed.");
  if (failed) process.exit(1);
}

main();
