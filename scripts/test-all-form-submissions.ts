/**
 * Submit test leads through every server action, then verify CRM + funnel tables.
 * Usage: npx tsx scripts/test-all-form-submissions.ts
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const RUN_ID = `night-audit-${Date.now()}`;

type CheckResult = {
  form: string;
  submitOk: boolean;
  submitMessage?: string;
  crmFound: boolean;
  funnelFound: boolean;
  crmIntent?: string;
};

async function verifyCrmLead(sourceFunnel: string, email: string) {
  const { getDb, crmLeads } = await import("../lib/db");
  const { desc, sql } = await import("drizzle-orm");
  const db = getDb();
  if (!db) return null;

  const rows = await db
    .select()
    .from(crmLeads)
    .where(sql`${crmLeads.sourceFunnel} = ${sourceFunnel} AND ${crmLeads.rawPayload}->>'email' = ${email}`)
    .orderBy(desc(crmLeads.createdAt))
    .limit(1);

  return rows[0] ?? null;
}

async function main() {
  const { submitContactEnquiry } = await import("../app/actions/contact");
  const { subscribeNewsletter } = await import("../app/actions/newsletter");
  const { submitLegacyChecklistLead } = await import("../app/(content)/legacy-readiness-checklist/actions");
  const { submitHealthyRetirementAssessment } = await import("../app/(content)/healthy-retirement-blueprint/actions");
  const { submitBusinessRiskReview } = await import("../app/(content)/business-risk-review/actions");
  const { submitRetirementSurvivalBlueprint } = await import("../app/(content)/retirement-survival-blueprint/actions");
  const { getDb, legacyChecklistLeads, healthyRetirementAssessments, businessRiskReviews } = await import("../lib/db");
  const { eq, desc } = await import("drizzle-orm");

  const db = getDb();
  if (!db) {
    console.error("DATABASE_URL missing");
    process.exit(1);
  }

  const results: CheckResult[] = [];

  // 1. Contact form
  {
    const email = `contact-${RUN_ID}@test.asbrokers.co.za`;
    const fd = new FormData();
    fd.set("fullName", `CRM TEST Contact ${RUN_ID}`);
    fd.set("email", email);
    fd.set("phone", "0821234567");
    fd.set("topics", JSON.stringify(["everest", "estate"]));
    fd.set("consent", "true");
    const state = await submitContactEnquiry({ success: false }, fd);
    const crm = await verifyCrmLead("contact_form", email);
    results.push({
      form: "Contact (/contact)",
      submitOk: state.success,
      submitMessage: state.message,
      crmFound: Boolean(crm),
      funnelFound: true,
      crmIntent: (crm?.rawPayload as Record<string, unknown> | null)?.intent as string | undefined,
    });
  }

  // 2. Newsletter
  {
    const email = `newsletter-${RUN_ID}@test.asbrokers.co.za`;
    const fd = new FormData();
    fd.set("email", email);
    const state = await subscribeNewsletter({ success: false }, fd);
    const crm = await verifyCrmLead("newsletter", email);
    results.push({
      form: "Newsletter (footer)",
      submitOk: state.success,
      submitMessage: state.message,
      crmFound: Boolean(crm),
      funnelFound: true,
    });
  }

  // 3. Legacy checklist
  {
    const email = `legacy-${RUN_ID}@test.asbrokers.co.za`;
    const fd = new FormData();
    fd.set("firstName", "CRM");
    fd.set("surname", `Legacy ${RUN_ID}`);
    fd.set("email", email);
    fd.set("phone", "0821112233");
    fd.set("age", "58");
    fd.set("businessOwner", "yes");
    const state = await submitLegacyChecklistLead({ success: false }, fd);
    const crm = await verifyCrmLead("legacy_readiness_checklist", email);
    const [funnel] = await db
      .select()
      .from(legacyChecklistLeads)
      .where(eq(legacyChecklistLeads.email, email))
      .orderBy(desc(legacyChecklistLeads.createdAt))
      .limit(1);
    results.push({
      form: "Legacy Checklist (/legacy-readiness-checklist)",
      submitOk: state.success,
      submitMessage: state.message,
      crmFound: Boolean(crm),
      funnelFound: Boolean(funnel),
    });
  }

  // 4. Healthy retirement
  {
    const email = `health-${RUN_ID}@test.asbrokers.co.za`;
    const fd = new FormData();
    fd.set("firstName", `CRM Health ${RUN_ID}`);
    fd.set("email", email);
    fd.set("phone", "0823334455");
    fd.set("age", "50-59");
    fd.set("exerciseDays", "3-4");
    fd.set("walk30Minutes", "yes");
    fd.set("smoke", "no");
    fd.set("sleepHours", "7-8");
    fd.set("checkup12Months", "yes");
    fd.set("knowBloodPressure", "yes");
    fd.set("knowCholesterol", "no");
    fd.set("healthRating", "good");
    fd.set("retirement20Years", "yes");
    const state = await submitHealthyRetirementAssessment({ success: false }, fd);
    const crm = await verifyCrmLead("healthy_retirement_blueprint", email);
    const [funnel] = await db
      .select()
      .from(healthyRetirementAssessments)
      .where(eq(healthyRetirementAssessments.email, email))
      .orderBy(desc(healthyRetirementAssessments.createdAt))
      .limit(1);
    results.push({
      form: "Healthy Retirement (/healthy-retirement-blueprint)",
      submitOk: state.success,
      submitMessage: state.message,
      crmFound: Boolean(crm),
      funnelFound: Boolean(funnel),
    });
  }

  // 5. Business risk review
  {
    const email = `brr-${RUN_ID}@test.asbrokers.co.za`;
    const fd = new FormData();
    fd.set("name", `CRM BRR ${RUN_ID}`);
    fd.set("email", email);
    fd.set("phone", "0825556677");
    fd.set("company", "Test Co Pty Ltd");
    fd.set("industry", "Other");
    fd.append("selectedCoverIds", "buildings");
    fd.append("selectedCoverIds", "theft");
    const state = await submitBusinessRiskReview({ success: false }, fd);
    const crm = await verifyCrmLead("business_risk_review", email);
    const [funnel] = await db
      .select()
      .from(businessRiskReviews)
      .where(eq(businessRiskReviews.email, email))
      .orderBy(desc(businessRiskReviews.createdAt))
      .limit(1);
    results.push({
      form: "Business Risk Review (/business-risk-review)",
      submitOk: state.success,
      submitMessage: state.message,
      crmFound: Boolean(crm),
      funnelFound: Boolean(funnel),
    });
  }

  // 6. Retirement survival blueprint
  {
    const email = `rsb-${RUN_ID}@test.asbrokers.co.za`;
    const fd = new FormData();
    fd.set("firstName", `CRM RSB ${RUN_ID}`);
    fd.set("email", email);
    fd.set("phone", "0827778899");
    fd.set("currentAge", "52");
    fd.set("freedomAge", "65");
    fd.set("desiredMonthlyIncomeToday", "40000");
    fd.set("lifeExpectancy", "90");
    fd.set("currentSavings", "1500000");
    fd.set("monthlySavings", "5000");
    fd.set("investmentsOwned", "RA, discretionary");
    fd.set("financialFreedomScore", "62");
    fd.set("financialFreedomGap", "3200000");
    fd.set("freedomRatePercent", "9.5");
    fd.set("capitalRequired", "9600000");
    fd.set("projectedCapital", "6400000");
    fd.set("yearsToFreedom", "13");
    fd.set("onTrack", "false");
    const state = await submitRetirementSurvivalBlueprint({ success: false }, fd);
    const crm = await verifyCrmLead("retirement_survival_blueprint", email);
    results.push({
      form: "Retirement Survival (/retirement-survival-blueprint)",
      submitOk: state.success,
      submitMessage: state.message,
      crmFound: Boolean(crm),
      funnelFound: true,
    });
  }

  console.log("\n=== FORM SUBMISSION AUDIT ===");
  console.log("Run ID:", RUN_ID);
  console.log("");

  let allPass = true;
  for (const r of results) {
    const pass = r.submitOk && r.crmFound && r.funnelFound;
    if (!pass) allPass = false;
    console.log(`${pass ? "PASS" : "FAIL"} | ${r.form}`);
    console.log(`  submit: ${r.submitOk ? "OK" : "FAILED"}${r.submitMessage ? ` — ${r.submitMessage}` : ""}`);
    console.log(`  crm_leads: ${r.crmFound ? "FOUND" : "MISSING"}`);
    console.log(`  funnel table: ${r.funnelFound ? "FOUND" : "MISSING"}`);
    if (r.crmIntent) console.log(`  intent: ${r.crmIntent}`);
    console.log("");
  }

  process.exit(allPass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
