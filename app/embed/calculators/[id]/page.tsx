import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

/** Legacy React embed routes, retired in favour of ASSET 001–017 static HTML embeds. */
export default async function LegacyCalculatorEmbedRedirect(_props: Props) {
  redirect("/calculators");
}
