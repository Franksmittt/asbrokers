import Image from "next/image";
import Link from "next/link";

import { getAlt } from "@/lib/image-alt";
import { CORE_PRODUCT_PARTNERS, PARTNER_GROUPS } from "@/lib/home2-partners";
import { formatDateEnZa } from "@/lib/format-date";

/** 12-column editorial grid — Swiss-style asymmetric layouts for /home2 only. */
export const HOME2_GRID = "grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8";
export const HOME2_WRAP = "mx-auto max-w-7xl px-4 sm:px-6 md:px-8";

type Tone = "paper" | "ink";

export function Home2Section({
  tone = "ink",
  className = "",
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const bg = tone === "paper" ? "bg-[#f2f0ea] text-[#141414]" : "bg-[#0e0e10] text-[#e8e6e1]";
  return (
    <section id={id} className={`border-y border-black ${bg} ${className}`}>
      <div className={`${HOME2_WRAP} py-14 md:py-20`}>{children}</div>
    </section>
  );
}

export function Home2Kicker({ children, tone = "ink" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <p
      className={`text-[13px] font-medium leading-snug ${tone === "paper" ? "text-[#5c5a55]" : "text-[#9a9893]"}`}
    >
      {children}
    </p>
  );
}

export function Home2Heading({
  children,
  as: Tag = "h2",
  tone = "ink",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  tone?: Tone;
  className?: string;
}) {
  return (
    <Tag
      className={`font-semibold tracking-[-0.03em] ${tone === "paper" ? "text-[#141414]" : "text-white"} ${
        Tag === "h1"
          ? "text-[clamp(2.25rem,1.6rem+2.8vw,3.75rem)] leading-[1.08]"
          : Tag === "h2"
            ? "text-[clamp(1.75rem,1.35rem+1.6vw,2.5rem)] leading-[1.12]"
            : "text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-snug"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Home2Rule({ tone = "ink" }: { tone?: Tone }) {
  return <hr className={`my-8 border-0 border-t-2 ${tone === "paper" ? "border-black" : "border-white"}`} />;
}

export function Home2Button({
  href,
  children,
  variant = "solid",
  tone = "ink",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  tone?: Tone;
  external?: boolean;
}) {
  const solid =
    tone === "paper"
      ? "bg-[#141414] text-[#f2f0ea] hover:bg-black"
      : "bg-white text-black hover:bg-[#e8e6e1]";
  const outline =
    tone === "paper"
      ? "border-2 border-black text-[#141414] hover:bg-black hover:text-[#f2f0ea]"
      : "border-2 border-white text-white hover:bg-white hover:text-black";
  const className = `inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition-colors duration-150 ${variant === "solid" ? solid : outline}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Home2Figure({
  src,
  alt,
  aspect = "16/9",
  priority,
  caption,
  tone = "ink",
}: {
  src: string;
  alt?: string;
  aspect?: "16/9" | "4/3" | "3/2";
  priority?: boolean;
  caption?: string;
  tone?: Tone;
}) {
  const ratio = aspect === "4/3" ? "aspect-[4/3]" : aspect === "3/2" ? "aspect-[3/2]" : "aspect-video";
  const resolvedAlt = alt ?? getAlt(src);
  return (
    <figure>
      <div className={`relative w-full overflow-hidden border-2 border-black ${ratio}`}>
        <Image
          src={src}
          alt={resolvedAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 720px"
          priority={priority}
        />
      </div>
      {caption ? (
        <figcaption
          className={`mt-2 max-w-prose text-[13px] leading-relaxed ${tone === "paper" ? "text-[#5c5a55]" : "text-[#9a9893]"}`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Home2MediaBand({ src, alt }: { src: string; alt?: string }) {
  const resolvedAlt = alt ?? getAlt(src);
  return (
    <div className="border-y-2 border-black">
      <div className="relative aspect-[21/9] w-full md:aspect-[3/1]">
        <Image src={src} alt={resolvedAlt} fill className="object-cover" sizes="100vw" />
      </div>
    </div>
  );
}

export function Home2Credentials() {
  return (
    <div className={`${HOME2_WRAP} border-b-2 border-black bg-[#141414] py-6 text-[#e8e6e1]`}>
      <div className={`${HOME2_GRID} items-baseline gap-y-4 text-sm`}>
        <p className="col-span-12 font-semibold text-white md:col-span-3">AS Brokers CC</p>
        <dl className="col-span-12 grid gap-x-6 gap-y-2 sm:grid-cols-2 md:col-span-9 md:grid-cols-4">
          <div>
            <dt className="text-[#9a9893]">Licence</dt>
            <dd className="font-medium text-white">FSP 17273 · Category 1.8</dd>
          </div>
          <div>
            <dt className="text-[#9a9893]">Established</dt>
            <dd className="font-medium text-white">1998 · Krugersdorp</dd>
          </div>
          <div>
            <dt className="text-[#9a9893]">Experience</dt>
            <dd className="font-medium text-white">25+ years</dd>
          </div>
          <div>
            <dt className="text-[#9a9893]">Key partners</dt>
            <dd className="font-medium text-white">Everest · Santam · Old Mutual · Bryte</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function Home2Partners() {
  return (
    <>
      <Home2Kicker tone="paper">Independent advice (FSP 17273)</Home2Kicker>
      <Home2Heading as="h2" tone="paper" className="mt-2">
        Who we work with
      </Home2Heading>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#5c5a55]">
        We compare schemes and products for your situation. Membership stays with the insurer or medical scheme you
        choose — we advise, structure, and place business with recognised providers.
      </p>

      <div className="mt-10 border-2 border-black">
        <div className="grid border-b-2 border-black md:grid-cols-4">
          {CORE_PRODUCT_PARTNERS.map((p) => (
            <div key={p.name} className="border-b-2 border-black p-4 last:border-b-0 md:border-b-0 md:border-r-2 md:last:border-r-0">
              <p className="font-semibold text-[#141414]">{p.name}</p>
              <p className="mt-1 text-[13px] leading-snug text-[#5c5a55]">{p.note}</p>
            </div>
          ))}
        </div>
        <div className="divide-y-2 divide-black">
          {PARTNER_GROUPS.map((group) => (
            <div key={group.id} className={`${HOME2_GRID} gap-y-2 py-4 md:items-baseline`}>
              <div className="col-span-12 md:col-span-4">
                <h3 className="font-semibold text-[#141414]">{group.label}</h3>
              </div>
              <p className="col-span-12 text-[14px] leading-relaxed text-[#5c5a55] md:col-span-5">{group.description}</p>
              <p className="col-span-12 text-[14px] text-[#141414] md:col-span-3 md:text-right">
                {group.names.join(" · ")}
                {group.href ? (
                  <>
                    {" "}
                    <Link href={group.href} className="font-medium underline underline-offset-2">
                      More
                    </Link>
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const FEATURED_REVIEWS = [
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
    quote: "Local, independent, no call centre nonsense. Exactly what we wanted from an FSP.",
    who: "Johan & Karen T.",
    where: "Muldersdrift",
  },
] as const;

export function Home2Reviews() {
  return (
    <>
      <Home2Kicker>Client feedback</Home2Kicker>
      <Home2Heading as="h2" className="mt-2">
        What clients say
      </Home2Heading>
      <div className="mt-10 divide-y-2 divide-white border-2 border-white">
        {FEATURED_REVIEWS.map((r) => (
          <blockquote key={r.who} className="p-5 md:p-6">
            <p className="text-[15px] leading-relaxed text-[#e8e6e1] md:text-base">&ldquo;{r.quote}&rdquo;</p>
            <footer className="mt-3 text-[13px] text-[#9a9893]">
              — {r.who}, {r.where}
            </footer>
          </blockquote>
        ))}
      </div>
    </>
  );
}

const INSIGHTS = [
  {
    title: "Semigration & Retirement Villages",
    excerpt: "Coastal and estate living is reshaping retirement planning.",
    publishedAt: "2025-02-15",
    slug: "semigration-retirement-villages",
  },
  {
    title: "Estate Duty Reduction Strategies",
    excerpt: "Structure your estate so more wealth passes to the next generation.",
    publishedAt: "2025-01-28",
    slug: "estate-duty-reduction-strategies",
  },
  {
    title: "Retirement Income in a High-Inflation World",
    excerpt: "Design drawdowns when inflation and rates are volatile.",
    publishedAt: "2025-01-12",
    slug: "retirement-income-inflation",
  },
] as const;

export function Home2Insights() {
  return (
    <>
      <Home2Kicker tone="paper">Insights</Home2Kicker>
      <div className={`${HOME2_GRID} mt-2 items-end gap-y-4`}>
        <Home2Heading as="h2" tone="paper" className="col-span-12 md:col-span-8">
          Articles &amp; guides
        </Home2Heading>
        <Link
          href="/insights"
          className="col-span-12 text-sm font-medium text-[#141414] underline underline-offset-2 md:col-span-4 md:text-right"
        >
          All insights
        </Link>
      </div>
      <ol className="mt-8 divide-y-2 divide-black border-2 border-black">
        {INSIGHTS.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/insights/${post.slug}`}
              className={`${HOME2_GRID} gap-y-2 py-4 transition-colors hover:bg-[#e8e4dc] md:items-baseline`}
            >
              <span className="col-span-2 font-mono text-sm text-[#5c5a55] md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-10 md:col-span-7">
                <h3 className="font-semibold text-[#141414]">{post.title}</h3>
                <p className="mt-1 text-[14px] text-[#5c5a55]">{post.excerpt}</p>
              </div>
              <time
                className="col-span-12 text-[13px] text-[#5c5a55] md:col-span-4 md:text-right"
                dateTime={post.publishedAt}
              >
                {formatDateEnZa(post.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

export function Home2Stats() {
  const stats = [
    { value: "25+", label: "Years advising West Rand families and business owners" },
    { value: "FSP 17273", label: "Authorised Financial Services Provider · Category 1.8" },
    { value: "4", label: "Planning pillars — Health, Wealth, Legacy, Business" },
  ] as const;

  return (
    <div className={`${HOME2_GRID} gap-y-8`}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`${i === 0 ? "col-span-12 md:col-span-7" : i === 1 ? "col-span-12 md:col-span-5" : "col-span-12 border-t-2 border-white pt-8 md:col-span-12"}`}
        >
          <p className="text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold tracking-tight text-white">{stat.value}</p>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#9a9893]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Home2Cta() {
  return (
    <div className={`${HOME2_GRID} items-center gap-y-8`}>
      <div className="col-span-12 md:col-span-7">
        <Home2Heading as="h2">Ready for a conversation?</Home2Heading>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#9a9893]">
          Book a consultation or message us on WhatsApp. A named adviser responds — no call-centre queue.
        </p>
      </div>
      <div className="col-span-12 flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
        <Home2Button href="/contact">Book a consultation</Home2Button>
        <Home2Button href="https://wa.me/27662276044" variant="outline" external>
          WhatsApp
        </Home2Button>
      </div>
    </div>
  );
}
