import Link from "next/link";

import { ResetPasswordForm } from "@/components/courses/ResetPasswordForm";
import { studentAccountPath, studentForgotPasswordPath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
          AS Brokers · Learn
        </p>
        <h1 className="mt-2 text-2xl font-bold text-shark">Choose a new password</h1>
        {!token ? (
          <div className="mt-4 space-y-4 text-sm text-stone-600">
            <p>This reset link is missing or incomplete.</p>
            <Link
              href={studentForgotPasswordPath()}
              className="inline-flex font-semibold text-[#0057B8] hover:underline"
            >
              Request a new reset link
            </Link>
          </div>
        ) : (
          <div className="mt-6">
            <ResetPasswordForm token={token} />
          </div>
        )}
        <p className="mt-6 text-center text-xs text-stone-500">
          <Link href={studentAccountPath({ mode: "signin" })} className="font-medium text-[#0057B8] hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
