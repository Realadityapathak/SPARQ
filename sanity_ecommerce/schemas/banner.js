export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'titleLine1',
      title: 'Headline Line 1',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'titleAccent',
      title: 'Headline Line 2',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'product',
      title: 'Product (Slug or URL)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
};
