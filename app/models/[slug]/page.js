import React from 'react';
import { client } from '@/lib/sanity';
import ModelDetail from '@/components/ModelDetail';

export default async function ModelPage({ params }) {
  const { slug } = params;
  
  const [model, homepage] = await Promise.all([
    client.fetch(`
      *[_type == "model" && slug.current == $slug][0] {
        _id,
        name,
        firstName,
        slug,
        portrait,
        gallery[] {
          _type,
          _type == 'image' => {
            asset-> {
              _id,
              url
            },
            aspectRatio,
            caption
          },
          _type == 'file' => {
            asset-> {
              _id,
              url
            },
            aspectRatio
          }
        },
        stats,
        socialMedia,
        sedcardPdf {
          asset-> {
            url
          }
        },
        portfolioFile {
  asset-> {
    url
  }
}
      }
    `, { slug }),
    client.fetch(`
      *[_type == "homepage"][0] {
        links
      }
    `)
  ]);

  if (!model) {
    return <div>Model not found</div>;
  }

  return <ModelDetail model={model} homepage={homepage} />;
}