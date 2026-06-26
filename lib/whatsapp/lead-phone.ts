import { sql, type SQL } from "drizzle-orm";

import { crmLeads } from "@/lib/db/schema";
import { sanitizePhone } from "@/lib/whatsapp/phone";

/** Read E.164 ZA phone from crm_leads.raw_payload.phone. */
export function phoneFromRawPayload(rawPayload: unknown): string | null {
  if (!rawPayload || typeof rawPayload !== "object") {
    return null;
  }
  const phone = (rawPayload as Record<string, unknown>).phone;
  if (typeof phone !== "string") {
    return null;
  }
  const sanitized = sanitizePhone(phone);
  return sanitized || null;
}

/** SQL expression mirroring sanitizePhone for JSONB raw_payload.phone. */
const normalizedPayloadPhoneSql = sql`(
  CASE
    WHEN regexp_replace(coalesce(${crmLeads.rawPayload}->>'phone', ''), '[^0-9]', '', 'g') ~ '^0'
    THEN '27' || substring(
      regexp_replace(coalesce(${crmLeads.rawPayload}->>'phone', ''), '[^0-9]', '', 'g') from 2
    )
    ELSE regexp_replace(coalesce(${crmLeads.rawPayload}->>'phone', ''), '[^0-9]', '', 'g')
  END
)`;

/** Drizzle WHERE clause: match lead by E.164 phone inside raw_payload.phone. */
export function leadPhoneMatches(sanitizedPhone: string): SQL {
  return sql`${normalizedPayloadPhoneSql} = ${sanitizedPhone}`;
}
