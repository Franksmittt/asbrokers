/**
 * Verify CRM + funnel rows for a test run marker in email/name fields.
 * Usage: npx tsx scripts/verify-crm-submissions.ts [runId]
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

async function main() {
  const runId = process.argv[2] ?? "";
  if (!runId) {
    console.error("Usage: npx tsx scripts/verify-crm-submissions.ts <runId>");
    process.exit(1);
  }

  const { getDb, crmLeads, legacyChecklistLeads, healthyRetirementAssessments, businessRiskReviews } =
    await import("../lib/db");
  const { sql, desc } = await import("drizzle-orm");
  const db = getDb();
  if (!db) {
    console.error("DATABASE_URL missing");
    process.exit(1);
  }

  const pattern = `%${runId}%`;

  const crmRows = await db
    .select({
      id: crmLeads.id,
      sourceFunnel: crmLeads.sourceFunnel,
      rawPayload: crmLeads.rawPayload,
      createdAt: crmLeads.createdAt,
    })
    .from(crmLeads)
    .where(
      sql`coalesce(${crmLeads.rawPayload}->>'email','') ILIKE ${pattern}
        OR coalesce(${crmLeads.rawPayload}->>'name','') ILIKE ${pattern}`
    )
    .orderBy(desc(crmLeads.createdAt));

  const legacyRows = await db
    .select({ id: legacyChecklistLeads.id, email: legacyChecklistLeads.email, firstName: legacyChecklistLeads.firstName })
    .from(legacyChecklistLeads)
    .where(sql`${legacyChecklistLeads.email} ILIKE ${pattern} OR ${legacyChecklistLeads.firstName} ILIKE ${pattern}`);

  const healthRows = await db
    .select({ id: healthyRetirementAssessments.id, email: healthyRetirementAssessments.email, firstName: healthyRetirementAssessments.firstName })
    .from(healthyRetirementAssessments)
    .where(sql`${healthyRetirementAssessments.email} ILIKE ${pattern} OR ${healthyRetirementAssessments.firstName} ILIKE ${pattern}`);

  const brrRows = await db
    .select({ id: businessRiskReviews.id, email: businessRiskReviews.email, name: businessRiskReviews.name })
    .from(businessRiskReviews)
    .where(sql`${businessRiskReviews.email} ILIKE ${pattern} OR ${businessRiskReviews.name} ILIKE ${pattern}`);

  console.log("\n=== CRM VERIFICATION ===");
  console.log("Run ID:", runId);
  console.log("\ncrm_leads:", crmRows.length);
  for (const row of crmRows) {
    const p = row.rawPayload as Record<string, unknown>;
    console.log(`  - ${row.sourceFunnel} | ${p.name ?? "?"} | ${p.email ?? "?"} | ${row.id}`);
  }
  console.log("\nlegacy_checklist_leads:", legacyRows.length, legacyRows);
  console.log("healthy_retirement_assessments:", healthRows.length, healthRows);
  console.log("business_risk_reviews:", brrRows.length, brrRows);

  const expectedFunnels = [
    "contact_form",
    "newsletter",
    "legacy_readiness_checklist",
    "healthy_retirement_blueprint",
    "business_risk_review",
    "retirement_survival_blueprint",
  ];
  const found = new Set(crmRows.map((r) => r.sourceFunnel));
  const missing = expectedFunnels.filter((f) => !found.has(f));
  if (missing.length) {
    console.log("\nMISSING CRM funnels:", missing.join(", "));
    process.exit(1);
  }
  console.log("\nAll 6 CRM funnel types found.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
