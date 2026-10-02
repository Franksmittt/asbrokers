import Link from "next/link";

import { ResetPinForm } from "@/app/login/ResetPinForm";

export default async function ResetPinPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F6F3] px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[#E5E5E5] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="mb-1 text-2xl font-bold text-[#1D1D1F]">Set a new PIN</h1>
          <p className="mb-2 text-sm text-[#52525b]">Choose a 5-digit PIN for Command Workspace.</p>
          <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-[#71717a] tabular-nums">
            FSP 17273
          </p>
        </div>

        {!token ? (
          <div className="space-y-4 text-sm text-[#52525b]">
            <p>This reset link is missing or incomplete.</p>
            <Link
              href="/login/forgot"
              className="inline-flex font-semibold text-[#0057B8] underline-offset-2 hover:underline"
            >
              Request a new reset link
            </Link>
          </div>
        ) : (
          <ResetPinForm token={token} />
        )}
      </div>
    </div>
  );
}
