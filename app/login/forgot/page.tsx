import { ForgotPinForm } from "@/app/login/ForgotPinForm";

export default function ForgotPinPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-vault-dark px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-vault-card/80 p-8 shadow-2xl rim-light">
        <div className="mb-8 text-center">
          <h1 className="mb-1 text-2xl font-bold text-white">Forgot your PIN?</h1>
          <p className="mb-2 text-sm text-zinc-400">
            Enter your AS Brokers work email. If it is registered for staff access, we will send a
            reset link.
          </p>
          <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-zinc-500 tabular-nums">
            FSP 17273
          </p>
        </div>

        <ForgotPinForm />
      </div>
    </div>
  );
}
