// schemas/homepage.js
export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
    },
    {
      name: 'home_Large_image',
      title: 'Desktop Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },

    {
      name: 'home_Mobile_image',
      title: 'Mobile Image',
      type: 'image',
      options: { hotspot: true 

      },
            validation: Rule => Rule.required(),
    },
    {
      name: 'links',
      title: 'Links Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'url',
                validation: Rule => Rule.uri({
    allowRelative: false,
    scheme: ['http', 'https', 'mailto']
  })
},

            
          ],
        },
      ],
    },
    {
      name: 'bottomTextBlock',
      title: 'Bottom Text Block',
      type: 'text', // or use 'blockContent' for rich text
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'home_Large_image',
    },
  },
}
