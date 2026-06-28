/**
 * Submit test leads through production DB (mirrors live server action outcomes).
 * Usage: npx tsx scripts/submit-all-forms.ts
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";
import { spawnSync } from "child_process";

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const RUN_ID = process.env.CRM_TEST_RUN_ID ?? `demo-prep-${Date.now()}`;

async function main() {
  const {
    getDb,
    crmLeads,
    legacyChecklistLeads,
    healthyRetirementAssessments,
    businessRiskReviews,
  } = await import("../lib/db");
  const { calculateHealthyRetirementScore } = await import("../lib/healthy-retirement/scoring");
  const { calculateBusinessRiskScore } = await import("../lib/business-risk/scoring");
  const { contactLeadScore, serviceCategoryFromContactTopics } = await import("../lib/crm/contact-lead");
  const { formatBlueprintRand } = await import("../lib/blueprint/calculations");

  const db = getDb();
  if (!db) {
    console.error("DATABASE_URL missing");
    process.exit(1);
  }

  const results: Array<{ form: string; ok: boolean; detail: string }> = [];

  async function insertLead(values: typeof crmLeads.$inferInsert) {
    const [row] = await db!.insert(crmLeads).values(values).returning({ id: crmLeads.id });
    return row?.id ?? null;
  }

  // 1. Contact
  {
    const email = `contact-${RUN_ID}@test.asbrokers.co.za`;
    const topics = ["everest", "estate"];
    const id = await insertLead({
      sourceFunnel: "contact_form",
      serviceCategory: serviceCategoryFromContactTopics(topics),
      leadScore: contactLeadScore(topics),
      pipelineStatus: "new",
      rawPayload: { name: `Demo Contact ${RUN_ID}`, email, phone: "0821234567", intent: topics.join(", "), topics },
    });
    results.push({ form: "Contact (/contact)", ok: Boolean(id), detail: id ?? "failed" });
  }

  // 2. Newsletter
  {
    const email = `newsletter-${RUN_ID}@test.asbrokers.co.za`;
    const id = await insertLead({
      sourceFunnel: "newsletter",
      serviceCategory: "retirement_everest",
      leadScore: 10,
      pipelineStatus: "new",
      rawPayload: { name: "Newsletter subscriber", email, phone: "", intent: "Newsletter signup" },
    });
    results.push({ form: "Newsletter (footer)", ok: Boolean(id), detail: id ?? "failed" });
  }

  // 3. Legacy checklist
  {
    const email = `legacy-${RUN_ID}@test.asbrokers.co.za`;
    const [funnel] = await db
      .insert(legacyChecklistLeads)
      .values({
        firstName: "Demo",
        surname: `Legacy ${RUN_ID}`,
        email,
        phone: "0821112233",
        age: 58,
        businessOwner: "yes",
      })
      .returning({ id: legacyChecklistLeads.id });
    const crmId = await insertLead({
      sourceFunnel: "legacy_readiness_checklist",
      serviceCategory: "estate_business",
      leadScore: 25,
      pipelineStatus: "new",
      rawPayload: {
        name: `Demo Legacy ${RUN_ID}`,
        email,
        phone: "0821112233",
        intent: "Legacy Readiness Checklist",
        legacyChecklistLeadId: funnel?.id,
      },
    });
    results.push({
      form: "Legacy Checklist",
      ok: Boolean(funnel?.id && crmId),
      detail: `funnel=${funnel?.id ?? "none"} crm=${crmId ?? "none"}`,
    });
  }

  // 4. Healthy retirement
  {
    const email = `health-${RUN_ID}@test.asbrokers.co.za`;
    const answers = {
      age: "50-59" as const,
      exerciseDays: "3-4" as const,
      walk30Minutes: "yes" as const,
      smoke: "no" as const,
      sleepHours: "7-8" as const,
      checkup12Months: "yes" as const,
      knowBloodPressure: "yes" as const,
      knowCholesterol: "no" as const,
      healthRating: "good" as const,
      retirement20Years: "yes" as const,
    };
    const score = calculateHealthyRetirementScore(answers);
    const [funnel] = await db
      .insert(healthyRetirementAssessments)
      .values({
        firstName: `Demo Health ${RUN_ID}`,
        email,
        phone: "0823334455",
        answers,
        healthScore: score.score,
        healthGap: score.gap,
        scoreBand: score.band,
      })
      .returning({ id: healthyRetirementAssessments.id });
    const crmId = await insertLead({
      sourceFunnel: "healthy_retirement_blueprint",
      serviceCategory: "medical_wellness",
      leadScore: score.score,
      pipelineStatus: "new",
      rawPayload: {
        name: `Demo Health ${RUN_ID}`,
        email,
        phone: "0823334455",
        intent: "Healthy Retirement Blueprint",
        healthyRetirementReportId: funnel?.id,
      },
    });
    results.push({
      form: "Healthy Retirement Blueprint",
      ok: Boolean(funnel?.id && crmId),
      detail: `funnel=${funnel?.id ?? "none"} crm=${crmId ?? "none"}`,
    });
  }

  // 5. Business risk review
  {
    const email = `brr-${RUN_ID}@test.asbrokers.co.za`;
    const selected = ["buildings", "theft"];
    const score = calculateBusinessRiskScore(selected);
    const [funnel] = await db
      .insert(businessRiskReviews)
      .values({
        name: `Demo BRR ${RUN_ID}`,
        email,
        phone: "0825556677",
        company: "Demo Co Pty Ltd",
        industry: "Other",
        coverageScore: score.coveredCount,
        totalItems: score.totalCount,
        protectionPercent: score.protectionPercent,
        gapCount: score.gapCount,
        protectionBand: score.band,
        selectedCoverIds: score.selectedIds,
        missingCoverIds: score.missingIds,
      })
      .returning({ id: businessRiskReviews.id });
    const crmId = await insertLead({
      sourceFunnel: "business_risk_review",
      serviceCategory: "short_term_business",
      leadScore: score.protectionPercent,
      pipelineStatus: "new",
      rawPayload: {
        name: `Demo BRR ${RUN_ID}`,
        email,
        phone: "0825556677",
        company: "Demo Co Pty Ltd",
        intent: "Business Risk Review",
        businessRiskReportId: funnel?.id,
      },
    });
    results.push({
      form: "Business Risk Review",
      ok: Boolean(funnel?.id && crmId),
      detail: `funnel=${funnel?.id ?? "none"} crm=${crmId ?? "none"}`,
    });
  }

  // 6. Retirement survival blueprint
  {
    const email = `rsb-${RUN_ID}@test.asbrokers.co.za`;
    const gap = 3_200_000;
    const crmId = await insertLead({
      sourceFunnel: "retirement_survival_blueprint",
      serviceCategory: "retirement_everest",
      leadScore: 62,
      pipelineStatus: "new",
      rawPayload: {
        name: `Demo RSB ${RUN_ID}`,
        email,
        phone: "0827778899",
        intent: "Retirement Survival Blueprint",
        funnelData: {
          assessment: "Retirement Survival Blueprint",
          score: "62 / 100",
          keyRisk: `Gap ${formatBlueprintRand(gap)}`,
          capital: formatBlueprintRand(9_600_000),
        },
      },
    });
    results.push({
      form: "Retirement Survival Blueprint",
      ok: Boolean(crmId),
      detail: crmId ?? "failed",
    });
  }

  console.log("\n=== SUBMIT ALL FORMS (production DB) ===");
  console.log("RUN_ID:", RUN_ID);
  let allOk = true;
  for (const r of results) {
    console.log(`${r.ok ? "PASS" : "FAIL"} | ${r.form}`);
    console.log(`  ${r.detail}`);
    if (!r.ok) allOk = false;
  }

  if (!allOk) process.exit(1);

  console.log("\nVerifying CRM funnel coverage...");
  const verify = spawnSync("npx", ["tsx", "scripts/verify-crm-submissions.ts", RUN_ID], {
    stdio: "inherit",
    shell: true,
    cwd: process.cwd(),
  });
  process.exit(verify.status ?? 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
