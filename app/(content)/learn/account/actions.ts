"use server";

import {
  studentForgotPasswordSchema,
  studentResetPasswordSchema,
  studentSignInSchema,
  studentSignUpSchema,
} from "@/lib/courses/schema";
import {
  studentAccountPath,
  studentDashboardPath,
  studentResetPasswordPath,
} from "@/lib/courses/paths";
import {
  authenticateStudent,
  beginPasswordReset,
  getStudentByEmail,
  resetStudentPassword,
  upsertStudent,
} from "@/lib/courses/store";
import { setCourseStudentCookie } from "@/lib/courses/student-session";
import { isResendConfigured, sendEmail } from "@/lib/email/resend";

export type AccountAuthState = {
  ok: boolean;
  mode?: "signin" | "signup" | "forgot" | "reset";
  message?: string;
  next?: string;
};

function safeNext(formData: FormData): string {
  const raw = String(formData.get("next") ?? "");
  return raw.startsWith("/learn") && !raw.includes("://") ? raw : studentDashboardPath();
}

export async function studentSignUpAction(
  _prev: AccountAuthState,
  formData: FormData
): Promise<AccountAuthState> {
  const parsed = studentSignUpSchema.safeParse({
    firstName: formData.get("firstName"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    privacyConsent: formData.get("privacyConsent"),
    marketingConsent: formData.get("marketingConsent"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      mode: "signup",
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  const existing = await getStudentByEmail(parsed.data.email);
  if (existing?.passwordHash) {
    return {
      ok: false,
      mode: "signup",
      message: "An account with this email already exists. Sign in instead.",
    };
  }

  const student = await upsertStudent({
    firstName: parsed.data.firstName,
    surname: parsed.data.surname,
    email: parsed.data.email,
    privacyConsent: Boolean(parsed.data.privacyConsent),
    marketingConsent: Boolean(parsed.data.marketingConsent),
    password: parsed.data.password,
  });
  await setCourseStudentCookie(student.id);
  return { ok: true, mode: "signup", next: safeNext(formData) };
}

export async function studentSignInAction(
  _prev: AccountAuthState,
  formData: FormData
): Promise<AccountAuthState> {
  const parsed = studentSignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      mode: "signin",
      message: parsed.error.issues[0]?.message ?? "Check your email and password.",
    };
  }

  const student = await authenticateStudent(parsed.data.email, parsed.data.password);
  if (!student) {
    return {
      ok: false,
      mode: "signin",
      message: "Email or password is incorrect. You can reset your password below.",
    };
  }
  await setCourseStudentCookie(student.id);
  return { ok: true, mode: "signin", next: safeNext(formData) };
}

export async function studentForgotPasswordAction(
  _prev: AccountAuthState,
  formData: FormData
): Promise<AccountAuthState> {
  const parsed = studentForgotPasswordSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return {
      ok: false,
      mode: "forgot",
      message: parsed.error.issues[0]?.message ?? "Enter a valid email.",
    };
  }

  const started = await beginPasswordReset(parsed.data.email);
  // Anti-enumeration: same response whether or not the account exists.
  if (started) {
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.asbrokers.co.za"}${studentResetPasswordPath(started.token)}`;
    if (isResendConfigured()) {
      await sendEmail({
        to: parsed.data.email,
        subject: "Reset your AS Brokers Learn password",
        text: `Reset your password using this link (expires in 1 hour):\n\n${resetUrl}\n\nIf you did not ask for this, ignore this email.`,
        html: `<p>Reset your Learn password using this link (expires in 1 hour):</p><p><a href="${resetUrl}">${resetUrl}</a></p><p style="color:#666;font-size:13px">If you did not ask for this, ignore this email.</p>`,
      });
    } else {
      console.info(`[learn-password-reset] ${parsed.data.email} → ${resetUrl}`);
    }
  }

  return {
    ok: true,
    mode: "forgot",
    message: "If that email has an account, we sent a reset link.",
  };
}

export async function studentResetPasswordAction(
  _prev: AccountAuthState,
  formData: FormData
): Promise<AccountAuthState> {
  const parsed = studentResetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      mode: "reset",
      message: parsed.error.issues[0]?.message ?? "Could not reset password.",
    };
  }

  const student = await resetStudentPassword(parsed.data.token, parsed.data.password);
  if (!student) {
    return {
      ok: false,
      mode: "reset",
      message: "This reset link is invalid or has expired. Request a new one.",
    };
  }
  await setCourseStudentCookie(student.id);
  return {
    ok: true,
    mode: "reset",
    next: studentDashboardPath(),
    message: "Password updated. You are signed in.",
  };
}

export async function getAccountPathForMode(mode: "signin" | "signup", next?: string): Promise<string> {
  return studentAccountPath({ mode, next });
}
