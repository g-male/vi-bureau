'use client';

import React, { useState } from 'react';
import LandingPage from './LandingPage';
import ModelClientWrapper from './ModelClientWrapper';

export default function HomePageWrapper({ homepage, model }) {
  const [showLanding, setShowLanding] = useState(true);

  const handleEnter = () => {
    setShowLanding(false);
  };

  return (
    <>
      {showLanding ? (
        <LandingPage 
          onEnter={handleEnter}
          videoUrl="/VI BUREAU_11.11.25_1.mp4"
        />
      ) : (
        <ModelClientWrapper homepage={homepage} model={model} />
      )}
    </>
  );
}