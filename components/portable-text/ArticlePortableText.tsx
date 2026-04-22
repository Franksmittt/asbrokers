"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { FspDisclosureBlock } from "./FspDisclosureBlock";

const components: PortableTextComponents = {
  types: {
    fspDisclosure: FspDisclosureBlock,
  },
  block: {
    normal: ({ children }) => <p className="mb-4 text-zinc-300 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="mt-8 mb-3 text-xl font-semibold text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-2 text-lg font-semibold text-white">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-zinc-300">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-zinc-300">{children}</ol>,
  },
};

type Props = {
  value: PortableTextBlock[] | null | undefined;
};

export function ArticlePortableText({ value }: Props) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
