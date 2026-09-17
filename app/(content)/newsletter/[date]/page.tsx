import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getResolvedEditionByDate, listPublishedEditions } from "@/lib/newsletter/store";
import { NewsletterView } from "@/components/newsletter/NewsletterView";

interface PageProps {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  const edition = getResolvedEditionByDate(date);

  if (!edition) {
    return {
      title: "Newsletter Not Found | AS Brokers",
    };
  }

  const formattedDate = new Date(date).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    title: `Newsletter ${formattedDate} | AS Brokers`,
    description: edition.articleOfTheWeek.title
      ? `${edition.articleOfTheWeek.title} - ${edition.articleOfTheWeek.intro?.slice(0, 150)}...`
      : "AS Brokers Weekly Financial Freedom Newsletter",
  };
}

export function generateStaticParams() {
  const editions = listPublishedEditions();
  return editions.map((edition) => ({
    date: edition.date,
  }));
}

export const dynamic = "force-dynamic";

export default async function NewsletterDatePage({ params }: PageProps) {
  const { date } = await params;
  const edition = getResolvedEditionByDate(date);

  if (!edition) {
    notFound();
  }

  // Only show published editions publicly
  if (edition.status !== "published") {
    notFound();
  }

  return <NewsletterView edition={edition} isArchive />;
}
