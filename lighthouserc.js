/** @type {import('lighthouse').Config} */
const LIGHTHOUSE_PORT = process.env.LIGHTHOUSE_PORT || "3000";
const base = `http://127.0.0.1:${LIGHTHOUSE_PORT}`;
/** Lab mobile throttling assumes a mid-tier device; CI Ubuntu runners calibrate closer to this than slow Windows laptops. */
const CPU_SLOWDOWN = process.env.CI ? 4 : 2;

module.exports = {
  ci: {
    collect: {
      url: [`${base}/`, `${base}/contact`],
      numberOfRuns: 3,
      startServerCommand: `npm run start -- -p ${LIGHTHOUSE_PORT}`,
      startServerReadyPattern: "Ready",
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
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci-reports",
    },
  },
};
