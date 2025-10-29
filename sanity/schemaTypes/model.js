// schemas/model.js
export default {
  name: 'model',
  title: 'Models',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the model',
      validation: Rule => Rule.required()
    },
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      description: 'First name of the model'
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      description: 'Last name of the model'
    },
    {
  name: 'gender',
  title: 'Gender',
  type: 'string',
  options: {
    list: [
      { title: 'He', value: 'he' },
      { title: 'She', value: 'she' },
      { title: 'They', value: 'they' }
    ],
    layout: 'radio'
  },
  validation: Rule => Rule.required()
},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Unique URL-friendly identifier for this model',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      description: 'Portrait image shown when model is hovered',
      options: {
        hotspot: true // Enables the hotspot for responsive cropping
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      description: 'Collection of model images for portfolio',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Caption for this image'
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility'
            }
          ]
        }
      ]
    },
    {
      name: 'stats',
      title: 'Model Stats',
      type: 'object',
      fields: [
        {
          name: 'height',
          title: 'Height',
          type: 'string',
          description: 'Height in cm or feet/inches'
        },
        {
          name: 'measurements',
          title: 'Measurements',
          type: 'string',
          description: 'Model measurements (bust-waist-hips)'
        },
        {
          name: 'shoeSize',
          title: 'Shoe Size',
          type: 'string'
        },
        {
          name: 'hairColor',
          title: 'Hair Color',
          type: 'string'
        },
        {
          name: 'eyeColor',
          title: 'Eye Color',
          type: 'string'
        }
      ]
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Brief biography of the model'
    },
    {
      name: 'featured',
      title: 'Featured Model',
      type: 'boolean',
      description: 'Mark as a featured model on the homepage',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Control the order in which models appear (lower numbers appear first)',
      initialValue: 999
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        },
        {
          name: 'portfolio',
          title: 'Portfolio Website',
          type: 'url'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'stats.height',
      media: 'portrait'
    }
  }
}