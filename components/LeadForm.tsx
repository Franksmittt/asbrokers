"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

const step1Schema = z.object({ goal: z.enum(["retirement", "business", "protection"]) });
const step2Schema = z.object({ ageBracket: z.enum(["under30", "30-50", "50plus"]) });
const step3Schema = z.object({
  email: z.string().email("Valid email required"),
  phone: z.string().min(9, "Phone required"),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;

const steps = [
  { id: 1, title: "Primary goal" },
  { id: 2, title: "Age bracket" },
  { id: 3, title: "Contact details" },
];

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<Step1 & Step2 & Step3>>({});

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema), defaultValues: { goal: undefined } });
  const form2 = useForm<Step2>({ resolver: zodResolver(step2Schema), defaultValues: { ageBracket: undefined } });
  const form3 = useForm<Step3>({ resolver: zodResolver(step3Schema), defaultValues: { email: "", phone: "" } });

  const onStep1 = form1.handleSubmit((values) => {
    setData((d) => ({ ...d, ...values }));
    setStep(2);
  });
  const onStep2 = form2.handleSubmit((values) => {
    setData((d) => ({ ...d, ...values }));
    setStep(3);
  });
  const onStep3 = form3.handleSubmit((values) => {
    setData((d) => ({ ...d, ...values }));
    alert("Thank you. We'll send your preliminary advice to " + values.email);
  });

  return (
    <div className="panel p-6 sm:p-8 max-w-md mx-auto">
      <p className="font-sans text-vault-muted text-[10px] uppercase tracking-[0.2em] mb-1">
        Enquiry
      </p>
      <h3 className="font-serif text-xl font-medium text-vault-cream mb-2">
        Financial health check
      </h3>
      <p className="font-sans text-vault-muted text-sm mb-8">
        A few steps. We&apos;ll send custom preliminary advice to you.
      </p>

      <div className="flex gap-px bg-white/5 mb-8">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`h-0.5 flex-1 ${s.id <= step ? "bg-vault-brass" : "bg-white/10"}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            onSubmit={onStep1}
            className="space-y-4"
          >
            <p className="font-sans text-xs text-vault-muted uppercase tracking-widest">Primary goal?</p>
            <div className="space-y-1">
              {(["retirement", "business", "protection"] as const).map((goal) => (
                <label
                  key={goal}
                  className="flex items-center gap-3 py-3 px-4 border border-white/[0.06] hover:border-white/[0.1] cursor-pointer transition-colors"
                >
                  <input type="radio" value={goal} {...form1.register("goal")} className="accent-vault-brass" />
                  <span className="font-sans text-sm text-vault-cream capitalize">{goal}</span>
                </label>
              ))}
            </div>
            {form1.formState.errors.goal && (
              <p className="text-amber-400/90 font-sans text-xs">{form1.formState.errors.goal.message}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 border border-vault-brass text-vault-brass-light font-sans text-xs uppercase tracking-widest hover:bg-vault-brass/10 transition-colors"
            >
              Next
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            onSubmit={onStep2}
            className="space-y-4"
          >
            <p className="font-sans text-xs text-vault-muted uppercase tracking-widest">Age bracket?</p>
            <div className="space-y-1">
              {[
                { value: "under30", label: "Under 30" },
                { value: "30-50", label: "30 – 50" },
                { value: "50plus", label: "50+" },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex items-center gap-3 py-3 px-4 border border-white/[0.06] hover:border-white/[0.1] cursor-pointer transition-colors"
                >
                  <input type="radio" value={value} {...form2.register("ageBracket")} className="accent-vault-brass" />
                  <span className="font-sans text-sm text-vault-cream">{label}</span>
                </label>
              ))}
            </div>
            {form2.formState.errors.ageBracket && (
              <p className="text-amber-400/90 font-sans text-xs">{form2.formState.errors.ageBracket.message}</p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-white/20 text-vault-stone font-sans text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 border border-vault-brass text-vault-brass-light font-sans text-xs uppercase tracking-widest hover:bg-vault-brass/10 transition-colors"
              >
                Next
              </button>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form
            key="step3"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            onSubmit={onStep3}
            className="space-y-4"
          >
            <p className="font-sans text-xs text-vault-muted uppercase tracking-widest">Where to send your preliminary advice?</p>
            <input
              type="email"
              placeholder="Email"
              {...form3.register("email")}
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] text-vault-cream placeholder-vault-muted font-sans text-sm focus:border-vault-brass/50"
            />
            {form3.formState.errors.email && (
              <p className="text-amber-400/90 font-sans text-xs">{form3.formState.errors.email.message}</p>
            )}
            <input
              type="tel"
              placeholder="Phone"
              {...form3.register("phone")}
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] text-vault-cream placeholder-vault-muted font-sans text-sm focus:border-vault-brass/50"
            />
            {form3.formState.errors.phone && (
              <p className="text-amber-400/90 font-sans text-xs">{form3.formState.errors.phone.message}</p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3 border border-white/20 text-vault-stone font-sans text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 border border-vault-brass text-vault-brass-light font-sans text-xs uppercase tracking-widest hover:bg-vault-brass/10 transition-colors"
              >
                Submit
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
