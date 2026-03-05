"use client";

import { useLeadForm } from "./LeadFormContext";
import { ShieldCheck, X, ChevronRight } from "./icons";

export function LeadModal() {
  const { leadFormStep, setLeadFormStep } = useLeadForm();

  if (leadFormStep === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setLeadFormStep(0)}
        aria-hidden
      />
      <div className="bg-[#151518] border border-white/10 rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl shadow-black overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            Financial Health Check
          </div>
          <button
            type="button"
            onClick={() => setLeadFormStep(0)}
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full bg-white/5 h-1">
          <div
            className="bg-blue-500 h-1 transition-all duration-300"
            style={{ width: `${(leadFormStep / 4) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {leadFormStep === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold text-white mb-6">What is your primary focus right now?</h3>
              <div className="space-y-3">
                {["Retirement Structuring", "Business Protection", "Family Life Cover", "Estate & Trust Planning"].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setLeadFormStep(2)}
                    className="w-full text-left px-5 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors flex justify-between items-center group"
                  >
                    {goal}
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {leadFormStep === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold text-white mb-6">What is your current age bracket?</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Under 35", "35 - 45", "46 - 55", "56+"].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setLeadFormStep(3)}
                    className="w-full text-center px-5 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-600 hover:border-blue-500 text-white font-medium transition-colors"
                  >
                    {age}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setLeadFormStep(1)}
                className="text-zinc-500 text-sm mt-6 hover:text-white transition-colors"
              >
                ← Back
              </button>
            </div>
          )}

          {leadFormStep === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold text-white mb-2">Where should we send your preliminary advice?</h3>
              <p className="text-zinc-400 text-sm mb-6">Albert or Johnny will review your inputs personally.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLeadFormStep(4);
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors mt-4"
                >
                  Complete Request
                </button>
              </form>
              <button
                type="button"
                onClick={() => setLeadFormStep(2)}
                className="text-zinc-500 text-sm mt-4 hover:text-white transition-colors"
              >
                ← Back
              </button>
            </div>
          )}

          {leadFormStep === 4 && (
            <div className="animate-fade-in text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Request Secured.</h3>
              <p className="text-zinc-400 text-sm mb-8">
                Our Fiduciary Partners are reviewing your profile. You will receive an encrypted email shortly.
              </p>
              <button
                type="button"
                onClick={() => setLeadFormStep(0)}
                className="bg-white/10 text-white font-medium py-3 px-8 rounded-full hover:bg-white/20 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
