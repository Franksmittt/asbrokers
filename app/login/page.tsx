import { redirect } from "next/navigation";

import { LoginForm } from "./LoginForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { canAccessCrmRole, crmRoleFromUser, userAppRole } from "@/lib/crm/session";

export const metadata = {
  title: "Sign in",
  description: "Secure magic-link access to AS Brokers CRM and client portal.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next = "/crm", error } = await searchParams;
  const safeNext = next.startsWith("/") ? next : "/crm";

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const appRole = userAppRole(user);
      if (appRole === "client") {
        redirect("/portal");
      }
      if (canAccessCrmRole(crmRoleFromUser(user))) {
        redirect(safeNext.startsWith("/crm") ? safeNext : "/crm");
      }
      redirect(safeNext);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-vault-dark px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-vault-card/80 p-8 shadow-2xl rim-light">
        <div className="mb-8 text-center">
          <h1 className="mb-1 text-2xl font-bold text-white">AS Brokers</h1>
          <p className="mb-2 text-sm text-zinc-400">Secure staff &amp; client access</p>
          <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-zinc-500 tabular-nums">
            FSP 17273
          </p>
        </div>

        {error === "auth" ? (
          <p className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
            Your sign-in link expired or was invalid. Request a new secure link below.
          </p>
        ) : null}

        <LoginForm nextPath={safeNext} />

        <p className="mt-6 text-center text-[10px] text-zinc-500">
          Magic links expire for your protection. POPIA-compliant access only.
        </p>
      </div>
    </div>
  );
}
