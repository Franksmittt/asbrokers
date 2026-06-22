"use client";

import dynamic from "next/dynamic";

const ContactEnquiryForm = dynamic(
  () => import("@/components/forms/ContactEnquiryForm").then((m) => m.ContactEnquiryForm),
  {
    loading: () => (
      <div className="min-h-[480px] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.03]" />
    ),
  }
);

export function ContactEnquiryFormLazy() {
  return <ContactEnquiryForm />;
}
