import { Footer } from "@/components/Footer";
import { QuizPageClient } from "@/components/quiz/QuizPageClient";

export default function QuizPage() {
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

      <QuizPageClient />
      <Footer />
    </div>
  );
}
