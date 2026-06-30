"use client";

import dynamic from "next/dynamic";

const ContactEnquiryForm = dynamic(
  () => import("@/components/forms/ContactEnquiryForm").then((m) => m.ContactEnquiryForm),
  {
    loading: () => (
      <div className="min-h-[480px] animate-pulse rounded-2xl bg-stone-100 ring-1 ring-stone-200/80" />
    ),
  }
);

export function ContactEnquiryFormLazy() {
  return <ContactEnquiryForm />;
}
