import { redirect } from "next/navigation";

import { PinLoginForm } from "./PinLoginForm";
import { resolveCrmIdentity } from "@/lib/crm/resolve-session";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next = "/crm", error } = await searchParams;
  const safeNext = next.startsWith("/") ? next : "/crm";

  const identity = await resolveCrmIdentity();
  if (identity) {
    const allowed =
      safeNext.startsWith("/crm") ||
      safeNext.startsWith("/workspace") ||
      safeNext.startsWith("/studio");
    redirect(allowed ? safeNext : "/crm");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F6F3] px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[#E5E5E5] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="mb-1 text-2xl font-bold text-[#1D1D1F]">AS Brokers</h1>
          <p className="mb-2 text-sm text-[#52525b]">Command Workspace · staff sign-in</p>
          <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-[#71717a] tabular-nums">
            FSP 17273
          </p>
        </div>

        {error === "auth" || error === "access_revoked" ? (
          <p className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Your session expired. Enter the PIN again to continue.
          </p>
        ) : null}

        <PinLoginForm nextPath={safeNext} />

        <p className="mt-6 text-center text-[10px] text-[#71717a]">
          Authorised staff only. POPIA-compliant.
        </p>
      </div>
    </div>
  );
}
