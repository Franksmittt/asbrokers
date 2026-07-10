import {
  Home4GoalCard,
  Home4Reveal,
  HOME4_WRAP,
} from "@/components/home4/Home4Blocks";
import { HOME4_GOAL_CARDS } from "@/lib/home4-journey";

/** Image-led pathways below the hero — not overlapping dashboard widgets. */
export function Home4GoalCards() {
  return (
    <section
      id="home-pathways"
      data-chunk-boundary="true"
      className="scroll-mt-24 bg-warm-canvas py-16 md:py-24"
      aria-labelledby="home-pathways-heading"
    >
      <div className={HOME4_WRAP}>
        <Home4Reveal instant>
          <h2
            id="home-pathways-heading"
            className="max-w-2xl font-serif text-3xl tracking-tight text-shark sm:text-4xl"
          >
            What do you need help with?
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
            Pick a path. Each one leads to clear guidance, not a product catalogue.
          </p>
        </Home4Reveal>

        <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
          {HOME4_GOAL_CARDS.map((card, index) => (
            <Home4Reveal key={card.id} instant={index < 2} delay={index * 0.05}>
              <Home4GoalCard card={card} priority={index < 2} />
            </Home4Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
