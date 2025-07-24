// FontSizeProvider.js
import React, { useState } from 'react';
import FontSizeContext from './FontSizeContext';

function FontSizeProvider({ children }) {
  const [fontSize, setFontSize] = useState('16px');

  const increase = () =>
    setFontSize((prev) => `${parseInt(prev) + 2}px`);

  const decrease = () =>
    setFontSize((prev) =>
      parseInt(prev) > 10 ? `${parseInt(prev) - 2}px` : prev
    );

  const value = { fontSize, increase, decrease };

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
}

export default FontSizeProvider;
