import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getAlt } from "@/lib/image-alt";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#52525b";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";
const TEAL_ON_DARK = "#5EEAD4";

const PAGE_TITLE = "Besigheidsversekering Krugersdorp | Onafhanklike Makelaars | AS Brokers";
const PAGE_DESCRIPTION =
  "Onafhanklike besigheidsversekering-makelaars in Krugersdorp sedert 1998. Ons vergelyk die mark (Santam, Bryte, King Price en ander), struktureer dekking na 'n behoefte-analise, en staan by jou eis. FSP 17273.";

const WHATSAPP_MESSAGE =
  "Goeiedag AS Brokers, ek wil graag oor my besigheidsversekering gesels. Skakel my asseblief terug.";

const RISKS = [
  {
    title: "Onderversekering en die gemiddelde-klousule",
    body: "As jou geboue, toerusting, of voorraad vir minder as vervangingswaarde verseker is, betaal baie polisse eise proporsioneel uit. Een brand op onderverklaarde waardes kan jare se marge uitwis. Ons hersien versekerde bedrae by aanvang en met elke hernuwing.",
  },
  {
    title: "Bedryfsonderbreking",
    body: "Inkomste stop; salarisse, huur, en vaste koste stop nie. 'n Polis met die verkeerde vergoedingstydperk kan maande voor heropening opraak. Ons struktureer dekking wat by jou werklike hersteltyd pas.",
  },
  {
    title: "Openbare aanspreeklikheid",
    body: "Een besering- of skade-eis van 'n kliënt of besoeker kan die netto waarde van 'n klein besigheid oorskry. Ons stel toepaslike limiete vas met bewoording wat jou werklike bedrywighede dek.",
  },
  {
    title: "Sleutelpersoon- en vennootrisiko",
    body: "Die dood of ongeskiktheid van 'n vennoot of sleutelpersoon kan die besigheid sonder befondsing laat. Ons struktureer lewensdekking vir koop-en-verkoop-ooreenkomste en sleutelpersoonverpligtinge, in lyn met die aandeelhouersooreenkoms.",
  },
] as const;

const PROCESS = [
  {
    step: "01",
    title: "Vertel ons van jou besigheid",
    body: "Begin met die gratis Besigheidsrisiko-oorsig, of los jou nommer en ons skakel jou.",
  },
  {
    step: "02",
    title: "Behoefte-analise",
    body: "'n Gemagtigde verteenwoordiger van AS Brokers CC (FSP 17273) dokumenteer jou risikoprofiel. Persoonlike advies vereis hierdie stap kragtens FAIS.",
  },
  {
    step: "03",
    title: "Ons vergelyk die mark",
    body: "As onafhanklike makelaars plaas ons dekking oor die mark heen: Santam, Bryte, King Price, SIS, Albatros en ander, sonder kwotas wat ons aan een versekeraar bind.",
  },
  {
    step: "04",
    title: "Jaarlikse hersiening en eise-ondersteuning",
    body: "Ons hersien dekking met elke hernuwing en hanteer die eisproses met die versekeraar namens jou.",
  },
] as const;

const FAQS = [
  {
    question: "Wat doen 'n onafhanklike besigheidsversekering-makelaar?",
    answer:
      "Ons vergelyk die kommersiële mark namens jou, in plaas daarvan om jou by een versekeraar se rak in te pas. Na 'n gedokumenteerde behoefte-analise plaas ons die dekking, hanteer die administrasie, en staan by jou met elke hernuwing en eis. AS Brokers CC (FSP 17273) is sedert 1998 in Krugersdorp.",
  },
  {
    question: "Kan julle ons bestaande dekking hersien?",
    answer:
      "Ja. Begin met die gratis Besigheidsrisiko-oorsig of bring jou polisskedules na 'n behoefte-analise. Ons kyk na versekerde bedrae, uitsluitings, oorvleuelings, en premievlakke oor die mark heen.",
  },
  {
    question: "Help julle wanneer 'n eis afgekeur of verminder word?",
    answer:
      "Ja. Eise-ondersteuning is deel van die makelaarsrol: ons bestuur die proses met die versekeraar, betwis onredelike uitkomste, en sorg dat poliswoording korrek toegepas word.",
  },
  {
    question: "Is julle aan een versekeraar gebonde?",
    answer:
      "Nee. Ons is 'n onafhanklike Kategorie 1.8 FDV (FSP 17273). Die noem van instansies soos Santam, Bryte, of King Price dui op plasingsvermoë, nie eksklusiwiteit nie.",
  },
  {
    question: "Praat julle Afrikaans?",
    answer:
      "Ja. Ons bedien Wes-Rand besighede in Afrikaans en Engels, persoonlik of aanlyn, van kwotasie tot eis.",
  },
  {
    question: "Wat kos die Besigheidsrisiko-oorsig?",
    answer:
      "Niks nie. Die werkboek is gratis en verniet, sonder verpligting. Persoonlike aanbevelings volg eers ná 'n behoefte-analise met 'n gemagtigde verteenwoordiger.",
  },
] as const;

export const metadata = buildPageMetadata({
  path: "/besigheidsversekering-krugersdorp",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ogLocale: "af_ZA",
  languages: {
    af: "/besigheidsversekering-krugersdorp",
    en: "/solutions/business-insurance",
    "x-default": "/solutions/business-insurance",
  },
  keywords: [
    "besigheidsversekering krugersdorp",
    "kommersiële versekering makelaar",
    "versekeringsmakelaar wes-rand",
    "openbare aanspreeklikheid versekering",
    "onafhanklike versekeringsmakelaar",
    "FSP 17273",
  ],
});

export default function BesigheidsversekeringPage() {
  return (
    <>
      <PageJsonLd
        path="/besigheidsversekering-krugersdorp"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
        service={{
          name: "Besigheidsversekering makelaarsdiens",
          description: PAGE_DESCRIPTION,
          serviceType: "Commercial Insurance Broking",
        }}
      />
      <div style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
        {/* Hero: message match for besigheidsversekering searches */}
        <header className="pb-12 pt-28 md:pb-16 md:pt-36">
          <div className={`${HOME4_WRAP} grid gap-10 lg:grid-cols-12 lg:items-center`}>
            <div className="min-w-0 lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
                Gemagtigde Finansiële Diensteverskaffer · FSP 17273 · Sedert 1998
              </p>
              <h1
                className="mt-4 font-serif font-semibold tracking-tight"
                style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)", lineHeight: 1.15, color: INK }}
              >
                Onafhanklike besigheidsversekering in Krugersdorp
              </h1>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed" style={{ color: BODY }}>
                Ons beskerm jou besigheid met kundige advies en staan by jou wanneer dit saak maak:
                by die eis. Praat direk met &apos;n gelisensieerde makelaar wat jou taal praat, nie
                &apos;n oproepsentrum nie.
              </p>
              <ul className="mt-6 space-y-2 text-sm leading-relaxed" style={{ color: BODY }}>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
                  Plaaslike kundigheid: Wes-Rand besighede sedert 1998
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
                  Eise-ondersteuning: ons hanteer die versekeraar namens jou
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
                  Onafhanklik: ons vergelyk Santam, Bryte, King Price en ander
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  href="/business-risk-review"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: TEAL }}
                >
                  Gratis Besigheidsrisiko-oorsig
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href="#terugbel"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                  style={{ color: TEAL }}
                >
                  Of los jou nommer, ons skakel jou
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
            <figure className="relative min-w-0 overflow-hidden rounded-2xl border border-stone-300/90 bg-white lg:col-span-5">
              <Image
                src="/images/insurance-domain-business-21x9.webp"
                alt={getAlt(
                  "/images/insurance-domain-business-21x9.webp",
                  "Besigheidsvennote buite 'n kommersiële perseel"
                )}
                width={840}
                height={360}
                priority
                className="h-full w-full object-cover object-center"
              />
            </figure>
          </div>
        </header>

        {/* Risks */}
        <section
          className="border-t py-14 md:py-20"
          style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
          aria-labelledby="risiko-heading"
        >
          <div className={HOME4_WRAP}>
            <h2
              id="risiko-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Die risiko&apos;s wat besighede toemaak
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {RISKS.map((risk) => (
                <article
                  key={risk.title}
                  className="border bg-white p-6 sm:p-7"
                  style={{ borderColor: HAIRLINE }}
                >
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-shark">
                    {risk.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{risk.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process, shark */}
        <section
          className="bg-shark py-14 text-white md:py-20"
          aria-labelledby="proses-heading"
        >
          <div className={HOME4_WRAP}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL_ON_DARK }}>
              Hoe ons werk
            </p>
            <h2
              id="proses-heading"
              className="mt-3 font-serif font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)" }}
            >
              Van gesprek tot gestruktureerde dekking
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((item) => (
                <div key={item.step}>
                  <p className="font-serif text-2xl font-semibold" style={{ color: TEAL_ON_DARK }}>
                    {item.step}
                  </p>
                  <h3 className="mt-2 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Callback */}
        <section
          id="terugbel"
          className="scroll-mt-28 py-14 md:scroll-mt-32 md:py-20"
          style={{ backgroundColor: CANVAS }}
          aria-label="Versoek 'n terugbel"
        >
          <div className={HOME4_WRAP}>
            <CallbackForm
              source="business_insurance_af"
              lang="af"
              showEmail={false}
              showNote
              heading="Los jou nommer. Ons skakel jou."
              description="Twee velde en 'n regmerkie. 'n Gemagtigde adviseur in Krugersdorp skakel jou dieselfde werksdag oor jou besigheidsdekking, hernuwing, of eis."
              buttonLabel="Skakel my terug"
              whatsappMessage={WHATSAPP_MESSAGE}
            />
          </div>
        </section>

        {/* FAQ */}
        <section
          className="border-t py-14 md:py-20"
          style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
          aria-labelledby="vrae-heading"
        >
          <div className={HOME4_WRAP}>
            <h2
              id="vrae-heading"
              className="font-serif font-semibold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", color: INK }}
            >
              Reguit antwoorde
            </h2>
            <dl className="mt-8 space-y-0 border-y" style={{ borderColor: HAIRLINE }}>
              {FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="grid gap-2 border-b py-5 last:border-b-0 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-8"
                  style={{ borderColor: HAIRLINE }}
                >
                  <dt className="text-sm font-semibold text-shark">{faq.question}</dt>
                  <dd className="text-sm leading-relaxed text-stone-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm" style={{ color: BODY }}>
              Verkies Engels?{" "}
              <Link href="/solutions/business-insurance" prefetch={false} className="font-semibold" style={{ color: TEAL }}>
                Lees die Engelse besigheidsversekering-blad →
              </Link>
            </p>
          </div>
        </section>

        {/* Quiet Section 1(3)(a) disclaimer (Afrikaans) */}
        <section
          aria-label="Algemene inligting vrywaring"
          className="border-t pb-10 pt-8"
          style={{ borderColor: HAIRLINE, backgroundColor: CANVAS }}
        >
          <div className={HOME4_WRAP}>
            <p className="max-w-3xl text-xs leading-relaxed text-stone-500">
              Die inligting op hierdie blad is algemene inligting soos beoog in Artikel 1(3)(a) van
              die Wet op Finansiële Advies- en Tussengangersdienste, 37 van 2002 (FAIS-wet), en is
              nie finansiële advies of &apos;n produkaanbeveling nie. Persoonlike aanbevelings volg
              &apos;n finansiële behoefte-analise met &apos;n gemagtigde verteenwoordiger van AS
              Brokers CC (FSP 17273).
            </p>
          </div>
        </section>

        <FloatingWhatsAppButton
          message={WHATSAPP_MESSAGE}
          label="Gesels nou op WhatsApp"
          location="besigheidsversekering_lp"
        />

        <Footer />
      </div>
    </>
  );
}
