import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { MarketingHubHero } from "@/components/hub/MarketingHubHero";
import { HubHeroActions } from "@/components/hub/HubHeroActions";
import { HubHeroAfterLink } from "@/components/hub/HubHeroAfterLink";
import { HubHeroKicker } from "@/components/hub/HubHeroKicker";
import { getAlt } from "@/lib/image-alt";
import {
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL_HREF,
} from "@/lib/office-phone";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
/** WCAG AA teal on canvas; lighter teal for shark chapters. */
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";
const HERO_IMAGE = "/images/about-hero.webp";
const PLACE_IMAGE = "/images/about-krugersdorp-trust-16x9.jpg";
const PLAQUE_IMAGE = "/images/about-fiduciary-plaque-4x3.jpg";

const PRACTICE_LEADERS = [
  {
    id: "person-albert-schuurman",
    name: "Albert Schuurman",
    role: "Founder & Key Individual",
    focus: "Retirement planning education and investment advice services.",
    photo: "/images/team-albert.jpg",
  },
  {
    id: "person-johnny-farinha",
    name: "Johnny Farinha",
    role: "Business Insurance Expert · Brits Region",
    focus: "Commercial cover and business risk for owners across Brits and surrounding areas.",
    photo: "/images/team-johnny.jpg",
  },
] as const;

const SPECIALISTS = [
  { name: "Petro Vermeulen", focus: "Commercial underwriting" },
  { name: "Monique Schuurman", focus: "Personal short-term & renewals" },
  { name: "Shanel van Niekerk", focus: "Claims" },
] as const;

export function AboutPageView({ faqs = [] }: { faqs?: FAQItem[] }) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
      {/* §1 Hero, light */}
      <MarketingHubHero
        kicker={<HubHeroKicker shortLabel="About" longLabel="About AS Brokers" />}
        title="Since 1998, we've fought the claims, structured the cover, and planned the retirements"
        description="Business owners and families on the West Rand have trusted AS Brokers CC (FSP 17273) since 1998, not for brochures, but because when a claim stalled, a renewal doubled, or retirement looked precarious, an authorised adviser answered personally."
        actions={
          <HubHeroActions primaryLabel="Meet the practice team" primaryHref="#practice-team" />
        }
        visual={
          <figure className="relative aspect-[16/10] h-full min-h-[14rem] overflow-hidden border border-stone-300/90 bg-white lg:aspect-auto">
            <picture>
              <source media="(min-width: 769px)" type="image/webp" srcSet="/images/about-hero-960.webp" />
              <source type="image/webp" srcSet="/images/about-hero-480.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized public LCP sources */}
              <img
                src="/images/about-hero-480.webp"
                alt={getAlt(HERO_IMAGE, "Adviser and client in a warm face-to-face consultation")}
                width={480}
                height={359}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </picture>
          </figure>
        }
        after={
          <HubHeroAfterLink
            prompt="Prefer place and proof first?"
            href="#place"
            label="Krugersdorp office"
          />
        }
      />

      {/* §2 Independence, shark */}
      <section
        id="independence"
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="independence-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: TEAL_ON_DARK }}
          >
            Independence
          </p>
          <h2
            id="independence-heading"
            className="mt-4 max-w-3xl font-serif font-semibold tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
          >
            Authorised Financial Services Provider, FSP 17273
          </h2>
          <div className="mt-10 grid gap-0 border-y border-white/10 md:grid-cols-3">
            <div className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:pr-8 md:py-10">
              <h3 className="font-serif text-lg font-semibold tracking-tight text-white">
                Independent intermediary
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                As an independent intermediary, we survey the market and structure advice around a
                client&apos;s circumstances after a needs analysis, without institutional sales quotas.
              </p>
            </div>
            <div className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-8 md:py-10">
              <h3 className="font-serif text-lg font-semibold tracking-tight text-white">
                Category 1.8 authorisation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Category 1.8 (Securities and Instruments: Shares) authorisation includes advice on
                certain securities and instruments, which may include unlisted instruments outside a
                standard retail unit-trust shelf. Licence category does not mean every product is
                appropriate for every client.
              </p>
              <Link
                href="/investments"
                prefetch={false}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                style={{ color: TEAL_ON_DARK }}
              >
                Investments hub
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="py-8 md:pl-8 md:py-10">
              <h3 className="font-serif text-lg font-semibold tracking-tight text-white">
                Education before advice
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Calculators, hubs, and insights exist so you understand the maths before a needs
                analysis. Submission of an enquiry is not advice under the FAIS Act.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Place & proof, light */}
      <section
        id="place"
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="place-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="place-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            A real office on the West Rand, not a call centre
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Local presence and visible compliance are trust cues you can verify. We are independent
            intermediaries you can meet, not a national script queue. Call the Krugersdorp office on{" "}
            <a
              href={OFFICE_PHONE_TEL_HREF}
              className="font-semibold tabular-nums underline-offset-2 hover:underline"
              style={{ color: TEAL }}
            >
              {OFFICE_PHONE_DISPLAY}
            </a>
            .
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6 lg:items-stretch">
            <figure className="min-w-0 lg:col-span-8">
              <div
                className="relative aspect-[16/9] overflow-hidden border bg-white lg:aspect-auto lg:h-full lg:min-h-[320px]"
                style={{ borderColor: HAIRLINE }}
              >
                <Image
                  src={PLACE_IMAGE}
                  alt={getAlt(PLACE_IMAGE, "Krugersdorp storefront with FSP 17273 signage")}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-stone-500">
                Independent financial advice · Est. presence on the West Rand ·{" "}
                <span className="tabular-nums">FSP 17273</span>
              </figcaption>
            </figure>
            <figure className="min-w-0 lg:col-span-4">
              <div
                className="relative aspect-[4/3] overflow-hidden border bg-white lg:aspect-auto lg:h-full lg:min-h-[320px]"
                style={{ borderColor: HAIRLINE }}
              >
                <Image
                  src={PLAQUE_IMAGE}
                  alt={getAlt(PLAQUE_IMAGE, "FAIS compliance binders and adviser materials on desk")}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-relaxed text-stone-500">
                Integrity cue: FAIS disclosure pack and compliance materials kept on the desk, not
                buried in a footer.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* §4 Practice team, shark */}
      <section
        id="practice-team"
        className="scroll-mt-28 bg-shark py-16 text-white md:scroll-mt-32 md:py-24"
        aria-labelledby="practice-team-heading"
      >
        <div className={HOME4_WRAP}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: TEAL_ON_DARK }}
          >
            The practice
          </p>
          <h2
            id="practice-team-heading"
            className="mt-4 font-serif font-semibold tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
          >
            Meet the practice team
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">
            Albert leads the practice as Key Individual. Johnny is the business insurance expert for the Brits region. Specialists handle underwriting, renewals, and claims.
          </p>

          <div className="mt-10 grid gap-px border border-white/10 md:grid-cols-2" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
            {PRACTICE_LEADERS.map((leader) => (
              <article
                key={leader.id}
                id={leader.id}
                className="grid grid-cols-[5.5rem_1fr] gap-5 bg-shark p-6 sm:grid-cols-[7rem_1fr] sm:p-8"
              >
                <div className="relative aspect-square overflow-hidden border border-white/15 bg-white/5">
                  <Image
                    src={leader.photo}
                    alt={getAlt(leader.photo, leader.name)}
                    fill
                    className="object-cover object-top"
                    sizes="112px"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold tracking-tight text-white">
                    {leader.name}
                  </h3>
                  <p
                    className="mt-1 text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{ color: TEAL_ON_DARK }}
                  >
                    {leader.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{leader.focus}</p>
                </div>
              </article>
            ))}
          </div>

          <ul className="mt-10 border-y border-white/10">
            {SPECIALISTS.map((person) => (
              <li
                key={person.name}
                className="grid gap-1 border-b border-white/10 py-4 last:border-b-0 sm:grid-cols-[14rem_1fr] sm:gap-6"
              >
                <span className="text-sm font-semibold text-white">{person.name}</span>
                <span className="text-sm text-white/65">{person.focus}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-white/50">
            Named desks, not call-centre queues: underwriting, medical onboarding, renewals, and
            claims stay with specialists who know the file.
          </p>
        </div>
      </section>

      {/* §5 Next steps, light */}
      <section
        className="scroll-mt-28 border-b pb-16 pt-14 md:scroll-mt-32 md:pb-24 md:pt-20"
        style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        aria-labelledby="about-routing-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="about-routing-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
              Tell us the problem, and we&apos;ll tell you what we can do about it
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            A renewal that jumped, a claim that stalled, a retirement that needs a second opinion,
            or a business that needs continuity cover. Run the numbers first if you want context,
            then book a call for a licensed needs analysis.
          </p>
          <div className="mt-10 grid gap-px border md:grid-cols-2" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
            <div className="bg-white p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Education
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-shark">
                Run the numbers first
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Educational calculators for retirement, estate, insurance, and investment
                scenarios, illustrative only.
              </p>
              <Link
                href="/calculators"
                prefetch={false}
                className="mt-6 inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Open calculators
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="bg-white p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Advice
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-shark">
                Book a consultation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                When you are ready for personal recommendations, request a needs analysis with an
                authorised FSP 17273 representative.
              </p>
              <Link
                href="/contact?source=about_terminal"
                prefetch={false}
                className="mt-6 inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Book a consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="pb-14 pt-2 md:pb-20"
        style={{ backgroundColor: CANVAS }}
        aria-label="Request a callback"
      >
        <div className={HOME4_WRAP}>
          <CallbackForm
            source="about"
            heading="Skip the forms. Just ask for a call."
            description="Leave your name and number. An authorised adviser phones you back within one business day."
            showNote
            whatsappMessage="Hi AS Brokers, please call me back."
          />
        </div>
      </section>

      {/* §6 FAQ, shark */}
      <VisibleFaqSection
        faqs={faqItems}
        id="about-faq"
        headingId="about-faq-heading"
        primaryCta={{ href: "/contact?source=about_faq", label: "Contact us" }}
      />

      {/* §7 Related, light */}
      <RelatedContent variant="warm" links={getRelatedLinks("/about")} />

      <section aria-label="General information disclaimer" className="pb-10">
        <div className={HOME4_WRAP}>
          <p className="max-w-3xl text-xs leading-relaxed text-stone-500">
            The information on this page is general information under Section 1(3)(a) of the FAIS Act, 37 of 2002, and is not financial advice or a product recommendation. Personal recommendations follow a Financial Needs Analysis with an authorised representative of AS Brokers CC (FSP 17273).
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
