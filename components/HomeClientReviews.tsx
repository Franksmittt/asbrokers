/**
 * Client testimonials (mock copy; replace or wire to CMS later).
 * Single-row infinite marquee; pauses on hover and respects prefers-reduced-motion.
 */

const reviews: { quote: string; who: string; where: string }[] = [
  {
    quote:
      "Albert helped us untangle the living annuity properly. First time someone explained the numbers without making me feel stupid.",
    who: "Susan M.",
    where: "Randpark Ridge",
  },
  {
    quote:
      "Business insurance was a headache. Johnny sat with us, fixed the key-man cover, and we actually understand what we're paying for now.",
    who: "Craig V.",
    where: "Northcliff",
  },
  {
    quote:
      "Het nie verwag ek sou so geduldig met my aftree-plan gehelp word nie. Johnny het elke stap uitgeskryf. Baie dankie.",
    who: "Hannelie P.",
    where: "Krugersdorp",
  },
  {
    quote:
      "Fixed-income side of things. Albert walked us through the Everest paperwork without pushing. Felt like proper advice.",
    who: "Mike & Tracy L.",
    where: "Weltevredenpark",
  },
  {
    quote: "Small business owner. Insurance finally makes sense. Cheers guys.",
    who: "Greg N.",
    where: "Roodepoort",
  },
  {
    quote:
      "Dis nie elke dag jy iemand kry wat regtig luister nie. Albert het ons erfbelasting-vrae rustig hanteer sonder paniek.",
    who: "Marius de K.",
    where: "Strubensvallei",
  },
  {
    quote:
      "Johnny's looked after us for years: investments, estate stuff, the lot. Still answers his own phone. That counts.",
    who: "Linda & Wayne H.",
    where: "Featherbrooke",
  },
  {
    quote:
      "I was wary of the alternative investment angle. They showed risks upfront, no glossy sales pitch. Good experience.",
    who: "Debbie K.",
    where: "Constantia Kloof",
  },
  {
    quote: "Business interruption claim went smoother than I expected. They knew who to speak to at the insurer.",
    who: "Pieter R.",
    where: "Kya Sand",
  },
  {
    quote: "Retirement felt like a mountain. Albert broke it into small steps. We're actually on track now.",
    who: "Michelle B.",
    where: "Wilropark",
  },
  {
    quote:
      "Johnny het my man se besigheidsdekking hersien. Ons het gatte in die polis gehad sonder dat ons dit geweet het. Nou slaap ons beter.",
    who: "Sunette V.",
    where: "Helderkruin",
  },
  {
    quote: "Local, independent, no call centre nonsense. Exactly what we wanted from an FSP.",
    who: "Johan & Karen T.",
    where: "Muldersdrift",
  },
];

function Stars() {
  return (
    <div className="mb-3 flex gap-0.5 text-supernova-gold/90" aria-hidden="true">
      {"★★★★★".split("").map((s, i) => (
        <span key={i} className="text-[11px] leading-none">
          {s}
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ quote, who, where }: { quote: string; who: string; where: string }) {
  return (
    <figure className="rim-light flex w-[272px] shrink-0 flex-col rounded-[1.5rem] border-0 p-5 sm:w-[300px] sm:p-6 md:w-[320px]">
      <Stars />
      <blockquote className="mt-1">
        <p className="text-[14px] leading-relaxed tracking-[0.01em] text-zinc-200 sm:text-[15px]">&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-4 border-t border-white/10 pt-3 text-sm text-zinc-500">
        <span className="font-semibold text-zinc-300">{who}</span>
        <span className="text-zinc-600"> · </span>
        <span>{where}</span>
      </figcaption>
    </figure>
  );
}

export function HomeClientReviews() {
  const loop = [...reviews, ...reviews];

  return (
    <section
      className="relative z-10 border-y border-white/[0.06] bg-gradient-to-b from-black/40 via-transparent to-black/30 py-16 md:py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto mb-10 max-w-2xl px-4 text-center sm:px-6 md:mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cinematic-teal">Client voices</p>
        <h2 id="reviews-heading" className="mb-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
          What people say
        </h2>
        <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
          Notes from families and business owners on investments, insurance, and retirement. Scrolls on its own; pause
          by hovering the strip.
        </p>
      </div>

      <div className="group relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-void to-transparent sm:w-16 md:w-24"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-void to-transparent sm:w-16 md:w-24"
          aria-hidden="true"
        />

        <div className="overflow-hidden">
          <div
            className="review-marquee-track flex w-max items-start gap-4 px-4 sm:gap-5 sm:px-6 md:gap-6 md:px-8"
            role="list"
          >
            {loop.map((r, index) => (
              <div
                key={`${r.who}-${r.where}-${index}`}
                className="shrink-0"
                role="listitem"
                aria-hidden={index >= reviews.length}
              >
                <ReviewCard quote={r.quote} who={r.who} where={r.where} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
    </section>
  );
}

/** Infinite row: duplicated content, translate -50%. Pause on hover; respect reduced motion. */
const MARQUEE_CSS = `
.review-marquee-track {
  animation: reviewMarquee 75s linear infinite;
}
.group:hover .review-marquee-track {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .review-marquee-track {
    animation: none !important;
  }
}
@keyframes reviewMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;
