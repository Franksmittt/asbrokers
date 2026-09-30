import { redirect } from "next/navigation";

import { StudentShell } from "@/components/courses/StudentShell";
import { listEnabledPromoSlides } from "@/lib/courses/store";
import { getStudentById } from "@/lib/courses/store";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { studentLoginPath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const studentId = await getCourseStudentId();
  if (!studentId) {
    redirect(studentLoginPath("/learn/dashboard"));
  }
  const student = await getStudentById(studentId);
  if (!student) {
    redirect(studentLoginPath("/learn/dashboard"));
  }
  const promoSlides = await listEnabledPromoSlides();

  return (
    <StudentShell student={student} promoSlides={promoSlides}>
      {children}
    </StudentShell>
  );
}
