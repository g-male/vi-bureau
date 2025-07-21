'use client';

import React from 'react';
import { useModelPortrait } from '@/components/ModelPortraitContext';
import { urlForImage } from '@/lib/sanity';

export default function ModelListItem({ model }) {
  const { setActivePortrait } = useModelPortrait();
  
  const handleMouseEnter = () => {
    if (model.portrait) {
      setActivePortrait(urlForImage(model.portrait).url());
    }
  };
  
  const handleMouseLeave = () => {
    setActivePortrait(null);
  };
  
  return (
    <div
      className="text-lg py-1 hover:font-bold transition-all duration-200 cursor-pointer text-center tracking-wide"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {model.name.toUpperCase()}
    </div>
  );
}