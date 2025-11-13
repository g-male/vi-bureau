'use client';

import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import ModelClientWrapper from './ModelClientWrapper';

export default function HomePageWrapper({ homepage, model }) {
  const [showLanding, setShowLanding] = useState(true);

  // Check if video has already played in this session
  useEffect(() => {
    const hasPlayedThisSession = sessionStorage.getItem('landingPlayed');
    if (hasPlayedThisSession === 'true') {
      setShowLanding(false);
    }
  }, []);

  const handleEnter = () => {
    // Mark as played for this session only
    sessionStorage.setItem('landingPlayed', 'true');
    setShowLanding(false);
  };

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