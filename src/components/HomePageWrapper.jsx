'use client';

import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import ModelClientWrapper from './ModelClientWrapper';

export default function HomePageWrapper({ homepage, model }) {
  const [showLanding, setShowLanding] = useState(null);

  useEffect(() => {
    const hasPlayedThisSession = sessionStorage.getItem('landingPlayed');
    setShowLanding(hasPlayedThisSession !== 'true');
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem('landingPlayed', 'true');
    setShowLanding(false);
  };

  if (showLanding === null) {
    return null;
  }

  return (
    <>
      {showLanding ? (
        <LandingPage 
          onEnter={handleEnter}
          videoUrl="/2-VI BUREAU_11.11.25_1.mp4"           // Desktop video
          mobileVideoUrl="/TEASER_2.mp4"  // Mobile portrait video
        />
      ) : (
        <ModelClientWrapper homepage={homepage} model={model} />
      )}
    </>
  );
}
