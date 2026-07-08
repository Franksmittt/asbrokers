"use client";

type Props = {
  src: string;
  title: string;
};

/** Static ASSET HTML calculator embed — preserves legacy calculator logic in iframe. */
export function EverestCalculatorEmbed({ src, title }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-inner ring-1 ring-stone-200/90">
      <iframe
        src={src}
        title={title}
        className="block w-full min-h-[520px] border-0 bg-white sm:min-h-[560px]"
        loading="lazy"
      />
    </div>
  );
}
