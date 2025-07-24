// FontSizeControls.js
import React, { useContext } from 'react';
import SettingsContext from '../SettingsContext';

function FontSizeControls() {
  const { fontSize, increaseFont, decreaseFont } = useContext(SettingsContext);

  return (
    <div style={{ marginTop: '2rem' }}>
      <p>Current Font Size: {fontSize}</p>
      <button onClick={decreaseFont} style={{ marginRight: '10px' }}>
        A-
      </button>
      <button onClick={increaseFont}>A+</button>
    </div>
  );
}

export default FontSizeControls;
