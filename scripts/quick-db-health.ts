import { desc, sql } from "drizzle-orm";

import {
  crmAiAuditLog,
  crmLeads,
  crmStaffProfiles,
  crmTasks,
  getDb,
} from "@/lib/db";

async function main() {
  const db = getDb();
  if (!db) {
    console.error("FAIL: DATABASE_URL not set");
    process.exit(1);
  }

  const checks: { name: string; ok: boolean; detail: string }[] = [];

  const run = async (name: string, fn: () => Promise<string>) => {
    try {
      checks.push({ name, ok: true, detail: await fn() });
    } catch (error) {
      checks.push({ name, ok: false, detail: String(error) });
    }
  };

  await run("crm_leads", async () => {
    const [row] = await db.select({ c: sql<number>`count(*)::int` }).from(crmLeads);
    return `${row.c} rows`;
  });

  await run("crm_ai_audit_log", async () => {
    const [row] = await db.select({ c: sql<number>`count(*)::int` }).from(crmAiAuditLog);
    return `${row.c} rows`;
  });

  await run("crm_tasks", async () => {
    const [row] = await db.select({ c: sql<number>`count(*)::int` }).from(crmTasks);
    return `${row.c} rows`;
  });

  await run("crm_staff_profiles", async () => {
    const [row] = await db.select({ c: sql<number>`count(*)::int` }).from(crmStaffProfiles);
    return `${row.c} rows`;
  });

  await run("recent_leads", async () => {
    const rows = await db
      .select({
        id: crmLeads.id,
        status: crmLeads.pipelineStatus,
        service: crmLeads.serviceCategory,
      })
      .from(crmLeads)
      .orderBy(desc(crmLeads.createdAt))
      .limit(3);
    return JSON.stringify(rows);
  });

  for (const c of checks) {
    console.log(`${c.ok ? "OK" : "FAIL"} | ${c.name} | ${c.detail}`);
  }

  if (checks.some((c) => !c.ok)) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
