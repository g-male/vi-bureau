'use client';

import '../styles/global.css';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { urlForImage } from '@/lib/sanity';

export default function ModelDetail({ model, homepage }) {
  const scrollContainerRef = useRef(null);
  const nameRef = useRef(null);
  const linksRef = useRef(null);
  const statsRef = useRef(null);
  const router = useRouter();

  const [cursorText, setCursorText] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);

  // Detect if touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Position elements based on name width
  const positionElements = useCallback(() => {
    if (!nameRef.current) return;

    const nameWidth = nameRef.current.offsetWidth;
    const offset = nameWidth;

    console.log('Name element:', nameRef.current);
    console.log('Name width:', nameWidth);
    console.log('Links element:', linksRef.current);
    console.log('Stats element:', statsRef.current);

    if (linksRef.current) {
      linksRef.current.style.transform = `translateX(${offset * 1.25}px)`;
      console.log('Applied links transform:', `translateX(${offset * 1.25}px)`);
    }
    if (statsRef.current) {
      statsRef.current.style.transform = `translateX(${offset}px)`;
      console.log('Applied stats transform:', `translateX(${offset}px)`);
    }

    console.log('Positioned with name width:', nameWidth);
  }, []);

  // Layout positioning after fonts load
  useEffect(() => {
    const runAfterFonts = () => {
      requestAnimationFrame(() => {
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

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (!isTouchDevice) return;
    const touch = e.touches[0];
    setStartX(touch.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isTouchDevice || !isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    if (!isTouchDevice) return;
    setIsDragging(false);
  };

  // Organize gallery items into layout with all size variations
  const layoutGallery = () => {
    const layout = [];
    let i = 0;
    
    while (i < model.gallery?.length) {
      const currentItem = model.gallery[i];
      const nextItem = model.gallery[i + 1];
      
      // Check if current and next are both small portraits (4:5) - stack them
      if (currentItem?.aspectRatio === '4:5' && nextItem?.aspectRatio === '4:5') {
        layout.push({
          type: 'stacked-portraits',
          items: [currentItem, nextItem]
        });
        i += 2;
      }
      // Check if current and next are both small landscapes (8:5-half) - stack them
      else if (currentItem?.aspectRatio === '8:5-half' && nextItem?.aspectRatio === '8:5-half') {
        layout.push({
          type: 'stacked-landscapes',
          items: [currentItem, nextItem]
        });
        i += 2;
      }
      // Large portrait (4:10) - single column, full height
      else if (currentItem?.aspectRatio === '4:10') {
        layout.push({
          type: 'large-portrait',
          items: [currentItem]
        });
        i += 1;
      }
      // Large landscape (8:5) - single column, full width
      else if (currentItem?.aspectRatio === '8:5') {
        layout.push({
          type: 'large-landscape',
          items: [currentItem]
        });
        i += 1;
      }
      // Small landscape alone (8:5-half) - with whitespace
      else if (currentItem?.aspectRatio === '8:5-half') {
        layout.push({
          type: 'small-landscape-alone',
          items: [currentItem]
        });
        i += 1;
      }
      // Fallback for any other case - treat as single
      else {
        layout.push({
          type: 'single',
          items: [currentItem]
        });
        i += 1;
      }
    }
    
    return layout;
  };

  const galleryLayout = layoutGallery();

  return (
    <div className="model-detail-container">
      {/* Header with logo */}
     <div className="title-section detail">
  <div className="main-title detail">
    <Link href="/">
      <img src="/unnamed-2.webp" alt="VI Bureau" />
    </Link>
  </div>
</div>

     {/* Gender Filter - showing model's gender */}
   <div className="gender-filter-detail">
  <button className="filter-btn" disabled>HE</button>
  <span className="filter-checkbox">{model.gender === 'he' ? '■' : '□'}</span>
  
  <button className="filter-btn" disabled>SHE</button>
  <span className="filter-checkbox">{model.gender === 'she' ? '■' : '□'}</span>
  
  <button className="filter-btn" disabled>THEY</button>
  <span className="filter-checkbox">{model.gender === 'they' ? '■' : '□'}</span>
</div>

      {/* Left side - Model info - mirrors homepage .left-block structure */}
      <div className="model-info-left">
        <div 
          ref={nameRef}
          className="model-name-title"
          style={{ visibility: layoutReady ? 'visible' : 'hidden' }}
        >
          {(model.firstName || model.name.split(' ')[0])?.toUpperCase()}
        </div>

        {/* Aligned blocks container - like homepage .aligned-blocks */}
        <div className="model-info-aligned">
          {/* Links section - mirrors homepage .links-section */}
          <div 
            ref={linksRef}
            className="model-links-section"
            style={{ visibility: layoutReady ? 'visible' : 'hidden' }}
          >
            {model.sedcardPdf && (
              <>
                <a href={model.sedcardPdf.asset?.url} target="_blank" rel="noopener noreferrer">
                  SEDCARD PDF
                </a>
                <span className="divider">&nbsp;/&nbsp;</span>
              </>
            )}
            {model.portfolioFile && (
              <>
                <a href={model.portfolioFile.asset?.url} target="_blank" rel="noopener noreferrer" download>
                  PORTFOLIO
                </a>
                <span className="divider">&nbsp;/&nbsp;</span>
              </>
            )}
            {model.socialMedia?.instagram && (
              <a href={model.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                INSTAGRAM
              </a>
            )}
          </div>

          {/* Stats block - mirrors homepage .bottom-text-block */}
          {model.stats && (
            <div 
              ref={statsRef}
              className="model-stats-block"
              style={{ visibility: layoutReady ? 'visible' : 'hidden' }}
            >
              {model.stats.height && <span>HEIGHT — {model.stats.height}</span>}
              {model.stats.measurements && model.stats.measurements.split('-')[0] && (
                <span>, CHEST — {model.stats.measurements.split('-')[0]}</span>
              )}
              {model.stats.measurements && model.stats.measurements.split('-')[1] && (
                <span>, WAIST — {model.stats.measurements.split('-')[1]}</span>
              )}
              {model.stats.measurements && model.stats.measurements.split('-')[2] && (
                <span>, HIPS — {model.stats.measurements.split('-')[2]}</span>
              )}
              {model.stats.shoeSize && (
                <span>, SHOE — {model.stats.shoeSize}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Gallery area */}
      <div className="model-gallery-area">
        <div 
          ref={scrollContainerRef}
          className="model-gallery-scroll"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="model-gallery-grid">
            {galleryLayout.map((column, colIndex) => (
              <div 
                key={colIndex}
                className={`gallery-column ${column.type}`}
              >
                {column.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`gallery-item ${column.type} ${item.aspectRatio}`}
                  >
                    {item._type === 'image' ? (
                      <Image
                        src={urlForImage(item).url()}
                        alt={item.caption || model.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="gallery-image"
                        onError={(e) => console.error('Image failed:', item)}
                      />
                    ) : (
                      <video
                        className="gallery-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={item.asset?.url} type="video/mp4" />
                      </video>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {cursorText && (
          <div 
            className="custom-cursor"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
            }}
          >
            {cursorText.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}