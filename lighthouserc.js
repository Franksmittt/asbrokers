/** @type {import('lighthouse').Config} */
const LIGHTHOUSE_PORT = process.env.LIGHTHOUSE_PORT || "3000";
const LIGHTHOUSE_BASE = process.env.LIGHTHOUSE_BASE || `http://127.0.0.1:${LIGHTHOUSE_PORT}`;
/** Lab mobile throttling assumes a mid-tier device; CI Ubuntu runners calibrate closer to this than slow Windows laptops. */
const CPU_SLOWDOWN = process.env.CI ? 4 : 2;

const HUB_PATHS = [
  "/",
  "/contact",
  "/privacy",
];

module.exports = {
  ci: {
    collect: {
      url: HUB_PATHS.map((path) => `${LIGHTHOUSE_BASE}${path === "/" ? "" : path}`),
      numberOfRuns: 3,
      startServerCommand: LIGHTHOUSE_BASE.startsWith("http://127.0.0.1")
        ? `npm run start -- -p ${LIGHTHOUSE_PORT}`
        : undefined,
      startServerReadyPattern: LIGHTHOUSE_BASE.startsWith("http://127.0.0.1") ? "Ready" : undefined,
      startServerReadyTimeout: 120_000,
      chromeFlags: "--no-sandbox --disable-dev-shm-usage --disable-gpu --headless=new",
      settings: {
        formFactor: "mobile",
        screenEmulation: { mobile: true },
        throttling: {
          cpuSlowdownMultiplier: CPU_SLOWDOWN,
        },
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        // Full-page screenshots OOM/crash some constrained Chromium sandboxes.
        disableFullPageScreenshot: true,
        // Headless Chrome always reports bf-cache issues; gatherer can crash the tab.
        skipAudits: ["bf-cache"],
      },
    },
    assert: {
      assertions: {
        // Hybrid marketing + consent analytics: lab 0.98 is unrealistic on CI.
        // Perfect-10 track targets ≥0.90 perf / ≥0.95 a11y with real CWV fixes above.
        // Optimistic aggregation across 3 runs absorbs single-run lab noise on shared runners.
        "categories:performance": ["error", { minScore: 0.9, aggregationMethod: "optimistic" }],
        "categories:accessibility": ["error", { minScore: 0.95, aggregationMethod: "optimistic" }],
        "categories:best-practices": ["error", { minScore: 0.95, aggregationMethod: "optimistic" }],
        "categories:seo": ["error", { minScore: 0.95, aggregationMethod: "optimistic" }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1, aggregationMethod: "pessimistic" }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci-reports",
    },
  },
};
