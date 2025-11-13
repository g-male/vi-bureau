'use client';

import { useState, useRef, useEffect } from 'react';
import '../styles/landing.css';

export default function LandingPage({ onEnter, videoUrl }) {
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);

  const handleEnter = () => {
    setIsExiting(true);
    // Wait for fade out animation before calling onEnter
    setTimeout(() => {
      onEnter();
    }, 1000); // Match this to CSS transition duration
  };

  // Auto-enter when video ends
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleEnter);
      return () => video.removeEventListener('ended', handleEnter);
    }
  }, []);

  return (
    <div className={`landing-container ${isExiting ? 'fade-out' : ''}`}>
      <video
        ref={videoRef}
        className="landing-video"
        autoPlay
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
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