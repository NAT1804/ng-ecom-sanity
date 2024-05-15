import {defineField, defineType} from 'sanity'

export default defineType({
    name: "productVariant",
    title: "Product Variant",
    type: "object",
    fields: [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
      }),
      defineField({
        name: "price",
        title: "Price",
        type: "number",
      }),
      defineField({
        name: "maxprice",
        title: "Max Price",
        type: "number",
      }),
      defineField({
        name: "sku",
        title: "SKU",
        type: "string",
      }),
      defineField({
        name: "images",
        title: "Images",
        type: "array",
        of: [
          {
            type: "image"
          },
        ],
      }),
    ],
  })