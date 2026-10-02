import { redirect } from "next/navigation";
import Link from "next/link";

import {
  getCourseById,
  listEnrollmentsForStudent,
  listEventsForStudent,
  listResponsesForStudent,
  listStudents,
} from "@/lib/courses/store";
import { COURSE_STUDENT_AUTH_ENABLED } from "@/lib/courses/flags";
import { publishedLessons } from "@/lib/courses/progress";

export const dynamic = "force-dynamic";

export default async function CourseStudentsPage() {
  if (!COURSE_STUDENT_AUTH_ENABLED) {
    redirect("/studio/courses");
  }
  const students = await listStudents();
  const rows = await Promise.all(
    students.map(async (student) => {
      const enrollments = await listEnrollmentsForStudent(student.id);
      const enrollment = enrollments[0];
      const course = enrollment ? await getCourseById(enrollment.courseId) : null;
      const total = course ? publishedLessons(course).length : 0;
      const events = await listEventsForStudent(student.id);
      const completedLessons = events.filter((event) => event.type === "lesson_completed").length;
      const responses = await listResponsesForStudent(student.id);
      return { student, enrollment, course, total, completedLessons, responses };
    })
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <Link href="/studio/courses" className="text-xs text-[#52525b] hover:text-[#1D1D1F]">
          ← Courses
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-[#1D1D1F]">Student database</h1>
        <p className="mt-2 max-w-2xl text-sm text-[#52525b]">
          Registrations, progress, classroom answers, and whether the final offer was clicked. Reply to any
          answer from the student page so the group can read it.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E5E5E5]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#FAFAF8] text-[11px] uppercase tracking-wide text-[#52525b]">
            <tr>
              <th className="px-3 py-3">Student</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Registered</th>
              <th className="px-3 py-3">Course</th>
              <th className="px-3 py-3">Progress</th>
              <th className="px-3 py-3">Completed</th>
              <th className="px-3 py-3">Offer clicked</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ student, enrollment, course, total, completedLessons, responses }) => (
              <tr key={student.id} className="border-t border-[#E5E5E5] text-[#3F3F46]">
                <td className="px-3 py-3">
                  <Link href={`/studio/courses/students/${student.id}`} className="text-[#1D1D1F] hover:underline">
                    {student.firstName} {student.surname}
                  </Link>
                  <p className="text-[11px] text-[#52525b]">{responses.length} answers</p>
                </td>
                <td className="px-3 py-3">{student.email}</td>
                <td className="px-3 py-3 text-[#52525b]">{student.createdAt.slice(0, 10)}</td>
                <td className="px-3 py-3">{course?.title ?? "—"}</td>
                <td className="px-3 py-3">{enrollment ? `${completedLessons} of ${total}` : "—"}</td>
                <td className="px-3 py-3">{enrollment?.completedAt ? enrollment.completedAt.slice(0, 10) : "No"}</td>
                <td className="px-3 py-3">{enrollment?.offerClickedAt ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
