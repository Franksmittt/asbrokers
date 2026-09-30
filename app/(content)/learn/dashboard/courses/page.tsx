import Link from "next/link";
import { redirect } from "next/navigation";

import { buildStudentDashboard } from "@/lib/courses/analytics";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { studentLoginPath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

export default async function StudentCoursesPage() {
  const studentId = await getCourseStudentId();
  if (!studentId) redirect(studentLoginPath("/learn/dashboard/courses"));
  const { myCourses, availableCourses } = await buildStudentDashboard(studentId);
  const rows = [...myCourses, ...availableCourses];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-shark">My Journey</h1>
        <p className="mt-2 text-sm text-stone-600">
          Everything on your Clarity Track — courses in progress, completed, and still open to join.
        </p>
      </div>
      <ul className="space-y-3">
        {rows.map((row) => (
          <li
            key={row.course.id}
            className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-stone-200 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#006B6B]">
                {row.statusLabel}
              </p>
              <p className="mt-1 text-lg font-semibold text-shark">{row.course.title}</p>
              <p className="mt-1 text-sm text-stone-500">
                {row.enrollment ? `Progress · ${row.progressLabel}` : "Not enrolled yet"}
              </p>
            </div>
            {row.continueHref ? (
              <Link
                href={row.continueHref}
                className="inline-flex items-center justify-center rounded-full bg-[#0057B8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#004a9e]"
              >
                Open
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
