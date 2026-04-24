import { defineField, defineType } from "sanity";

export const seoMetadata = defineType({
  name: "seoMetadata",
  title: "SEO Metadata",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Recommended max 65 characters for search results.",
      validation: (Rule) => Rule.max(65).warning("Keep under 65 characters for best display."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      description: "Recommended max 160 characters.",
      validation: (Rule) => Rule.max(160).warning("Keep under 160 characters for best display."),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Optional. Leave blank to use the page URL.",
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      description: "Ask search engines not to index this page.",
    }),
  ],
});
