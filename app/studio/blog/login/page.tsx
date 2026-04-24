import Link from "next/link";
import { redirect } from "next/navigation";

import { getClientStudioSession, isClientStudioConfigured } from "@/lib/client-studio/session";

import { StudioLoginForm } from "./StudioLoginForm";

export const metadata = {
  title: "Insights studio login",
  robots: "noindex, nofollow",
};

export default async function StudioBlogLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await getClientStudioSession()) {
    redirect("/studio/blog/workspace");
  }

  const { next } = await searchParams;
  const nextPath = next?.startsWith("/studio/blog") ? next : "/studio/blog/workspace";
  const configured = isClientStudioConfigured();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md rounded-[2rem] rim-light border border-white/10 bg-[#121214]/90 p-6 shadow-2xl sm:p-8">
        <div className="text-center mb-8">
          <p className="text-xs text-teal-400 font-semibold uppercase tracking-wider mb-2">AS Brokers</p>
          <h1 className="text-2xl font-bold text-white mb-1">Insights studio</h1>
          <p className="text-zinc-400 text-sm">Write HTML articles and publish to the live site.</p>
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
            <span className="shrink-0 text-teal-600">•</span>
            <span>
              Forgot the password? Contact AS Brokers  -  it is not stored in this app for security.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-teal-600">•</span>
            <span>
              After login you&apos;ll see the editor, preview, and clear steps  -  nothing here changes bank or client
              records.
            </span>
          </li>
        </ul>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-500">
          Published posts appear under{" "}
          <Link href="/insights" className="text-teal-500 hover:underline">
            Insights
          </Link>{" "}
          (separate from the main Sanity CMS).
        </p>
      </div>
    </div>
  );
}
