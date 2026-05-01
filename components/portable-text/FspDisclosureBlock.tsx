"use client";

type Fsp = {
  _id: string;
  name: string;
  fspNumber: string;
  disclaimerText: string;
};

type FspDisclosureValue = {
  _type: "fspDisclosure";
  _key?: string;
  fsp?: Fsp | null;
};

type Props = {
  value: FspDisclosureValue;
};

export function FspDisclosureBlock({ value }: Props) {
  const fsp = value.fsp;
  if (!fsp?.disclaimerText) return null;

  return (
    <aside
      className="my-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 md:p-5 text-left"
      role="note"
      aria-label="FSP disclosure"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-400/90 mb-2">
        {fsp.name} (FSP {fsp.fspNumber})
      </p>
      <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
        {fsp.disclaimerText}
      </p>
    </aside>
  );
}
