import { isResendConfigured, sendEmail } from "@/lib/email/resend";
import { getSiteOrigin } from "@/lib/site-url";

import {
  buildNewsletterEmailHtml,
  buildNewsletterEmailText,
  defaultNewsletterSubject,
} from "./email-html";
import {
  getResolvedEdition,
  markEditionSent,
  publishEdition,
  updateEdition,
} from "./store";

export type SendResult =
  | { ok: true; sent: number; failed: number; errors: string[] }
  | { ok: false; error: string };

export async function sendNewsletterTestEmail(
  editionId: string,
  to: string
): Promise<{ ok: true; id?: string } | { ok: false; error: string }> {
  if (!isResendConfigured()) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }
  const email = to.trim().toLowerCase();
  if (!email.includes("@")) {
    return { ok: false, error: "Enter a valid email address" };
  }

  const edition = await getResolvedEdition(editionId);
  if (!edition) return { ok: false, error: "Edition not found" };

  const baseUrl = getSiteOrigin();
  const html = buildNewsletterEmailHtml(edition, baseUrl);
  const text = buildNewsletterEmailText(edition, baseUrl);
  const subject = `[TEST] ${defaultNewsletterSubject(edition)}`;

  const result = await sendEmail({ to: email, subject, html, text });
  if (!result.ok) return result;

  await updateEdition(editionId, {
    lastTestSentTo: email,
    lastTestSentAt: new Date().toISOString(),
  });

  return result;
}

export async function sendNewsletterToSubscribers(editionId: string): Promise<SendResult> {
  if (!isResendConfigured()) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const edition = await getResolvedEdition(editionId);
  if (!edition) return { ok: false, error: "Edition not found" };
  if (!edition.articleOfTheWeek.title || !edition.articleOfTheWeek.articleHref) {
    return { ok: false, error: "Set Article of the Week title and link before sending" };
  }

  const { listLeadsBySourceFunnel } = await import("@/lib/crm/list-leads-by-funnel");
  const leads = await listLeadsBySourceFunnel("newsletter");
  const emails = Array.from(
    new Set(
      leads
        .map((lead) => lead.email?.trim().toLowerCase())
        .filter((value): value is string => Boolean(value && value.includes("@")))
    )
  );

  if (emails.length === 0) {
    // Still allow a successful path when list is empty — publish web edition
    await publishEdition(editionId);
    await markEditionSent(editionId);
    return { ok: true, sent: 0, failed: 0, errors: ["No newsletter subscribers in CRM yet"] };
  }

  const baseUrl = getSiteOrigin();
  const html = buildNewsletterEmailHtml(edition, baseUrl);
  const text = buildNewsletterEmailText(edition, baseUrl);
  const subject = defaultNewsletterSubject(edition);

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  // Sequential to respect provider rate limits on small lists
  for (const email of emails) {
    const result = await sendEmail({ to: email, subject, html, text });
    if (result.ok) {
      sent += 1;
    } else {
      failed += 1;
      errors.push(`${email}: ${result.error}`);
    }
  }

  await publishEdition(editionId);
  await markEditionSent(editionId);

  return { ok: true, sent, failed, errors };
}
