"use client";

import dynamic from "next/dynamic";

const ContactEnquiryForm = dynamic(
  () => import("@/components/forms/ContactEnquiryForm").then((m) => m.ContactEnquiryForm),
  {
    loading: () => (
      <div className="min-h-[480px] rounded-2xl bg-stone-50 ring-1 ring-stone-200/80" aria-hidden />
    ),
  }
);

/** Code-split enquiry form — visible skeleton keeps Speed Index stable in lab audits. */
export function ContactFormDeferred() {
  return <ContactEnquiryForm />;
}
