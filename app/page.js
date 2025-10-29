import React from 'react';
import { client } from '@/lib/sanity';
import ModelClientWrapper from '@/components/ModelClientWrapper';

export default async function Home() {
  const [homepage, model] = await Promise.all([
    client.fetch(`
      *[_type == "homepage"][0] {
        title,
        links,
        bottomTextBlock
      }
    `),
    client.fetch(`
      *[_type == "model"] | order(order asc) {
        _id,
        name,
          portrait {
      asset-> {
        _id,
        url
      }
    },
    slug,
    gender
  }
`)
  ]);

  return <ModelClientWrapper homepage={homepage} model={model} />;
}