import { Resend } from "resend";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

/** Verified sender on asbrokers.co.za — override with RESEND_FROM on Vercel. */
export const DEFAULT_RESEND_FROM = "AS Brokers <albert@asbrokers.co.za>";

/** Staff inbox for form/lead alerts — override with RESEND_NOTIFY_EMAIL on Vercel. */
export const DEFAULT_STAFF_NOTIFY_EMAIL = "albert@asbrokers.co.za";

export function getResendFromAddress(): string {
  return process.env.RESEND_FROM?.trim() || DEFAULT_RESEND_FROM;
}

export function getStaffNotifyEmail(): string {
  const configured = process.env.RESEND_NOTIFY_EMAIL?.trim();
  if (configured && configured.includes("@")) return configured;
  return DEFAULT_STAFF_NOTIFY_EMAIL;
}

export async function sendEmail(input: SendEmailInput): Promise<{ ok: true; id?: string } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: getResendFromAddress(),
    to: Array.isArray(input.to) ? input.to : [input.to],
    subject: input.subject,
    html: input.html,
    text: input.text,
    replyTo: input.replyTo,
  });

  if (error) {
    return { ok: false, error: typeof error === "object" && "message" in error ? String(error.message) : JSON.stringify(error) };
  }

  return { ok: true, id: data?.id };
}
