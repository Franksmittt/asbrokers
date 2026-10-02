/**
 * Archive CRM pipeline leads older than 14 days (non-won).
 * Contact details are kept in crm_expired_leads for newsletter / future email.
 */

import { and, eq, lt, ne, sql } from "drizzle-orm";

import { mapDbLeadToCrmLead } from "@/lib/crm/map-lead";
import { crmLeads, getDb } from "@/lib/db";
import { isPostgresConnectionError } from "@/lib/db/pg-error-chain";

export const CRM_LEAD_STALE_DAYS = 14;

export type ExpiredLeadContact = {
  id: string;
  email: string;
  name: string;
  phone: string;
  sourceFunnel: string | null;
  serviceCategory: string | null;
  originalLeadId: string | null;
  expiredAt: string;
  createdAt: string;
};

async function ensureExpiredLeadsTable(): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS crm_expired_leads (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL DEFAULT '',
      name text NOT NULL DEFAULT '',
      phone text NOT NULL DEFAULT '',
      source_funnel varchar(255),
      service_category varchar(64),
      original_lead_id uuid,
      raw_payload jsonb,
      expired_at timestamptz NOT NULL DEFAULT now(),
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS crm_expired_leads_email_idx
    ON crm_expired_leads (lower(email))
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS crm_expired_leads_expired_at_idx
    ON crm_expired_leads (expired_at DESC)
  `);
}

function staleCutoff(): Date {
  return new Date(Date.now() - CRM_LEAD_STALE_DAYS * 24 * 60 * 60 * 1000);
}

/**
 * Move stale non-won leads into crm_expired_leads, then delete from crm_leads.
 * Returns number archived. Safe to call on each CRM load (idempotent).
 */
export async function archiveStaleCrmLeads(): Promise<number> {
  const db = getDb();
  if (!db) return 0;

  try {
    await ensureExpiredLeadsTable();
    const cutoff = staleCutoff();

    const stale = await db
      .select()
      .from(crmLeads)
      .where(and(lt(crmLeads.createdAt, cutoff), ne(crmLeads.pipelineStatus, "won")));

    if (stale.length === 0) return 0;

    let archived = 0;
    for (const row of stale) {
      const mapped = mapDbLeadToCrmLead(row);
      const email = mapped.email.trim().toLowerCase();
      const name = mapped.name.trim() || "Unknown";
      const phone = mapped.phone.trim();

      await db.execute(sql`
        INSERT INTO crm_expired_leads (
          email, name, phone, source_funnel, service_category,
          original_lead_id, raw_payload, expired_at, created_at
        )
        VALUES (
          ${email},
          ${name},
          ${phone},
          ${row.sourceFunnel},
          ${row.serviceCategory},
          ${row.id},
          ${JSON.stringify(row.rawPayload ?? {})}::jsonb,
          now(),
          ${row.createdAt.toISOString()}::timestamptz
        )
      `);

      await db.delete(crmLeads).where(eq(crmLeads.id, row.id));
      archived += 1;
    }

    if (archived > 0) {
      console.info(`[crm-archive] archived ${archived} stale lead(s) (>${CRM_LEAD_STALE_DAYS}d, not won)`);
    }
    return archived;
  } catch (error) {
    if (isPostgresConnectionError(error)) return 0;
    console.error("[crm-archive] archiveStaleCrmLeads failed:", error);
    return 0;
  }
}

/** Contact list for newsletter + staff “Expired leads” view. */
export async function listExpiredLeadContacts(limit = 500): Promise<ExpiredLeadContact[]> {
  const db = getDb();
  if (!db) return [];

  try {
    await ensureExpiredLeadsTable();
    const result = await db.execute(sql`
      SELECT id, email, name, phone, source_funnel, service_category,
             original_lead_id, expired_at, created_at
      FROM crm_expired_leads
      ORDER BY expired_at DESC
      LIMIT ${limit}
    `);
    const rows = (result as { rows?: Array<Record<string, unknown>> }).rows ?? [];
    return rows.map((row) => ({
      id: String(row.id),
      email: String(row.email ?? ""),
      name: String(row.name ?? ""),
      phone: String(row.phone ?? ""),
      sourceFunnel: row.source_funnel != null ? String(row.source_funnel) : null,
      serviceCategory: row.service_category != null ? String(row.service_category) : null,
      originalLeadId: row.original_lead_id != null ? String(row.original_lead_id) : null,
      expiredAt:
        row.expired_at instanceof Date
          ? row.expired_at.toISOString()
          : String(row.expired_at ?? ""),
      createdAt:
        row.created_at instanceof Date
          ? row.created_at.toISOString()
          : String(row.created_at ?? ""),
    }));
  } catch (error) {
    if (isPostgresConnectionError(error)) return [];
    console.error("[crm-archive] listExpiredLeadContacts failed:", error);
    return [];
  }
}

/** Emails kept after archive + active newsletter funnel leads (for Resend). */
export async function listRetainedMarketingEmails(): Promise<string[]> {
  const db = getDb();
  const emails = new Set<string>();

  try {
    if (db) {
      await ensureExpiredLeadsTable();
      const expired = await db.execute(sql`
        SELECT DISTINCT lower(trim(email)) AS email
        FROM crm_expired_leads
        WHERE email LIKE '%@%'
      `);
      const expiredRows = (expired as { rows?: Array<{ email?: string }> }).rows ?? [];
      for (const row of expiredRows) {
        const email = row.email?.trim().toLowerCase();
        if (email) emails.add(email);
      }
    }
  } catch (error) {
    console.error("[crm-archive] listRetainedMarketingEmails expired lookup failed:", error);
  }

  try {
    const { listLeadsBySourceFunnel } = await import("@/lib/crm/list-leads-by-funnel");
    const leads = await listLeadsBySourceFunnel("newsletter");
    for (const lead of leads) {
      const email = lead.email?.trim().toLowerCase();
      if (email?.includes("@")) emails.add(email);
    }
  } catch (error) {
    console.error("[crm-archive] listRetainedMarketingEmails active lookup failed:", error);
  }

  return Array.from(emails);
}
