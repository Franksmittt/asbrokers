"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "@/components/icons";

type Step = "concern" | "age" | "retirement" | "result";

const concerns = [
  { id: "retirement", label: "Retirement & income in later life", leads: ["/retirement", "/income-in-retirement", "/everest-wealth"] },
  { id: "estate", label: "Estate duty & leaving wealth to family", leads: ["/estate-duty-calculator", "/annual-estate-reduction-strategy"] },
  { id: "insurance", label: "Insurance & risk (life, business, medical)", leads: ["/solutions#insurance", "/premium-increase-calculator"] },
  { id: "tax", label: "Tax efficiency & income structuring", leads: ["/income-tax-calculator", "/everest-wealth"] },
  { id: "general", label: "General financial health check", leads: ["/calculators", "/contact"] },
];

const ageRanges = [
  { id: "under40", label: "Under 40" },
  { id: "40to55", label: "40 – 55" },
  { id: "55to65", label: "55 – 65" },
  { id: "65plus", label: "65+" },
];

export default function QuizPage() {
  const [step, setStep] = useState<Step>("concern");
  const [concern, setConcern] = useState<string | null>(null);
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [hasCalculatedRetirement, setHasCalculatedRetirement] = useState<boolean | null>(null);

  const handleConcern = (id: string) => {
    setConcern(id);
    setStep("age");
  };

  const handleAge = (id: string) => {
    setAgeRange(id);
    setStep("retirement");
  };

  const handleRetirement = (value: boolean) => {
    setHasCalculatedRetirement(value);
    setStep("result");
  };

  const recommendedLinks = concern ? concerns.find((c) => c.id === concern)?.leads ?? ["/calculators"] : ["/calculators"];

  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <a href="#quiz-content" className="skip-link">
        Skip to quiz
      </a>
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Financial Health</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Quick Financial Health Check
          </h1>
          <p className="text-zinc-400">
            Answer a few questions and we&apos;ll point you to the right calculators and resources.
          </p>
        </div>
      </section>

      <section id="quiz-content" className="px-4 sm:px-6 md:px-8 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card glass-card-hover rounded-2xl border border-white/10 p-6 md:p-10">
            {step === "concern" && (
              <>
                <h2 className="text-xl font-bold text-white mb-2">What&apos;s your biggest financial concern right now?</h2>
                <p className="text-zinc-500 text-sm mb-6">Choose the one that matters most to you.</p>
                <div className="space-y-3">
                  {concerns.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleConcern(c.id)}
                      className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 text-left transition-colors"
                    >
                      <span className="text-zinc-200">{c.label}</span>
                      <ArrowRight className="w-5 h-5 text-blue-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === "age" && (
              <>
                <h2 className="text-xl font-bold text-white mb-2">Roughly, which age group are you in?</h2>
                <p className="text-zinc-500 text-sm mb-6">This helps us tailor recommendations.</p>
                <div className="space-y-3">
                  {ageRanges.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => handleAge(a.id)}
                      className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 text-left transition-colors"
                    >
                      <span className="text-zinc-200">{a.label}</span>
                      <ArrowRight className="w-5 h-5 text-blue-400 shrink-0" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep("concern")}
                  className="mt-6 text-sm text-zinc-500 hover:text-zinc-300"
                >
                  ← Back
                </button>
              </>
            )}

            {step === "retirement" && (
              <>
                <h2 className="text-xl font-bold text-white mb-2">Have you ever calculated how much capital you need for retirement?</h2>
                <p className="text-zinc-500 text-sm mb-6">Many people underestimate this number.</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleRetirement(false)}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 text-zinc-200"
                  >
                    No, not really
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRetirement(true)}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 text-zinc-200"
                  >
                    Yes, I have
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("age")}
                  className="mt-6 block text-sm text-zinc-500 hover:text-zinc-300"
                >
                  ← Back
                </button>
              </>
            )}

            {step === "result" && (
              <>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                  <ArrowRight className="w-7 h-7 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Here&apos;s where to go next</h2>
                <p className="text-zinc-400 text-sm mb-6">
                  Based on your answers, these tools and pages will be most useful. Start with the first link and explore.
                </p>
                <ul className="space-y-3 mb-8">
                  {recommendedLinks.map((href) => {
                    const labels: Record<string, string> = {
                      "/retirement": "Retirement Reality Calculator",
                      "/income-in-retirement": "Income in Retirement (Run-Out) Calculator",
                      "/everest-wealth": "Everest Wealth",
                      "/estate-duty-calculator": "Estate Duty Calculator",
                      "/annual-estate-reduction-strategy": "Annual Estate Reduction Strategy",
                      "/solutions#insurance": "Insurance & Risk Solutions",
                      "/premium-increase-calculator": "Premium Increase Calculator",
                      "/income-tax-calculator": "Income Tax Calculator",
                      "/calculators": "All Calculators",
                      "/contact": "Contact us",
                    };
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          prefetch={false}
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
                        >
                          {labels[href] ?? href}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/calculators"
                    prefetch={false}
                    className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full text-sm"
                  >
                    View all calculators
                  </Link>
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full text-sm hover:bg-white/10"
                  >
                    Talk to an adviser
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
