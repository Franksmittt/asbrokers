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
    redirect(safeNext.startsWith("/crm") ? safeNext : "/crm");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-vault-dark px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-vault-card/80 p-8 shadow-2xl rim-light">
        <div className="mb-8 text-center">
          <h1 className="mb-1 text-2xl font-bold text-white">AS Brokers CRM</h1>
          <p className="mb-2 text-sm text-zinc-400">Enter your access PIN</p>
          <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-zinc-500 tabular-nums">
            FSP 17273
          </p>
        </div>

        {error === "auth" || error === "access_revoked" ? (
          <p className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
            Your session expired. Enter the PIN again to continue.
          </p>
        ) : null}

        <PinLoginForm nextPath={safeNext} />

        <p className="mt-6 text-center text-[10px] text-zinc-500">
          Demo access for authorised staff only. POPIA-compliant.
        </p>
      </div>
    </div>
  );
}
