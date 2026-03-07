import { Footer } from "@/components/Footer";

const team = [
  {
    name: "Albert Schuurman",
    role: "Independent Financial Advisor",
    bio: "Co-founder of AS Brokers. Focus on retirement income planning and helping clients create certainty.",
    quote: "You can't buy insurance when you need it.",
  },
  {
    name: "Johnny Farinha",
    role: "Independent Financial Advisor",
    bio: "Co-founder of AS Brokers. Expertise in estate structuring, business continuity and risk planning.",
  },
];

export default function TeamPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">The Team</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The people behind AS Brokers. Twenty-five years combined experience, working for you.
          </p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-32">
        <div className="grid sm:grid-cols-2 gap-4">
          {team.map((person) => (
            <div key={person.name} className="bg-[#151518] rounded-[2rem] p-8 border border-white/5">
              <p className="text-blue-400 text-2xl font-bold mb-4">
                {person.name.split(" ").map((n) => n[0]).join("")}
              </p>
              <h2 className="text-xl font-bold text-white">{person.name}</h2>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">{person.role}</p>
              <p className="text-zinc-400 text-sm mt-6 leading-relaxed">{person.bio}</p>
              {person.quote && (
                <blockquote className="mt-6 text-teal-400 italic text-sm border-l-2 border-teal-500 pl-4">
                  &ldquo;{person.quote}&rdquo;
                </blockquote>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-zinc-500 text-xs uppercase tracking-widest mt-12">
          FSP 17273 · Independent Authorised Financial Service Provider · South Africa
        </p>
      </section>
      <Footer />
    </div>
  );
}
