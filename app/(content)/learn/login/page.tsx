import Link from "next/link";

import { StudentLoginForm } from "@/components/courses/StudentLoginForm";

export const dynamic = "force-dynamic";

export default async function StudentLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath =
    next && next.startsWith("/learn") && !next.includes("://") ? next : "/learn/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
          Student portal
        </p>
        <h1 className="mt-2 text-2xl font-bold text-shark">Sign in to continue learning</h1>
        <p className="mt-2 text-sm text-stone-600">
          Use the same email you registered with on a course. No password — we recognise your
          learning profile.
        </p>
        <div className="mt-6">
          <StudentLoginForm nextPath={nextPath} />
        </div>
        <p className="mt-6 text-center text-xs text-stone-500">
          New here?{" "}
          <Link href="/learn" className="font-medium text-[#0057B8] hover:underline">
            Browse courses
          </Link>{" "}
          and register on the course you want.
        </p>
      </div>
    </div>
  );
}
