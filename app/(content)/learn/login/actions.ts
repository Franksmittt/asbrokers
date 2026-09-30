"use server";

import { studentLoginSchema } from "@/lib/courses/schema";
import { getStudentByEmail } from "@/lib/courses/store";
import { issueStudentOtp, studentOtpAvailable, verifyStudentOtp } from "@/lib/courses/student-otp";
import { setCourseStudentCookie } from "@/lib/courses/student-session";
import { studentDashboardPath } from "@/lib/courses/paths";
import { z } from "zod";

export type StudentLoginState = {
  ok: boolean;
  step?: "email" | "code";
  email?: string;
  message?: string;
  next?: string;
  /** True when OTP was skipped because Resend is not configured (local/dev). */
  direct?: boolean;
};

function safeNext(raw: FormData | string | null | undefined): string {
  const value = typeof raw === "string" ? raw : String(raw instanceof FormData ? raw.get("next") ?? "" : "");
  return value.startsWith("/learn") && !value.includes("://") ? value : studentDashboardPath();
}

export async function requestStudentOtpAction(
  _prev: StudentLoginState,
  formData: FormData
): Promise<StudentLoginState> {
  const parsed = studentLoginSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, step: "email", message: parsed.error.issues[0]?.message ?? "Enter a valid email." };
  }

  const email = parsed.data.email.trim().toLowerCase();
  const student = await getStudentByEmail(email);
  const next = safeNext(formData);

  // Anti-enumeration: always look successful from the outside.
  if (!student) {
    return {
      ok: true,
      step: "code",
      email,
      message: "If this email is registered, we sent a sign-in code.",
    };
  }

  // Without Resend (local/dev), keep frictionless email recognition.
  if (!studentOtpAvailable()) {
    await setCourseStudentCookie(student.id);
    return { ok: true, direct: true, next, email };
  }

  const sent = await issueStudentOtp(email);
  if (!sent.ok) {
    return { ok: false, step: "email", message: "Could not send a code right now. Try again shortly." };
  }

  return {
    ok: true,
    step: "code",
    email,
    message: "If this email is registered, we sent a sign-in code.",
  };
}

const codeSchema = z.object({
  email: z.string().trim().email(),
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code"),
});

export async function verifyStudentOtpAction(
  _prev: StudentLoginState,
  formData: FormData
): Promise<StudentLoginState> {
  const parsed = codeSchema.safeParse({
    email: formData.get("email"),
    code: formData.get("code"),
  });
  if (!parsed.success) {
    return {
      ok: false,
      step: "code",
      email: String(formData.get("email") ?? ""),
      message: parsed.error.issues[0]?.message ?? "Enter the 6-digit code.",
    };
  }

  const email = parsed.data.email.trim().toLowerCase();
  const student = await getStudentByEmail(email);
  const next = safeNext(formData);

  if (!student || !verifyStudentOtp(email, parsed.data.code)) {
    return {
      ok: false,
      step: "code",
      email,
      message: "That code is incorrect or expired. Request a new one.",
    };
  }

  await setCourseStudentCookie(student.id);
  return { ok: true, next, email };
}

/** Back-compat alias used by older form wiring. */
export async function studentLoginAction(
  prev: StudentLoginState,
  formData: FormData
): Promise<StudentLoginState> {
  return requestStudentOtpAction(prev, formData);
}
