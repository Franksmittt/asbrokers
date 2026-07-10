import {
  Home4GoalCard,
  Home4Reveal,
  HOME4_WRAP,
} from "@/components/home4/Home4Blocks";
import { HOME4_GOAL_CARDS } from "@/lib/home4-journey";

/** Goal cards overlapping hero — SSR for Speed Index; images stay lazy. */
export function Home4GoalCards() {
  return (
    <div className={`${HOME4_WRAP} relative z-10 -mt-24 pb-6 sm:-mt-28 md:-mt-32`}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-5">
        {HOME4_GOAL_CARDS.map((card, index) => (
          <Home4Reveal key={card.id} instant>
            <Home4GoalCard card={card} priority={index < 2} />
          </Home4Reveal>
        ))}
      </div>
    </div>
  );
}
