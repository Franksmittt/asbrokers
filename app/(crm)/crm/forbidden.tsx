import Link from "next/link";

/** Shown when requireCrmAccess / requireAdminAccess calls forbidden(). */
export default function CrmForbidden() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-6 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300/90">
        Access denied
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
        You do not have access to this CRM screen
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-white/65">
        Your account may be inactive, or this area is limited to managers. Sign in
        again or ask Albert to restore access.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/crm"
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
        >
          CRM home
        </Link>
        <Link
          href="/login?next=/crm"
          className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
        >
          Sign in again
        </Link>
      </div>
    </div>
  );
}
