import Link from "next/link";
import { redirect } from "next/navigation";

import { buildStudentDashboard } from "@/lib/courses/analytics";
import { formatStudentDisplayName } from "@/lib/courses/display-name";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { studentCoursesPath, studentLoginPath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

export default async function StudentProfilePage() {
  const studentId = await getCourseStudentId();
  if (!studentId) redirect(studentLoginPath("/learn/dashboard/profile"));

  const { student, myCourses } = await buildStudentDashboard(studentId);
  const completed = myCourses.filter((row) => row.enrollment?.completedAt).length;
  const inProgress = myCourses.filter((row) => row.enrollment && !row.enrollment.completedAt).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-shark">Your profile</h1>
        <p className="mt-2 text-sm text-stone-600">
          The details we use for your learning account. Courses you register for stay linked to this
          email.
        </p>
      </div>

      <section className="rounded-2xl bg-white p-6 ring-1 ring-stone-200">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#006B6B]">Student</p>
        <p className="mt-2 text-xl font-semibold text-shark">{formatStudentDisplayName(student)}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Email</dt>
            <dd className="mt-1 text-sm text-shark">{student.email}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Phone</dt>
            <dd className="mt-1 text-sm text-shark">{student.phone?.trim() || "Not provided"}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
              Member since
            </dt>
            <dd className="mt-1 text-sm text-shark">{student.createdAt.slice(0, 10)}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
              Updates
            </dt>
            <dd className="mt-1 text-sm text-shark">
              {student.marketingConsent ? "Happy to receive tips and offers" : "Course messages only"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-stone-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
            Courses started
          </p>
          <p className="mt-1 text-2xl font-bold text-shark">{myCourses.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-stone-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">In progress</p>
          <p className="mt-1 text-2xl font-bold text-shark">{inProgress}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-stone-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Completed</p>
          <p className="mt-1 text-2xl font-bold text-shark">{completed}</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href={studentCoursesPath()}
          className="inline-flex items-center justify-center rounded-full bg-[#0057B8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#004a9e]"
        >
          My courses
        </Link>
        <Link
          href="/learn"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-shark hover:bg-white"
        >
          Browse catalogue
        </Link>
      </div>
    </div>
  );
}
