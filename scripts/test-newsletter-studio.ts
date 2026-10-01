/**
 * Smoke-test Newsletter Studio store, email HTML, and optional Resend test send.
 *
 * Usage:
 *   npx tsx scripts/test-newsletter-studio.ts
 *   npx tsx scripts/test-newsletter-studio.ts --send solo9t9@gmail.com
 */

import { isResendConfigured } from "../lib/email/resend";
import {
  buildNewsletterEmailHtml,
  defaultNewsletterSubject,
} from "../lib/newsletter/email-html";
import { seedMockEditions } from "../lib/newsletter/seed-mocks";
import { sendNewsletterTestEmail } from "../lib/newsletter/send";
import {
  getEditionByDate,
  getResolvedEditionByDate,
  listEditions,
  listPublishedEditions,
  scheduleEdition,
  suggestedEditionDate,
} from "../lib/newsletter/store";

async function main() {
  const sendToArg = process.argv.includes("--send")
    ? process.argv[process.argv.indexOf("--send") + 1]
    : undefined;

  console.log("→ Seeding mock editions…");
  const dates = await seedMockEditions();
  console.log("  created/updated:", dates.join(", "));

  const all = await listEditions();
  const published = await listPublishedEditions();
  console.log(`→ Editions: ${all.length} total, ${published.length} web-visible`);

  for (const edition of all) {
    console.log(
      `  - ${edition.date} [${edition.status}] ${edition.articleOfTheWeek.title || "(no title)"}`
    );
  }

  const draft =
    all.find((e) => e.status === "draft") ??
    (await getEditionByDate(dates[dates.length - 1]!));

  if (!draft) {
    throw new Error("No edition available for preview/send tests");
  }

  const resolved = await getResolvedEditionByDate(draft.date);
  if (!resolved) throw new Error("Failed to resolve edition");

  const html = buildNewsletterEmailHtml(resolved, "https://www.asbrokers.co.za");
  if (!html.includes("AS Brokers") || !html.includes("FSP 17273")) {
    throw new Error("Email HTML missing brand/FAIS footer");
  }
  console.log("→ Email HTML OK (", html.length, "chars )");
  console.log("→ Subject:", defaultNewsletterSubject(resolved));

  const scheduleAt = new Date();
  scheduleAt.setDate(scheduleAt.getDate() + 1);
  scheduleAt.setHours(7, 0, 0, 0);
  await scheduleEdition(draft.id, scheduleAt.toISOString());
  const scheduled = await getEditionByDate(draft.date);
  console.log("→ Scheduled status:", scheduled?.status, scheduled?.scheduledAt);

  console.log("→ Suggested next Monday:", suggestedEditionDate());
  console.log("→ Resend configured:", isResendConfigured());

  if (sendToArg) {
    if (!isResendConfigured()) {
      console.error("✗ Cannot send — RESEND_API_KEY missing");
      process.exitCode = 1;
      return;
    }
    // Prefer a published mock with full article content for the test email
    const sendSource =
      all.find((e) => e.status === "published" && e.articleOfTheWeek.title) ?? draft;
    console.log(`→ Sending test email for ${sendSource.date} → ${sendToArg}`);
    const result = await sendNewsletterTestEmail(sendSource.id, sendToArg);
    if (!result.ok) {
      console.error("✗ Send failed:", result.error);
      process.exitCode = 1;
      return;
    }
    console.log("✓ Test email sent", result.id ? `(${result.id})` : "");
  } else {
    console.log("→ Skipping live send (pass --send email@domain.com to send)");
  }

  console.log("✓ Newsletter studio smoke test passed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
