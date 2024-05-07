import {defineField, defineType} from 'sanity'

export default defineType({
    name: "category",
    title: "Category",
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
      }),
      defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
      }),
      defineField({
        name: "parents",
        title: "Parents",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "category" }],
          },
        ],
      }),
    ],
  })