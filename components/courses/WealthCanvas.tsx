import { WEALTH_CANVAS_PROMPTS, type WealthCanvasPromptId } from "@/lib/courses/clarity-track";

type Props = {
  answers: Partial<Record<WealthCanvasPromptId, string>>;
  studentName: string;
};

/** Living Wealth Canvas — visual philosophy board from learning reflections. */
export function WealthCanvas({ answers, studentName }: Props) {
  const filled = WEALTH_CANVAS_PROMPTS.filter((prompt) => answers[prompt.id]?.trim());

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B3B6E] via-[#0B4F6C] to-[#0B7A78] p-6 text-white shadow-lg sm:p-8">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
        Living Wealth Canvas
      </p>
      <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
        {studentName.split(" ")[0]}&apos;s Clarity Blueprint
      </h2>
      <p className="mt-2 max-w-xl text-sm text-white/80">
        Built from your reflections — a private picture of goals and worries you can share with
        Albert when you are ready. This is education and self-insight, not product advice.
      </p>

      {filled.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white/10 px-4 py-5 text-sm text-white/85 ring-1 ring-white/15">
          Answer the prompts below as you learn. Your canvas fills in over time.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {filled.map((prompt) => (
            <li
              key={prompt.id}
              className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-white/65">
                {prompt.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white">{answers[prompt.id]}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
