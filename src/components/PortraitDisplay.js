'use client';

import React from 'react';
import { useModelPortrait } from './ModelPortraitContext';
import Image from 'next/image';

export default function PortraitDisplay() {
  const { activePortrait } = useModelPortrait();
  
  return (
    <div className="h-full w-full relative">
      {activePortrait ? (
        <div className="absolute inset-0">
          <Image
            src={activePortrait}
            alt="Model portrait"
            fill
            sizes="33vw"
            priority
            className="object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-xl">Hover over a model&apos;s name to see their portraitsss</p>
        </div>
      )}
    </div>
  );
}