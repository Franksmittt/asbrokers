"use server";

import { redirect } from "next/navigation";

import { clearCourseStudentCookie } from "@/lib/courses/student-session";
import { studentLoginPath } from "@/lib/courses/paths";

export async function studentLogoutAction(): Promise<void> {
  await clearCourseStudentCookie();
  redirect(studentLoginPath());
}
