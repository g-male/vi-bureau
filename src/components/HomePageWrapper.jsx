'use client';

import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import ModelClientWrapper from './ModelClientWrapper';

export default function HomePageWrapper({ homepage, model }) {
  const [showLanding, setShowLanding] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mount before checking sessionStorage
  useEffect(() => {
    setMounted(true);
    const hasPlayedThisSession = sessionStorage.getItem('landingPlayed');
    if (hasPlayedThisSession === 'true') {
      setShowLanding(false);
    }
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem('landingPlayed', 'true');
    setShowLanding(false);
  };

  // Don't render anything until mounted (avoids hydration mismatch)
  if (!mounted) {
    return null;
  }

  return (
    <>
      {showLanding ? (
        <LandingPage 
          onEnter={handleEnter}
          videoUrl="/2-VI BUREAU_11.11.25_1.mp4"
        />
      ) : (
        <ModelClientWrapper homepage={homepage} model={model} />
      )}
    </>
  );
}