/** @type {import('lighthouse').Config} */
const LIGHTHOUSE_PORT = process.env.LIGHTHOUSE_PORT || "3000";
const LIGHTHOUSE_BASE = process.env.LIGHTHOUSE_BASE || `http://127.0.0.1:${LIGHTHOUSE_PORT}`;
/** Lab mobile throttling assumes a mid-tier device; CI Ubuntu runners calibrate closer to this than slow Windows laptops. */
const CPU_SLOWDOWN = process.env.CI ? 4 : 2;

const HUB_PATHS = [
  "/",
  "/retirement",
  "/everest-wealth",
  "/insurance",
  "/estate-planning",
  "/insights",
  "/about",
  "/contact",
];

module.exports = {
  ci: {
    collect: {
      url: HUB_PATHS.map((path) => `${LIGHTHOUSE_BASE}${path === "/" ? "" : path}`),
      numberOfRuns: 1,
      startServerCommand: LIGHTHOUSE_BASE.startsWith("http://127.0.0.1")
        ? `npm run start -- -p ${LIGHTHOUSE_PORT}`
        : undefined,
      startServerReadyPattern: LIGHTHOUSE_BASE.startsWith("http://127.0.0.1") ? "Ready" : undefined,
      startServerReadyTimeout: 120_000,
      settings: {
        formFactor: "mobile",
        screenEmulation: { mobile: true },
        throttling: {
          cpuSlowdownMultiplier: CPU_SLOWDOWN,
        },
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.98 }],
        "categories:accessibility": ["error", { minScore: 0.98 }],
        "categories:best-practices": ["error", { minScore: 0.98 }],
        "categories:seo": ["error", { minScore: 0.98 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci-reports",
    },
  },
};
