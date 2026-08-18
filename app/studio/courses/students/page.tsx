import Link from "next/link";

import {
  getCourseById,
  listEnrollmentsForStudent,
  listEventsForStudent,
  listResponsesForStudent,
  listStudents,
} from "@/lib/courses/store";
import { publishedLessons } from "@/lib/courses/progress";

export const dynamic = "force-dynamic";

export default async function CourseStudentsPage() {
  const students = listStudents();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <Link href="/studio/courses" className="text-xs text-zinc-500 hover:text-white">
          ← Courses
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">Student database</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Registrations, progress, private lesson answers, and whether the final offer was clicked. Extra fields can
          be added later without rebuilding the player.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#111] text-[11px] uppercase tracking-wide text-zinc-500">
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
            {students.map((student) => {
              const enrollments = listEnrollmentsForStudent(student.id);
              const enrollment = enrollments[0];
              const course = enrollment ? getCourseById(enrollment.courseId) : null;
              const total = course ? publishedLessons(course).length : 0;
              const events = listEventsForStudent(student.id);
              const completedLessons = events.filter((event) => event.type === "lesson_completed").length;
              const responses = listResponsesForStudent(student.id);
              return (
                <tr key={student.id} className="border-t border-[#2a2a2a] text-zinc-300">
                  <td className="px-3 py-3">
                    <Link href={`/studio/courses/students/${student.id}`} className="text-white hover:underline">
                      {student.firstName} {student.surname}
                    </Link>
                    <p className="text-[11px] text-zinc-500">{responses.length} answers</p>
                  </td>
                  <td className="px-3 py-3">{student.email}</td>
                  <td className="px-3 py-3 text-zinc-500">{student.createdAt.slice(0, 10)}</td>
                  <td className="px-3 py-3">{course?.title ?? "—"}</td>
                  <td className="px-3 py-3">
                    {enrollment ? `${completedLessons} of ${total}` : "—"}
                  </td>
                  <td className="px-3 py-3">{enrollment?.completedAt ? enrollment.completedAt.slice(0, 10) : "No"}</td>
                  <td className="px-3 py-3">{enrollment?.offerClickedAt ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
