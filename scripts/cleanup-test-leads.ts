/**
 * Remove test/audit leads from CRM + funnel tables.
 * Usage: npx tsx scripts/cleanup-test-leads.ts [--dry-run]
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";
import { inArray, sql } from "drizzle-orm";

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const TEST_PATTERNS = [
  "audit726",
  "night-audit",
  "night test",
  "crm test",
  "demo-prep",
  "demo contact",
  "demo legacy",
  "demo health",
  "demo brr",
  "demo rsb",
  "@test.asbrokers.co.za",
];

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const {
    getDb,
    crmLeads,
    correspondence,
    crmTasks,
    leadReminders,
    legacyChecklistLeads,
    healthyRetirementAssessments,
    businessRiskReviews,
  } = await import("../lib/db");

  const db = getDb();
  if (!db) {
    console.error("DATABASE_URL missing");
    process.exit(1);
  }

  const patternSql = TEST_PATTERNS.map(
    (p) =>
      sql`(
        coalesce(${crmLeads.rawPayload}->>'email','') ILIKE ${`%${p}%`}
        OR coalesce(${crmLeads.rawPayload}->>'name','') ILIKE ${`%${p}%`}
        OR coalesce(${crmLeads.rawPayload}->>'intent','') ILIKE ${`%${p}%`}
        OR coalesce(${crmLeads.sourceFunnel},'') ILIKE ${`%${p}%`}
      )`
  ).reduce((acc, clause) => (acc ? sql`${acc} OR ${clause}` : clause));

  const testLeads = await db
    .select({ id: crmLeads.id, sourceFunnel: crmLeads.sourceFunnel, rawPayload: crmLeads.rawPayload })
    .from(crmLeads)
    .where(patternSql);

  const leadIds = testLeads.map((row) => row.id);

  console.log(`\n=== CLEANUP TEST LEADS ${dryRun ? "(DRY RUN)" : ""} ===`);
  console.log("Matching crm_leads:", testLeads.length);
  for (const row of testLeads) {
    const p = row.rawPayload as Record<string, unknown>;
    console.log(`  - ${row.sourceFunnel} | ${p.name ?? "?"} | ${p.email ?? "?"} | ${row.id}`);
  }

  if (dryRun) {
    console.log("\nDry run — no rows deleted.");
    return;
  }

  if (leadIds.length > 0) {
    await db.delete(correspondence).where(inArray(correspondence.leadId, leadIds));
    await db.delete(leadReminders).where(inArray(leadReminders.leadId, leadIds));
    await db.delete(crmTasks).where(inArray(crmTasks.leadId, leadIds));
    await db.delete(crmLeads).where(inArray(crmLeads.id, leadIds));
  }

  const legacyDeleted = await db
    .delete(legacyChecklistLeads)
    .where(
      sql`${legacyChecklistLeads.email} ILIKE '%@test.asbrokers.co.za%'
        OR ${legacyChecklistLeads.firstName} ILIKE '%audit726%'
        OR ${legacyChecklistLeads.firstName} ILIKE '%CRM TEST%'
        OR ${legacyChecklistLeads.firstName} ILIKE '%Demo%'
        OR ${legacyChecklistLeads.surname} ILIKE '%demo-prep%'
        OR ${legacyChecklistLeads.firstName} ILIKE '%CRM Health%'
        OR ${legacyChecklistLeads.firstName} ILIKE '%CRM BRR%'`
    )
    .returning({ id: legacyChecklistLeads.id });

  const healthDeleted = await db
    .delete(healthyRetirementAssessments)
    .where(
      sql`${healthyRetirementAssessments.email} ILIKE '%@test.asbrokers.co.za%'
        OR ${healthyRetirementAssessments.firstName} ILIKE '%audit726%'
        OR ${healthyRetirementAssessments.firstName} ILIKE '%CRM TEST%'
        OR ${healthyRetirementAssessments.firstName} ILIKE '%Demo%'`
    )
    .returning({ id: healthyRetirementAssessments.id });

  const brrDeleted = await db
    .delete(businessRiskReviews)
    .where(
      sql`${businessRiskReviews.email} ILIKE '%@test.asbrokers.co.za%'
        OR ${businessRiskReviews.name} ILIKE '%audit726%'
        OR ${businessRiskReviews.name} ILIKE '%CRM TEST%'
        OR ${businessRiskReviews.name} ILIKE '%Demo%'`
    )
    .returning({ id: businessRiskReviews.id });

  console.log("\nDeleted:");
  console.log("  crm_leads:", leadIds.length);
  console.log("  legacy_checklist_leads:", legacyDeleted.length);
  console.log("  healthy_retirement_assessments:", healthDeleted.length);
  console.log("  business_risk_reviews:", brrDeleted.length);
  console.log("\nCleanup complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
