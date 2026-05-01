import { defineField, defineType } from "sanity";

export const fspDisclosure = defineType({
  name: "fspDisclosure",
  title: "FSP Disclosure",
  type: "object",
  fields: [
    defineField({
      name: "fspEntity",
      title: "FSP Entity",
      type: "reference",
      to: [{ type: "fspEntity" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "fspEntity.name" },
    prepare({ title }) {
      return { title: title ? `FSP Disclosure: ${title}` : "FSP Disclosure" };
    },
  },
});
