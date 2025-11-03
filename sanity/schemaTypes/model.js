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

// In schemas/model.js, update the gallery field:
{
  name: 'gallery',
  title: 'Image Gallery',
  type: 'array',
  description: 'Collection of model images and videos for portfolio',
  of: [
    {
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'aspectRatio',
          title: 'Aspect Ratio / Size',
          type: 'string',
          options: {
            list: [
              { title: 'Small Portrait (4:5) - Can stack with another', value: '4:5' },
              { title: 'Large Portrait (4:5) - Full height', value: '4:10' },
              { title: 'Large Landscape (8:5) - Full width', value: '8:5' },
              { title: 'Small Landscape (8:5) - Half height', value: '8:5-half' }
            ]
          },
          initialValue: '4:5',
          validation: Rule => Rule.required()
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        }
      ]
    },
    {
      type: 'file',
      title: 'Video',
      options: {
        accept: 'video/*'
      },
      fields: [
        {
          name: 'aspectRatio',
          title: 'Aspect Ratio / Size',
          type: 'string',
          options: {
            list: [
              { title: 'Large Landscape (8:5) - Full width', value: '8:5' },
              { title: 'Small Landscape (8:5) - Half height', value: '8:5-half' }
            ]
          },
          initialValue: '8:5',
          validation: Rule => Rule.required()
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
        }
      ]
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
    },
    {
  name: 'sedcardPdf',
  title: 'Sedcard PDF',
  type: 'file',
  options: {
    accept: 'application/pdf'
  }
},
{
  name: 'portfolioFile',
  title: 'Portfolio ZIP',
  type: 'file',
  options: {
    accept: '.zip'
  }
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