import Link from "next/link";

export default function NewsletterStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Studio Header */}
      <header className="border-b border-[#2a2a2a] bg-[#0a0a0a]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/studio/newsletter" className="text-lg font-semibold text-white">
              Newsletter Studio
            </Link>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/studio/blog/workspace"
              className="text-zinc-400 hover:text-white"
            >
              Blog Studio
            </Link>
            <Link
              href="/studio/courses"
              className="text-zinc-400 hover:text-white"
            >
              Course Studio
            </Link>
            <Link href="/" className="text-zinc-400 hover:text-white">
              Site →
            </Link>
          </nav>
        </div>
      </header>

      <div className="px-4 py-8">{children}</div>
    </div>
  );
}
