import { sendEmail, getStaffNotifyEmail } from "@/lib/email/resend";

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
}) {
  const staff = getStaffNotifyEmail();
  if (!staff) return;

  await sendEmail({
    to: staff,
    replyTo: payload.email,
    subject: `New website enquiry — ${payload.fullName}`,
    html: wrapHtml(`
      <h2 style="margin:0 0 12px">New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Topics:</strong> ${escapeHtml(payload.topics.join(", ") || "—")}</p>
    `),
  });
}

/** Auto-reply to the person who enquired. */
export async function sendContactAutoReply(payload: { fullName: string; email: string }) {
  await sendEmail({
    to: payload.email,
    subject: "We received your enquiry — AS Brokers",
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
    subject: "You're subscribed — AS Brokers insights",
    html: wrapHtml(`
      <p>Thank you for subscribing to AS Brokers.</p>
      <p>You'll receive updates on retirement planning, wealth protection, and legacy planning for South African families.</p>
    `),
  });
}

export async function notifyStaffNewsletterSignup(email: string) {
  const staff = getStaffNotifyEmail();
  if (!staff) return;

  await sendEmail({
    to: staff,
    subject: "New newsletter signup",
    html: wrapHtml(`<p><strong>Email:</strong> ${escapeHtml(email)}</p>`),
  });
}

/** Planning tools & lead magnets */
export async function notifyStaffLead(source: string, fields: Record<string, string | undefined>) {
  const staff = getStaffNotifyEmail();
  if (!staff) return;

  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v!)}</p>`)
    .join("");

  await sendEmail({
    to: staff,
    replyTo: fields.email,
    subject: `New lead — ${source}`,
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
