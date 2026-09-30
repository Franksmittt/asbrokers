import Link from "next/link";

import { buildStudentDashboard } from "@/lib/courses/analytics";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { studentCoursesPath, studentLoginPath } from "@/lib/courses/paths";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const studentId = await getCourseStudentId();
  if (!studentId) redirect(studentLoginPath("/learn/dashboard"));

  const { student, myCourses, availableCourses } = await buildStudentDashboard(studentId);
  const inProgress = myCourses.filter((row) => row.enrollment && !row.enrollment.completedAt);
  const completed = myCourses.filter((row) => row.enrollment?.completedAt);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-shark">
          Hi {student.firstName}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Your learning home. Continue a course, start a new one, or jump back to any lesson you have
          opened.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-stone-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">In progress</p>
          <p className="mt-1 text-2xl font-bold text-shark">{inProgress.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-stone-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Completed</p>
          <p className="mt-1 text-2xl font-bold text-shark">{completed.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-stone-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Available</p>
          <p className="mt-1 text-2xl font-bold text-shark">{availableCourses.length}</p>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-shark">Continue learning</h2>
          <Link href={studentCoursesPath()} className="text-sm font-medium text-[#0057B8] hover:underline">
            View all
          </Link>
        </div>
        {myCourses.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-sm text-stone-600 ring-1 ring-stone-200">
            You have not started a course yet. Pick one below to begin.
          </p>
        ) : (
          <ul className="space-y-3">
            {myCourses.map((row) => (
              <li
                key={row.course.id}
                className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-stone-200 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#006B6B]">
                    {row.statusLabel}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-shark">{row.course.title}</p>
                  <p className="mt-1 text-sm text-stone-500">Progress · {row.progressLabel}</p>
                  {row.enrollment?.paymentStatus === "pending" ? (
                    <p className="mt-2 text-sm text-amber-700">
                      This is a paid course. Albert will confirm access after payment.
                      {row.course.accessNote ? ` ${row.course.accessNote}` : ""}
                    </p>
                  ) : null}
                </div>
                {row.continueHref ? (
                  <Link
                    href={row.continueHref}
                    className="inline-flex items-center justify-center rounded-full bg-[#0057B8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#004a9e]"
                  >
                    {row.canAccessLessons
                      ? row.enrollment?.completedAt
                        ? "Review course"
                        : "Continue"
                      : "View status"}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      {availableCourses.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-shark">Start a new course</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {availableCourses.map((row) => (
              <li key={row.course.id} className="rounded-2xl bg-white p-5 ring-1 ring-stone-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B6B]">
                  {row.statusLabel}
                </p>
                <p className="mt-1 text-lg font-semibold text-shark">{row.course.title}</p>
                <p className="mt-2 line-clamp-3 text-sm text-stone-600">
                  {row.course.introduction.split("\n")[0]}
                </p>
                <Link
                  href={row.continueHref ?? "/learn"}
                  className="mt-4 inline-flex text-sm font-semibold text-[#0057B8] hover:underline"
                >
                  {row.course.access === "paid" ? "Register interest →" : "Start course →"}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
