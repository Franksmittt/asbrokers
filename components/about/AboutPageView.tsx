import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { getRelatedLinks } from "@/lib/related-content";
import { ensureSixFaqs, type FAQItem } from "@/lib/seo";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const HERO_IMAGE = "/images/home4-why-independence-4x3.jpg";

const FOUNDERS = [
  {
    id: "person-albert-schuurman",
    name: "Albert Schuurman",
    role: "Co-founder & Key Individual",
    focus: "Retirement engineering, Everest Wealth, and living annuities.",
    initials: "AS",
  },
  {
    id: "person-johnny-farinha",
    name: "Johnny Farinha",
    role: "Co-founder",
    focus: "Estate structuring, business continuity, and personal life risk.",
    initials: "JF",
  },
] as const;

const SPECIALISTS = [
  { name: "Petro Vermeulen", focus: "Commercial underwriting" },
  { name: "Monique Schuurman", focus: "Personal short-term & renewals" },
  { name: "Sharine van Vollenstee", focus: "Medical aid & life onboarding" },
  { name: "Shanel van Niekerk", focus: "Claims" },
] as const;

export function AboutPageView({ faqs = [] }: { faqs?: FAQItem[] }) {
  const faqItems = ensureSixFaqs(faqs);

  return (
    <div style={{ backgroundColor: CANVAS }} className="text-shark">
      <header className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40">
        <div className={`${HOME4_WRAP} grid grid-cols-12 items-center gap-10 lg:gap-12`}>
          <div className="col-span-12 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              <span className="tabular-nums">FSP 17273</span>
              {" · "}
              <span className="tabular-nums">Category 1.8</span>
              {" · Est. 1998 · Krugersdorp"}
            </p>
            <h1
              className="mt-5 font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
            >
              Protecting your legacy. Engineering your wealth.
            </h1>
            <p
              className="mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: BODY }}
            >
              Finding an adviser aligned with <em>you</em> — not a bank&apos;s product quota — is
              hard. For 25+ years AS Brokers (FSP 17273, Category 1.8) has been an independent
              fiduciary compass for professionals, families, and business owners in Krugersdorp and
              beyond: math first, then advice.
            </p>
            <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              <a href="#independence" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
                Independence
              </a>
              <a href="#fiduciaries" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
                Fiduciaries
              </a>
              <a href="#about-faq" className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
                FAQ
              </a>
              <Link href="/calculators" prefetch={false} className="text-sm font-medium text-stone-700 hover:text-cinematic-teal">
                Calculators
              </Link>
            </nav>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden border" style={{ borderColor: HAIRLINE }}>
              <Image
                src={HERO_IMAGE}
                alt={getAlt(HERO_IMAGE, "AS Brokers Krugersdorp advisory environment")}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </header>

      <section
        id="independence"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="independence-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="independence-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            The independence advantage: FSCA Category 1.8
          </h2>
          <div className="mt-10 grid gap-10 border-t pt-10 md:grid-cols-2 lg:grid-cols-3" style={{ borderColor: HAIRLINE }}>
            <div>
              <h3 className="font-serif text-lg font-semibold tracking-tight text-shark">
                We work for you, not product houses
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                As a fully independent intermediary, we survey the market to engineer risk and wealth
                architecture around your goals — without institutional sales quotas.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold tracking-tight text-shark">
                Access to unlisted securities and Everest Wealth
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Category 1.8 (Securities and Instruments: Shares) authorisation allows advice on
                certain unlisted instruments and structured return profiles that many tied advisers
                cannot distribute — including Everest Wealth where appropriate.
              </p>
              <Link
                href="/investments"
                prefetch={false}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
              >
                Investments hub
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold tracking-tight text-shark">
                Education before advice
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Calculators, hubs, and insights exist so you understand the maths before a needs
                analysis. Submission of an enquiry is not advice under the FAIS Act.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="fiduciaries"
        className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24"
        aria-labelledby="fiduciaries-heading"
      >
        <div className={HOME4_WRAP}>
          <h2
            id="fiduciaries-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Meet the fiduciaries
          </h2>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
            Two co-founders lead advice. Specialists handle underwriting, medical aid, and claims.
          </p>

          <div className="mt-10 grid gap-px border md:grid-cols-2" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
            {FOUNDERS.map((founder) => (
              <article
                key={founder.id}
                id={founder.id}
                className="grid grid-cols-[5rem_1fr] gap-5 bg-[#F7F6F3] p-6 sm:p-8"
              >
                <div
                  className="flex aspect-square items-center justify-center border bg-white"
                  style={{ borderColor: HAIRLINE }}
                  aria-hidden
                >
                  <span className="font-serif text-2xl font-semibold tabular-nums text-stone-700">
                    {founder.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold tracking-tight text-shark">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                    {founder.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{founder.focus}</p>
                </div>
              </article>
            ))}
          </div>

          <ul className="mt-10 border-y" style={{ borderColor: HAIRLINE }}>
            {SPECIALISTS.map((person) => (
              <li
                key={person.name}
                className="grid gap-1 border-b py-4 last:border-b-0 sm:grid-cols-[14rem_1fr] sm:gap-6"
                style={{ borderColor: HAIRLINE }}
              >
                <span className="text-sm font-semibold text-shark">{person.name}</span>
                <span className="text-sm text-stone-600">{person.focus}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about-faq" className="scroll-mt-28 py-16 md:py-24" aria-labelledby="about-faq-heading">
        <div className={`${HOME4_WRAP} mx-auto max-w-3xl`}>
          <h2
            id="about-faq-heading"
            className="font-serif font-semibold tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
          >
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y border-y" style={{ borderColor: HAIRLINE }}>
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none font-semibold text-shark marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.question}</span>
                    <span className="shrink-0 text-cinematic-teal transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedContent variant="warm" links={getRelatedLinks("/about")} />

      <section className="pb-16 md:pb-24" aria-labelledby="about-routing-heading">
        <div className={HOME4_WRAP}>
          <h2 id="about-routing-heading" className="sr-only">
            Next steps
          </h2>
          <div className="grid gap-px border md:grid-cols-2" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
            <div className="bg-[#F7F6F3] p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Education
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-shark">
                Run the numbers first
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                Seventeen educational calculators for retirement, estate, insurance, and Everest
                scenarios — illustrative only.
              </p>
              <Link
                href="/calculators"
                prefetch={false}
                className="mt-6 inline-flex items-center gap-2 rounded bg-cinematic-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
              >
                Open calculators
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="bg-[#F7F6F3] p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Advice
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-shark">
                Book a consultation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                When you are ready for a needs analysis, request a Wealth Engineering Call with an
                authorised FSP 17273 adviser — not a call centre.
              </p>
              <Link
                href="/contact?source=about_terminal"
                prefetch={false}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinematic-teal hover:opacity-80"
              >
                Go to contact
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
