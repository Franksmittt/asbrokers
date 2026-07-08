import {
  HubContentSection,
  HubUtilityHero,
  PageWithFooter,
} from "@/components/hub/HubContentShell";
import { QuizPageClient } from "@/components/quiz/QuizPageClient";

export default function QuizPage() {
  return (
    <PageWithFooter>
      <a href="#quiz-content" className="skip-link">
        Skip to quiz
      </a>
      <HubUtilityHero
        kicker="Financial Health"
        title="Quick Financial Health Check"
        description="Answer a few questions and we'll point you to the right calculators and resources."
        centered
      />

      <HubContentSection className="pt-0">
        <QuizPageClient />
      </HubContentSection>
    </PageWithFooter>
  );
}
