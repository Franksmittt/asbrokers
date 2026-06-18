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

export function getResendFromAddress(): string {
  return process.env.RESEND_FROM?.trim() || "AS Brokers <hello@asbrokers.co.za>";
}

export function getStaffNotifyEmail(): string | null {
  const to = process.env.RESEND_NOTIFY_EMAIL?.trim();
  return to && to.includes("@") ? to : null;
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
