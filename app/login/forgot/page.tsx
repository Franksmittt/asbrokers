import { ForgotPinForm } from "@/app/login/ForgotPinForm";

export default function ForgotPinPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F6F3] px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-[#E5E5E5] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="mb-1 text-2xl font-bold text-[#1D1D1F]">Forgot your PIN?</h1>
          <p className="mb-2 text-sm text-[#52525b]">
            Enter your AS Brokers work email. If it is registered for staff access, we will send a
            reset link.
          </p>
          <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-[#71717a] tabular-nums">
            FSP 17273
          </p>
        </div>

        <ForgotPinForm />
      </div>
    </div>
  );
}
