import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug?.current) return true;
          const locale = (context.document?.locale as string) ?? "en";
          const id = (context.document as { _id?: string })?._id;
          const client = context.getClient({ apiVersion: "2024-01-01" });
          const existing = await client.fetch<{ _id: string }[]>(
            `*[_type == "article" && slug.current == $slug && locale == $locale && _id != $id][0]._id`,
            { slug: slug.current, locale, id: id ?? "" }
          );
          return existing ? "Slug must be unique per locale (en/af)." : true;
        }),
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      options: {
        list: [
          { value: "en", title: "English" },
          { value: "af", title: "Afrikaans" },
        ],
      },
      initialValue: "en",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "fspDisclosure" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMetadata",
    }),
  ],
  orderings: [
    { title: "Published (newest)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", slug: "slug.current", locale: "locale" },
    prepare({ title, slug, locale }) {
      return { title, subtitle: slug ? `/${locale}/${slug}` : undefined };
    },
  },
});
