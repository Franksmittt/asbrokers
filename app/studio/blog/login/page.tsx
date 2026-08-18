import Link from "next/link";
import { redirect } from "next/navigation";

import { getClientStudioSession, isClientStudioConfigured } from "@/lib/client-studio/session";

import { StudioLoginForm } from "./StudioLoginForm";

export const metadata = {
  title: "Insights studio login",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default async function StudioBlogLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await getClientStudioSession()) {
    redirect("/studio/blog/workspace");
  }

  const { next } = await searchParams;
  const nextPath =
    next?.startsWith("/studio/") && !next.includes("://") ? next : "/studio/blog/workspace";
  const configured = isClientStudioConfigured();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-12 sm:py-16">
      <div className="w-full max-w-md rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-6 shadow-2xl sm:p-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-zinc-600">FSP 17273</p>
          <h1 className="mb-1 text-2xl font-semibold text-white">Insights Studio</h1>
          <p className="text-sm text-zinc-500">Write and publish articles to the live site.</p>
        </div>

        {!configured ? (
          <p className="text-sm text-amber-200/90 leading-relaxed">
            This login is not active until <code className="text-amber-300">CLIENT_STUDIO_PASSWORD</code> is set on
            the server. Ask your developer to enable the studio.
          </p>
        ) : (
          <StudioLoginForm nextPath={nextPath} />
        )}

        <ul className="mt-6 space-y-2 text-left text-[11px] leading-relaxed text-zinc-500">
          <li className="flex gap-2">
            <span className="shrink-0 text-[#3ecf8e]/70">•</span>
            <span>
              Forgot the password? Contact AS Brokers  -  it is not stored in this app for security.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-[#3ecf8e]/70">•</span>
            <span>
              After login you&apos;ll see the editor, preview, and clear steps  -  nothing here changes bank or client
              records.
            </span>
          </li>
        </ul>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-500">
          Published posts appear under{" "}
          <Link href="/insights" className="text-[#3ecf8e] hover:underline">
            Insights
          </Link>{" "}
          (Blog Studio is the live publishing path for Insights).
        </p>
      </div>
    </div>
  );
}
