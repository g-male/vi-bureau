'use client';

import '../styles/global.css';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { urlForImage } from '@/lib/sanity';

export default function ModelClientWrapper({ homepage, model }) {
  const titleRef = useRef(null);
  const linksRef = useRef(null);
  const bottomTextRef = useRef(null);
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [textHeight, setTextHeight] = useState(null);
  const [hoveredModel, setHoveredModel] = useState(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [genderFilter, setGenderFilter] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasTyped, setHasTyped] = useState(false); // NEW: Track if typewriter has played

  // Detect if touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // NEW: Check if typewriter has already played
  useEffect(() => {
    const typed = sessionStorage.getItem('typewriterPlayed');
    if (typed === 'true') {
      setHasTyped(true);
      if (homepage?.bottomTextBlock) {
        setDisplayedText(homepage.bottomTextBlock);
      }
    }
  }, [homepage?.bottomTextBlock]);

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

  // Measure the full height of the paragraph before typing starts
  useEffect(() => {
    if (homepage?.bottomTextBlock) {
      const tempEl = document.createElement('p');
      tempEl.style.visibility = 'hidden';
      tempEl.style.position = 'absolute';
      tempEl.style.width = '100%';
      tempEl.style.whiteSpace = 'normal';
      tempEl.innerText = homepage.bottomTextBlock;
      document.body.appendChild(tempEl);
      setTextHeight(tempEl.offsetHeight);
      document.body.removeChild(tempEl);
    }
  }, [homepage?.bottomTextBlock]);

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

  // UPDATED: Typewriter effect - only play if hasn't played yet
  useEffect(() => {
    if (homepage?.bottomTextBlock && layoutReady && !hasTyped) {
      let i = 0;
      const text = homepage.bottomTextBlock;
      const speed = 30;

      setDisplayedText('');
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          // Mark as typed in sessionStorage
          sessionStorage.setItem('typewriterPlayed', 'true');
          setHasTyped(true);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    } else if (homepage?.bottomTextBlock && layoutReady && hasTyped) {
      // If already typed, just show the full text immediately
      setDisplayedText(homepage.bottomTextBlock);
    }
  }, [homepage?.bottomTextBlock, layoutReady, hasTyped]);

  const handleModelClick = (m) => {
    if (isNavigating) return;
    setIsNavigating(true);
    router.push(`/models/${m.slug.current}`);
  };

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

  const toggleGenderFilter = (gender) => {
    setGenderFilter(prev => {
      if (prev.includes(gender)) {
        return prev.filter(g => g !== gender);
      } else {
        return [...prev, gender];
      }
    });
  };

  const filteredModels = model?.filter(m => {
    if (!m.portrait) return false;
    if (genderFilter.length === 0) return true;
    return genderFilter.includes(m.gender);
  });

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

        <div className="gender-filter">
          <button 
            className={`filter-btn ${genderFilter.includes('he') ? 'active' : ''}`}
            onClick={() => toggleGenderFilter('he')}
          >
            HE
          </button>
          <span 
            className="filter-checkbox"
            onClick={() => toggleGenderFilter('he')}
          >
            {genderFilter.includes('he') ? '■' : '□'}
          </span>
          
          <button 
            className={`filter-btn ${genderFilter.includes('she') ? 'active' : ''}`}
            onClick={() => toggleGenderFilter('she')}
          >
            SHE
          </button>
          <span 
            className="filter-checkbox"
            onClick={() => toggleGenderFilter('she')}
          >
            {genderFilter.includes('she') ? '■' : '□'}
          </span>
          
          <button 
            className={`filter-btn ${genderFilter.includes('they') ? 'active' : ''}`}
            onClick={() => toggleGenderFilter('they')}
          >
            THEY
          </button>
          <span 
            className="filter-checkbox"
            onClick={() => toggleGenderFilter('they')}
          >
            {genderFilter.includes('they') ? '■' : '□'}
          </span>
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
                {index !== 0 && <span className="divider">  &nbsp;/&nbsp;   </span>}
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
                height: textHeight ? `${textHeight}px` : 'auto',
              }}
            >
              <p>{displayedText}</p>
            </div>
          )}
        </div>
      </div>

      <div className="content-area">
        <div 
          ref={scrollContainerRef}
          className="models-scroll-wrapper" 
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="models-grid">
            {filteredModels?.map((m, index) => (
              <div
                key={m._id || index}
                className="model-card"
                onClick={() => handleModelClick(m)}
                onMouseEnter={() => {
                  setHoveredModel(m._id);
                  setCursorText(m.firstName || m.name.split(' ')[0]);
                }}
                onMouseLeave={() => {
                  setHoveredModel(null);
                  setCursorText('');
                }}
                style={{ cursor: 'none' }}
              >
                <div className="model-image-wrapper">
                  <Image
                    src={urlForImage(m.portrait).url()}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="model-image"
                  />
                </div>
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