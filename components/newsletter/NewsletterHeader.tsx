import Link from "next/link";

interface NewsletterHeaderProps {
  date: string;
  isArchive?: boolean;
}

export function NewsletterHeader({ date, isArchive = false }: NewsletterHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b border-stone-200 pb-8">
      <div className="text-center">
        <Link href="/" className="inline-block">
          <p className="text-2xl font-bold tracking-tight text-shark">AS Brokers</p>
          <p className="mt-1 text-sm font-medium tracking-wide text-stone-500">
            Create. Protect. Preserve.
          </p>
        </Link>
      </div>

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-shark sm:text-4xl">
          The Weekly Financial Freedom Newsletter
        </h1>
        <p className="mt-2 text-sm text-stone-500">{formattedDate}</p>

        {isArchive && (
          <Link
            href="/newsletter"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-samsung-blue hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View latest newsletter
          </Link>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <p className="text-center text-stone-600">
          Your financial plan is not something you complete once and forget about. Markets change.
          Tax changes. Your family changes. Your business changes. Your health changes. Your
          priorities change.
        </p>
        <p className="mt-4 text-center font-medium text-shark">
          This weekly newsletter is designed to help you continually review the different parts of
          your financial life — with one ultimate objective:
        </p>
        <p className="mt-4 text-center text-2xl font-bold text-samsung-blue">Financial Freedom</p>
      </div>
    </header>
  );
}
