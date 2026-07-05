import { mapDbLeadToCrmLead } from "@/lib/crm/map-lead";
import { generateCrmMorningBrief, generateExecutiveReport } from "@/lib/crm/ai/generate";
import { isGeminiConfigured } from "@/lib/crm/ai/client";
import { computeConversionRate, getCrmStatsFromLeads } from "@/lib/crm/utils";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { crmLeads, getDb } from "@/lib/db";

async function main() {
  console.log("gemini_configured", isGeminiConfigured());
  const db = getDb();
  if (!db) throw new Error("no db");

  const rows = await db.select().from(crmLeads);
  const leads = rows.map(mapDbLeadToCrmLead);
  console.log("leads", leads.length);

  try {
    const brief = await generateCrmMorningBrief(leads);
    console.log("morning_brief_ok", brief?.headline ?? "null");
  } catch (error) {
    console.error("morning_brief_error", error);
  }

  try {
    const stats = getCrmStatsFromLeads(leads, 0, leads.filter((l) => l.status === "won").length);
    const byService = leads.reduce(
      (acc, l) => {
        const label = SERVICE_LABELS[l.service_category];
        acc[label] = (acc[label] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    const report = await generateExecutiveReport({
      totalLeads: stats.totalLeads,
      activePipeline:
        stats.byStatus.new +
        stats.byStatus.contacted +
        stats.byStatus.qualified +
        stats.byStatus.proposal,
      clients: stats.clients,
      conversionRate: computeConversionRate(leads),
      byStatus: stats.byStatus as Record<string, number>,
      byService,
      topLeads: [...leads].sort((a, b) => b.lead_score - a.lead_score),
    });
    console.log("executive_ok", report?.headline ?? "null");
  } catch (error) {
    console.error("executive_error", error);
  }
}

main().catch(console.error);
