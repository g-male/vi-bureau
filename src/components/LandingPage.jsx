'use client';

import { useState, useRef, useEffect } from 'react';
import '../styles/landing.css';

export default function LandingPage({ onEnter, videoUrl, mobileVideoUrl }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null); // Don't set initially
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  // Detect mobile portrait orientation
  useEffect(() => {
    const checkMobile = () => {
      const isMobilePortrait = window.innerWidth <= 767 && window.innerHeight > window.innerWidth;
      setIsMobile(isMobilePortrait);
      
      // Set video source based on device
      const selectedVideo = isMobilePortrait && mobileVideoUrl ? mobileVideoUrl : videoUrl;
      setVideoSrc(selectedVideo);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, [videoUrl, mobileVideoUrl]);

  const handleEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  // Auto-enter when video ends
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleEnded = () => {
        handleEnter();
      };

      video.addEventListener('ended', handleEnded);

      // Fallback: Auto-advance after video duration + buffer
      const handleLoadedMetadata = () => {
        const duration = video.duration;
        if (duration && !isNaN(duration)) {
          timeoutRef.current = setTimeout(() => {
            handleEnter();
          }, (duration * 1000) + 500);
        }
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [videoSrc]); // Re-run when video source changes

  // Don't render video until we know which one to use
  if (!videoSrc) {
    return null;
  }

  return (
    <div className={`landing-container ${isExiting ? 'fade-out' : ''}`}>
      <video
        ref={videoRef}
        className="landing-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        key={videoSrc}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <button 
        className="enter-button"
        onClick={handleEnter}
      >
        ENTER
      </button>
    </div>
  );
}