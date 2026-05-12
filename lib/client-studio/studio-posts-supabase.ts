import "server-only";

import type { ClientInsightPostRow } from "@/lib/client-studio/client-insight-db";
import { getSupabaseService } from "@/lib/supabase/server";

type SupabasePostRow = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  excerpt: string | null;
  body_html: string;
  body_html_published: string | null;
  status: string;
  meta_title: string | null;
  meta_description: string | null;
  hero_image_url: string | null;
  calculator_name: string | null;
  calculator_code: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type WritableStudioPostFields = {
  title: string;
  slug: string;
  locale: "en" | "af";
  excerpt: string | null;
  bodyHtml: string;
  metaTitle: string | null;
  metaDescription: string | null;
  heroImageUrl: string | null;
  calculatorName: string | null;
  calculatorCode: string | null;
};

function mapRow(row: SupabasePostRow): ClientInsightPostRow {
  return {
    id: row.id,
    slug: row.slug,
    locale: row.locale,
    title: row.title,
    excerpt: row.excerpt,
    bodyHtml: row.body_html,
    bodyHtmlPublished: row.body_html_published,
    status: row.status,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    heroImageUrl: row.hero_image_url,
    calculatorName: row.calculator_name,
    calculatorCode: row.calculator_code,
    publishedAt: row.published_at ? new Date(row.published_at) : null,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

function toInsertPayload(v: WritableStudioPostFields, updatedAt: Date) {
  return {
    title: v.title,
    slug: v.slug,
    locale: v.locale,
    excerpt: v.excerpt,
    body_html: v.bodyHtml,
    meta_title: v.metaTitle,
    meta_description: v.metaDescription,
    hero_image_url: v.heroImageUrl,
    calculator_name: v.calculatorName,
    calculator_code: v.calculatorCode,
    status: "draft",
    updated_at: updatedAt.toISOString(),
  };
}

function toUpdatePayload(v: WritableStudioPostFields, updatedAt: Date) {
  return {
    title: v.title,
    slug: v.slug,
    locale: v.locale,
    excerpt: v.excerpt,
    body_html: v.bodyHtml,
    meta_title: v.metaTitle,
    meta_description: v.metaDescription,
    hero_image_url: v.heroImageUrl,
    calculator_name: v.calculatorName,
    calculator_code: v.calculatorCode,
    updated_at: updatedAt.toISOString(),
  };
}

export async function listAllStudioPostsViaSupabase(): Promise<ClientInsightPostRow[]> {
  const supabase = getSupabaseService();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("client_insight_posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => mapRow(row as SupabasePostRow));
}

export async function listPublishedStudioPostsViaSupabase(): Promise<ClientInsightPostRow[]> {
  const supabase = getSupabaseService();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("client_insight_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? [])
    .map((row) => mapRow(row as SupabasePostRow))
    .filter((row) => Boolean(row.bodyHtmlPublished));
}

export async function getPublishedStudioPostBySlugViaSupabase(
  slug: string,
  locale: string
): Promise<ClientInsightPostRow | null> {
  const supabase = getSupabaseService();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("client_insight_posts")
    .select("*")
    .eq("slug", slug)
    .eq("locale", locale)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const row = mapRow(data as SupabasePostRow);
  return row.bodyHtmlPublished ? row : null;
}

export async function getStudioPostByIdViaSupabase(id: string): Promise<ClientInsightPostRow | null> {
  const supabase = getSupabaseService();
  if (!supabase) return null;
  const { data, error } = await supabase.from("client_insight_posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as SupabasePostRow) : null;
}

export async function insertStudioPostViaSupabase(
  v: WritableStudioPostFields,
  updatedAt: Date
): Promise<string> {
  const supabase = getSupabaseService();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("client_insight_posts")
    .insert(toInsertPayload(v, updatedAt))
    .select("id")
    .single();
  if (error) throw error;
  const newId = data?.id;
  if (!newId) throw new Error("Insert returned no id");
  return newId;
}

export async function updateStudioPostViaSupabase(
  id: string,
  v: WritableStudioPostFields,
  updatedAt: Date
): Promise<void> {
  const supabase = getSupabaseService();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("client_insight_posts").update(toUpdatePayload(v, updatedAt)).eq("id", id);
  if (error) throw error;
}

export async function updatePublishedStudioPostBodyViaSupabase(
  id: string,
  bodyHtmlPublished: string,
  updatedAt: Date
): Promise<void> {
  const supabase = getSupabaseService();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("client_insight_posts")
    .update({
      body_html_published: bodyHtmlPublished,
      updated_at: updatedAt.toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

export async function publishStudioPostViaSupabase(
  id: string,
  bodyHtmlPublished: string,
  heroImageUrl: string,
  publishedAt: Date
): Promise<void> {
  const supabase = getSupabaseService();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("client_insight_posts")
    .update({
      status: "published",
      body_html_published: bodyHtmlPublished,
      hero_image_url: heroImageUrl,
      published_at: publishedAt.toISOString(),
      updated_at: publishedAt.toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

export async function revertStudioPostToDraftViaSupabase(id: string, updatedAt: Date): Promise<void> {
  const supabase = getSupabaseService();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("client_insight_posts")
    .update({
      status: "draft",
      body_html_published: null,
      published_at: null,
      updated_at: updatedAt.toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteStudioPostViaSupabase(id: string): Promise<void> {
  const supabase = getSupabaseService();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("client_insight_posts").delete().eq("id", id);
  if (error) throw error;
}
