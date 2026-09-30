import { ForgotPasswordForm } from "@/components/courses/ForgotPasswordForm";

export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
          AS Brokers · Learn
        </p>
        <h1 className="mt-2 text-2xl font-bold text-shark">Reset your password</h1>
        <p className="mt-2 text-sm text-stone-600">
          Enter the email on your learning account. We will send a secure link if it matches an
          account.
        </p>
        <div className="mt-6">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
