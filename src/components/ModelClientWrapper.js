'use client';

import '../styles/global.css';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity';

export default function ModelClientWrapper({ homepage }) {
  const titleRef = useRef(null);
  const linksRef = useRef(null);
  const bottomTextRef = useRef(null);
  const [layoutReady, setLayoutReady] = useState(false);

  const positionElements = useCallback(() => {
    if (!titleRef.current) return;

    const titleWidth = titleRef.current.offsetWidth;
    const offset = titleWidth;

    if (linksRef.current) {
      linksRef.current.style.transform = `translateX(${offset * 1.25}px)`;
    }
    if (bottomTextRef.current) {
      bottomTextRef.current.style.transform = `translateX(${offset}px)`;
    }

    console.log('Positioned with title width:', titleWidth);
  }, []);

  useEffect(() => {
    const runAfterFonts = () => {
      requestAnimationFrame(() => {
        // Reveal layout
        setLayoutReady(true);
        requestAnimationFrame(() => {
          positionElements();
        });
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(runAfterFonts);
    } else {
      runAfterFonts();
    }

    window.addEventListener('resize', positionElements);
    return () => {
      window.removeEventListener('resize', positionElements);
    };
  }, [positionElements]);

  return (
    <div className="homepage-container">
   
        
              <div className="left-block">
        <div className="title-section">
          <div
            ref={titleRef}
            className="main-title"
            style={{ visibility: layoutReady ? 'visible' : 'hidden' }}
          >
       <img src="/unnamed-2.webp" alt="VI Bureau" />
          </div>
        </div>

        <div className="aligned-blocks">
          <div
            ref={linksRef}
            className="links-section"
            style={{
              visibility: layoutReady ? 'visible' : 'hidden',
              
            }}
          >
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
            <div
              ref={bottomTextRef}
              className="bottom-text-block"
              style={{
                visibility: layoutReady ? 'visible' : 'hidden',
               
              }}
            >
              <p>{homepage.bottomTextBlock}</p>
            </div>
          )}
        </div>
      </div>

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
              onLoad={() => {
                // As backup: re-position once image is in
                setTimeout(() => {
                  positionElements();
                }, 25);
              }}
            />
          </picture>
        )}
      </div>

</div>

   
  );
}
