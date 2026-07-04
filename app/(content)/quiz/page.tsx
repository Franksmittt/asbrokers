import { WarmPageWithFooter, WarmSection, WarmSimpleHero } from "@/components/warm/WarmShell";
import { QuizPageClient } from "@/components/quiz/QuizPageClient";

export default function QuizPage() {
  return (
    <WarmPageWithFooter>
      <a href="#quiz-content" className="skip-link">
        Skip to quiz
      </a>
      <WarmSimpleHero
        kicker="Financial Health"
        title="Quick Financial Health Check"
        description="Answer a few questions and we'll point you to the right calculators and resources."
        centered
      />

      <WarmSection className="pt-0">
        <QuizPageClient />
      </WarmSection>
    </WarmPageWithFooter>
  );
}
