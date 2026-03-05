"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown } from "./icons";

const serviceOptions = [
  { id: "everest", label: "Investment Review / Everest Wealth Quote" },
  { id: "medical_gap", label: "Company Medical & Gap Review" },
  { id: "medical", label: "Medical Aid" },
  { id: "gap", label: "Gap Cover" },
  { id: "short_business", label: "Short-term Business Insurance" },
  { id: "short_personal", label: "Short-term Personal Insurance" },
  { id: "life_business", label: "Life Insurance (Business)" },
  { id: "life_personal", label: "Life Insurance (Personal)" },
  { id: "will", label: "Last Will & Testament" },
  { id: "trust", label: "Trust & Business Structure" },
  { id: "wellness", label: "Wellness & Integration" },
  { id: "estate", label: "Estate Reduction Plan" },
  { id: "general", label: "General enquiry" },
];

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  topics: z.array(z.string()).min(1, "Please select at least one topic"),
  consent: z.boolean().refine((v) => v === true, { message: "Please accept to continue" }),
  website: z.string().max(0).optional(), // honeypot: must stay empty
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors";
const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

export function ContactEnquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      topics: [],
      consent: false,
      website: "",
    },
  });

  const [topicsOpen, setTopicsOpen] = useState(false);
  const topicsRef = useRef<HTMLDivElement>(null);
  const selectedTopics = watch("topics") || [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (topicsRef.current && !topicsRef.current.contains(e.target as Node)) {
        setTopicsOpen(false);
      }
    }
    if (topicsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [topicsOpen]);
  const toggleTopic = (id: string) => {
    const next = selectedTopics.includes(id)
      ? selectedTopics.filter((t) => t !== id)
      : [...selectedTopics, id];
    setValue("topics", next, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    if (data.website && String(data.website).length > 0) return; // honeypot: reject bots
    // In production: send to API
    console.log("Contact enquiry", data);
  };

  if (isSubmitSuccessful) {
    return (
      <div className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5 text-center">
        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Request received</h3>
        <p className="text-zinc-400 text-sm mb-6">
          We&apos;ll review your enquiry personally and get back to you by phone or WhatsApp. Not a call centre. You&apos;ll hear from us.
        </p>
        <a
          href="https://wa.me/27672429946"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
        >
          WhatsApp us in the meantime
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#151518] rounded-[2rem] p-8 md:p-10 border border-white/5 space-y-6">
      <div>
        <label htmlFor="fullName" className={labelClass}>Full name *</label>
        <input
          id="fullName"
          type="text"
          placeholder="Full name"
          {...register("fullName")}
          className={inputClass}
        />
        {errors.fullName && <p className="mt-1 text-sm text-amber-400">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>Phone *</label>
        <input
          id="phone"
          type="tel"
          placeholder="Phone number"
          {...register("phone")}
          className={inputClass}
        />
        {errors.phone && <p className="mt-1 text-sm text-amber-400">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email *</label>
        <input
          id="email"
          type="email"
          placeholder="Email address"
          {...register("email")}
          className={inputClass}
        />
        {errors.email && <p className="mt-1 text-sm text-amber-400">{errors.email.message}</p>}
      </div>

      {/* Honeypot: hidden from users, leave empty. Bots that fill it get rejected. */}
      <div className="absolute -left-[9999px] w-1 h-1 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div ref={topicsRef}>
        <p className={labelClass}>What would you like to discuss? *</p>
        <p className="text-zinc-500 text-xs mb-2">Select all that apply. We&apos;ll prepare for a relevant conversation.</p>
        <div className="relative">
          <button
            type="button"
            onClick={() => setTopicsOpen(!topicsOpen)}
            className={`w-full flex items-center justify-between gap-2 py-3 px-4 rounded-xl border text-left transition-colors ${
              errors.topics ? "border-amber-500/50" : "border-white/10 hover:border-white/20"
            } ${topicsOpen ? "border-blue-500/50 bg-white/5" : "bg-white/5"}`}
          >
            <span className="text-sm text-zinc-300 truncate">
              {selectedTopics.length === 0
                ? "Select topics..."
                : `${selectedTopics.length} topic${selectedTopics.length === 1 ? "" : "s"} selected`}
            </span>
            <ChevronDown className={`w-4 h-4 shrink-0 text-zinc-500 transition-transform ${topicsOpen ? "rotate-180" : ""}`} />
          </button>
          {topicsOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 py-2 max-h-56 overflow-y-auto bg-[#0f1116] border border-white/10 rounded-xl shadow-xl z-10 space-y-0.5">
              {serviceOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 py-2 px-4 cursor-pointer transition-colors hover:bg-white/5 ${
                    selectedTopics.includes(opt.id) ? "bg-blue-500/10" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(opt.id)}
                    onChange={() => toggleTopic(opt.id)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-zinc-300">{opt.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        {errors.topics && <p className="mt-1 text-sm text-amber-400">{errors.topics.message}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-xs text-zinc-500 group-hover:text-zinc-400">
            I consent to receive transactional messages related to my enquiry (appointment reminders, confirmations, account notifications). Message & data rates may apply. Reply HELP for help or STOP to opt out.
          </span>
        </label>
        {errors.consent && <p className="mt-1 text-sm text-amber-400">{errors.consent.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors mt-4"
      >
        Request a quote / review
      </button>
    </form>
  );
}
