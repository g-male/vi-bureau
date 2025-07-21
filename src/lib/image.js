import { client } from './sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlForImage(source) {
  return builder.image(source);
}