import Link from "next/link";
import { redirect } from "next/navigation";

import { LearnAuthForm } from "@/components/courses/LearnAuthForm";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { studentDashboardPath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

export default async function LearnAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; next?: string }>;
}) {
  const { mode, next } = await searchParams;
  const studentId = await getCourseStudentId();
  const nextPath =
    next && next.startsWith("/learn") && !next.includes("://") ? next : studentDashboardPath();

  if (studentId) redirect(nextPath);

  const initialMode = mode === "signup" ? "signup" : "signin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
          AS Brokers · Learn
        </p>
        <h1 className="mt-2 text-2xl font-bold text-shark">
          {initialMode === "signup" ? "Create your free learning account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Sign in or create an account to open courses, save progress, and pick up where you left
          off. Built for adults — no passwords to share with a class.
        </p>
        <div className="mt-6">
          <LearnAuthForm initialMode={initialMode} nextPath={nextPath} />
        </div>
        <p className="mt-6 text-center text-xs text-stone-500">
          Prefer to browse first?{" "}
          <Link href="/learn" className="font-medium text-[#0057B8] hover:underline">
            View course overview
          </Link>
        </p>
      </div>
    </div>
  );
}
