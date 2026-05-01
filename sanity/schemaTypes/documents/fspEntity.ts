import { defineField, defineType } from "sanity";

export const fspEntity = defineType({
  name: "fspEntity",
  title: "FSP Entity",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "e.g. AS Brokers CC",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fspNumber",
      title: "FSP Number",
      type: "string",
      description: "e.g. 17273",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "disclaimerText",
      title: "Disclaimer Text",
      type: "text",
      rows: 3,
      description: "FAIS-oriented disclaimer shown in articles.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { name: "name", fspNumber: "fspNumber" },
    prepare({ name, fspNumber }) {
      return { title: name, subtitle: `FSP ${fspNumber}` };
    },
  },
});
