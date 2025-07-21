import React from 'react';
import groq from 'groq';
import { client } from '@/lib/sanity';
import ModelClientWrapper from '@/components/ModelClientWrapper';



// Home page component
export default async function Home() {
  // Fetch homepage data from Sanity
  const homepage = await client.fetch(`
    *[_type == "homepage"][0] {
       title,
  home_Large_image,
  home_Mobile_image,
  links,
  bottomTextBlock
    }
  `);

  return (
    <ModelClientWrapper homepage={homepage} />
  );
}
