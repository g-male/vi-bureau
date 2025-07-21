'use client';

import React, { createContext, useContext, useState } from 'react';

// Create context
const ModelPortraitContext = createContext();

export function ModelPortraitProvider({ children }) {
  const [activePortrait, setActivePortrait] = useState(null);
  
  return (
    <ModelPortraitContext.Provider value={{ activePortrait, setActivePortrait }}>
      {children}
    </ModelPortraitContext.Provider>
  );
}

// Custom hook to use the context
export function useModelPortrait() {
  const context = useContext(ModelPortraitContext);
  if (!context) {
    throw new Error('useModelPortrait must be used within a ModelPortraitProvider');
  }
  return context;
}