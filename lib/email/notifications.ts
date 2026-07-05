import { sendEmail, getStaffNotifyEmail, isResendConfigured } from "@/lib/email/resend";

export type StaffNotifyResult = { ok: true; id?: string } | { ok: false; error: string };

const BRAND_FOOTER =
  "<p style='color:#888;font-size:12px;margin-top:24px'>AS Brokers CC · FSP 17273 · Krugersdorp</p>";

function wrapHtml(body: string): string {
  return `<div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:560px">${body}${BRAND_FOOTER}</div>`;
}

/** Alert Albert / team when someone submits the contact form. */
export async function notifyStaffContactEnquiry(payload: {
  fullName: string;
  email: string;
  phone: string;
  topics: string[];
}): Promise<StaffNotifyResult> {
  if (!isResendConfigured()) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  return sendEmail({
    to: getStaffNotifyEmail(),
    replyTo: payload.email,
    subject: `New website enquiry from ${payload.fullName}`,
    html: wrapHtml(`
      <h2 style="margin:0 0 12px">New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Topics:</strong> ${escapeHtml(payload.topics.join(", ") || "None selected")}</p>
    `),
  });
}

/** Auto-reply to the person who enquired. */
export async function sendContactAutoReply(payload: { fullName: string; email: string }) {
  await sendEmail({
    to: payload.email,
    subject: "We received your enquiry | AS Brokers",
    html: wrapHtml(`
      <p>Hi ${escapeHtml(payload.fullName)},</p>
      <p>Thank you for contacting AS Brokers. We have received your enquiry and will be in touch shortly.</p>
      <p>If your matter is urgent, WhatsApp us on +27 66 227 6044.</p>
    `),
  });
}

/** Newsletter welcome / confirmation. */
export async function sendNewsletterWelcome(email: string) {
  await sendEmail({
    to: email,
    subject: "You're subscribed to AS Brokers insights",
    html: wrapHtml(`
      <p>Thank you for subscribing to AS Brokers.</p>
      <p>You'll receive updates on retirement planning, wealth protection, and legacy planning for South African families.</p>
    `),
  });
}

export async function notifyStaffNewsletterSignup(email: string): Promise<StaffNotifyResult> {
  if (!isResendConfigured()) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  return sendEmail({
    to: getStaffNotifyEmail(),
    replyTo: email,
    subject: "New newsletter signup",
    html: wrapHtml(`<p><strong>Email:</strong> ${escapeHtml(email)}</p>`),
  });
}

/** Planning tools & lead magnets */
export async function notifyStaffLead(
  source: string,
  fields: Record<string, string | undefined>
): Promise<StaffNotifyResult> {
  if (!isResendConfigured()) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v!)}</p>`)
    .join("");

  const replyTo = fields.email ?? fields.Email;

  return sendEmail({
    to: getStaffNotifyEmail(),
    replyTo,
    subject: `New lead: ${source}`,
    html: wrapHtml(`<h2 style="margin:0 0 12px">${escapeHtml(source)}</h2>${rows}`),
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
