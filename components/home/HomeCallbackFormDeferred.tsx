"use client";

import dynamic from "next/dynamic";
import type { CallbackSource } from "@/lib/validations/callback-lead";

type Props = {
  source: CallbackSource;
  heading?: string;
  description?: string;
  buttonLabel?: string;
  showNote?: boolean;
  showEmail?: boolean;
  lang?: "en" | "af";
  variant?: "light" | "dark";
  className?: string;
  whatsappMessage?: string;
};

const CallbackForm = dynamic(
  () => import("@/components/forms/CallbackForm").then((m) => m.CallbackForm),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[18rem] rounded-3xl bg-white/5 ring-1 ring-white/10"
        aria-hidden
      />
    ),
  }
);

/** Homepage-only: keep callback island out of the initial JS budget / TBT. */
export function HomeCallbackFormDeferred(props: Props) {
  return <CallbackForm {...props} />;
}
