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
        kicker="AS Brokers CC · FSP 17273"
        title="Quick Financial Health Check"
        description="Answer a few questions and we will point you to educational calculators and resources. This quiz is not personal financial advice and does not recommend any product."
        centered
      />

      <HubContentSection className="pt-0">
        <QuizPageClient />
      </HubContentSection>
    </PageWithFooter>
  );
}
