"use client";

type Props = {
  src: string;
  title: string;
};

/** Static ASSET HTML calculator embed — preserves legacy calculator logic in iframe. */
export function EverestCalculatorEmbed({ src, title }: Props) {
  return (
    <div
      className="aspect-[4/3] w-full min-h-[520px] overflow-hidden rounded-2xl bg-white shadow-inner ring-1 ring-stone-200/90 sm:min-h-[560px]"
      style={{ aspectRatio: "4 / 3" }}
    >
      <iframe
        src={src}
        title={title}
        width="100%"
        height="560"
        className="block h-full min-h-[520px] w-full border-0 bg-white sm:min-h-[560px]"
        loading="lazy"
      />
    </div>
  );
}
