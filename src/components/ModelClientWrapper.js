'use client';

import '../styles/global.css';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity';

export default function ModelClientWrapper({ homepage }) {  
  const titleRef = useRef(null);
  const linksRef = useRef(null);
  const bottomTextRef = useRef(null);

  useEffect(() => {
    const titleWidth = titleRef.current?.offsetWidth || 0;
    const offset = titleWidth * 1.25;

    if (linksRef.current) {
      linksRef.current.style.transform = `translateX(${offset}px)`;
    }
    if (bottomTextRef.current) {
      bottomTextRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, []);
  
 console.log('Homepage data:', homepage);

  return (
   <div className="homepage-container">
  {/* Left column content block */}
  <div className="left-block">
    <div className="title-section">
      <h1 className="main-title">VI BUREAU</h1>
    </div>
 <div className="aligned-blocks">
    <div className="links-section">
      {homepage?.links?.map((link, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <span className="divider">/</span>}
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </React.Fragment>
      ))}
    </div>

    {homepage?.bottomTextBlock && (
      <div className="bottom-text-block">
        <p>{homepage.bottomTextBlock}</p>
      </div>
    )}
  </div>
</div>
  {/* Main image area - right aligned */}
  <div className="content-area">

   {(homepage?.home_Large_image || homepage?.home_Mobile_image) && (
     
       <picture className="main-image">

          <source
      media="(max-width: 768px)"
      srcSet={urlForImage(homepage.home_Mobile_image).url()}
    />
    
     <Image
        src={urlForImage(homepage.home_Large_image).url()}
        alt="VI Bureau"
        fill
        sizes="80vw"
        priority
        className="main-image"
      />
      </picture>

    )}
    
  </div>
</div>

  );

 
}

