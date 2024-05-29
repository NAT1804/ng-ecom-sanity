import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'storeInfor',
    title: 'Store Information',
    type: 'document',
    fields: [
        defineField({
            name: 'hotline',
            title: 'Hotline',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'linkFacebook',
            title: 'Link Facebook',
            type: 'string',
        }),
        defineField({
            name: 'linkZalo',
            title: 'Link Zalo',
            type: 'string',
        }),
        defineField({
            name: 'linkInstagram',
            title: 'Link instagram',
            type: 'string',
        }),
        defineField({
            name: 'linkTiktok',
            title: 'Link Tiktok',
            type: 'string',
        }),
        defineField({
            name: 'phoneNumber',
            title: 'Phone Number',
            type: 'string',
        }),
    ],
  });