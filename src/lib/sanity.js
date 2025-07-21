


import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'dbbeg558',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
});

// Helper function to build image URLs
const builder = imageUrlBuilder(client);

export function urlForImage(source) {
  return builder.image(source);
}