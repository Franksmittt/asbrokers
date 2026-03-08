import { redirect } from "next/navigation";
import { getMockSession, setMockSession, type MockRole } from "@/lib/mock-auth";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "CRM & Client Portal Login",
  description: "Sign in to AS Brokers CRM or Client Portal.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getMockSession();
  const { next = "/crm" } = await searchParams;
  if (session) {
    if (session.role === "client" && (next === "/crm" || next === "/portal")) redirect("/portal");
    if ((session.role === "admin" || session.role === "staff") && next === "/portal") redirect("/crm");
    redirect(next);
  }

  return (
    <div className="min-h-screen bg-vault-dark flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-vault-card border border-white/10 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">CRM & Client Portal</h1>
          <p className="text-zinc-400 text-sm">Choose a role to sign in (mock — no password)</p>
        </div>
        <LoginForm next={next} />
      </div>
      <p className="text-zinc-500 text-xs mt-6 text-center max-w-md">
        This is a mock login for development. Backend auth (e.g. Supabase Magic Links) will replace it.
      </p>
    </div>
  );
}
