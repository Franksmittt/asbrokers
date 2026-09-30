"use server";

import { studentLoginSchema } from "@/lib/courses/schema";
import { getStudentByEmail } from "@/lib/courses/store";
import { setCourseStudentCookie } from "@/lib/courses/student-session";
import { studentDashboardPath } from "@/lib/courses/paths";

export type StudentLoginState = {
  ok: boolean;
  message?: string;
  next?: string;
};

export async function studentLoginAction(
  _prev: StudentLoginState,
  formData: FormData
): Promise<StudentLoginState> {
  const parsed = studentLoginSchema.safeParse({
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Enter a valid email." };
  }

  const student = await getStudentByEmail(parsed.data.email);
  if (!student) {
    return {
      ok: false,
      message: "We could not find a student profile for that email. Register on a course first.",
    };
  }

  await setCourseStudentCookie(student.id);
  const nextRaw = String(formData.get("next") ?? studentDashboardPath());
  const next =
    nextRaw.startsWith("/learn") && !nextRaw.includes("://") ? nextRaw : studentDashboardPath();
  return { ok: true, next };
}
