import React from 'react';
import { client } from '@/lib/sanity';
import HomePageWrapper from '@/components/HomePageWrapper';

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
        firstName,
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

  return <HomePageWrapper homepage={homepage} model={model} />;
}