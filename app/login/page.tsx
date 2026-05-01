import { redirect } from "next/navigation";
import { getMockSession } from "@/lib/mock-auth";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Team Office Login",
  description: "Sign in to AS Brokers team office (presentation and content).",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getMockSession();
  const { next = "/crm" } = await searchParams;
  if (session) {
    redirect(next);
  }

  return (
    <div className="min-h-screen bg-vault-dark flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] rim-light bg-vault-card/80 border border-white/10 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">AS Brokers</h1>
          <p className="text-zinc-400 text-sm mb-2">Team office</p>
          <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-zinc-500 tabular-nums">
            FSP 17273
          </p>
        </div>
        <LoginForm />
        <p className="text-zinc-500 text-[10px] text-center mt-6">
          Principals only. No client login.
        </p>
      </div>
    </div>
  );
}
