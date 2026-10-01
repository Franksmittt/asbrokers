/**
 * Smoke-test Sourced vs Influenced growth attribution + Teacher OS data.
 *
 *   npx tsx scripts/test-growth-attribution.ts
 */

import { extractAttribution, mergeAttribution } from "../lib/attribution";
import { normalizePromoterRef, COURSE_CHAMPIONS } from "../lib/growth/champions";
import { resolveCourseServiceCategory } from "../lib/growth/course-service";
import { championCourseUrl } from "../lib/growth/links";
import {
  getFirmInfluenceSummary,
  getTeacherPipeline,
  listTouchesForStudent,
  resetGrowthStoreForTests,
  seedGrowthDemoData,
  sumInfluencePoints,
} from "../lib/growth/store";

async function main() {
  console.log("→ Champion refs");
  for (const key of ["monique", "johnny", "albert", "bogus"] as const) {
    console.log(`  ${key} →`, normalizePromoterRef(key) ?? "(none)");
  }

  console.log("→ Service category heuristics");
  console.log(
    "  medical course →",
    resolveCourseServiceCategory({ slug: "medical-aid-basics", title: "Medical Aid 101" })
  );
  console.log(
    "  business course →",
    resolveCourseServiceCategory({
      slug: "business-insurance-gaps",
      title: "Business Insurance Gaps",
    })
  );
  console.log(
    "  retirement course →",
    resolveCourseServiceCategory({
      slug: "retirement-vs-financial-freedom",
      title: "Retirement vs Financial Freedom",
    })
  );

  const url = new URL(
    "https://www.asbrokers.co.za/learn/retirement-vs-financial-freedom?ref=monique&utm_source=whatsapp"
  );
  const extracted = extractAttribution(url, "https://wa.me/");
  if (!extracted?.promoter_ref || extracted.promoter_ref !== "monique") {
    throw new Error("extractAttribution failed to capture ref=monique");
  }
  console.log("→ extractAttribution OK", extracted.promoter_ref, extracted.utm_source);

  const merged = mergeAttribution(
    { promoter_ref: "johnny", utm_source: "facebook", capturedAt: "2026-01-01T00:00:00.000Z" },
    extracted
  );
  if (merged.promoter_ref !== "johnny") {
    throw new Error("First-touch promoter should stick (johnny)");
  }
  console.log("→ first-touch promoter sticky OK");

  const link = championCourseUrl({
    courseSlug: "retirement-vs-financial-freedom",
    championKey: "monique",
  });
  if (!link.includes("ref=monique")) throw new Error("champion link missing ref");
  console.log("→ champion link", link);

  console.log("→ Reset + seed demo data");
  await resetGrowthStoreForTests();
  const seeded = await seedGrowthDemoData();
  console.log("  journeys", seeded.journeys, "influence", seeded.influence);
  if (seeded.journeys < 3) throw new Error("Expected at least 3 demo journeys");

  const moniquePoints = await sumInfluencePoints("monique");
  const johnnyPoints = await sumInfluencePoints("johnny");
  console.log("→ Influence points monique=", moniquePoints, "johnny=", johnnyPoints);
  if (moniquePoints < INFLUENCE_MIN_MONIQUE) {
    throw new Error(`Monique points too low: ${moniquePoints}`);
  }
  if (johnnyPoints < INFLUENCE_MIN_JOHNNY) {
    throw new Error(`Johnny points too low: ${johnnyPoints}`);
  }

  const pipeline = await getTeacherPipeline("monique");
  console.log("→ Monique pipeline cards", pipeline.length, pipeline.map((p) => p.stage));

  const firm = await getFirmInfluenceSummary();
  console.log(
    "→ Firm summary",
    firm.map((f) => `${f.champion.firstName}:${f.points}`).join(", ")
  );

  // Multi-course / multi-touch narrative: Lerato touches
  const leratoTouches = await listTouchesForStudent("lerato.demo+growth@asbrokers.test");
  console.log("→ Lerato timeline events", leratoTouches.length);
  if (leratoTouches.length < 1) throw new Error("Lerato should have touches");

  console.log("→ Champions configured", Object.keys(COURSE_CHAMPIONS).length);
  console.log("✓ Growth attribution smoke test passed");
}

/** enroll 10 + engaged 15 = 25 */
const INFLUENCE_MIN_MONIQUE = 25;
/** enroll 10 + engaged 15 + complete 25 + offer 20 = 70 (engaged may dedupe with complete path) */
const INFLUENCE_MIN_JOHNNY = 45;

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
