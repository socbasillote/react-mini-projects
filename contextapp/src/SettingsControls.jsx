// SettingsControls.jsx
import React, { useContext } from 'react';
import SettingsContext from './SettingsContext';

function SettingsControls() {
  const {
    theme,
    toggleTheme,
    fontSize,
    increaseFont,
    decreaseFont,
  } = useContext(SettingsContext);

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="toggle-button"
        style={{ marginBottom: '1rem' }}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      {/* Font Size Controls */}
      <div>
        <p>Font Size: {fontSize}</p>
        <button onClick={decreaseFont} style={{ marginRight: '10px' }}>
          A-
        </button>
        <button onClick={increaseFont}>A+</button>
      </div>
    </div>
  );
}

export default SettingsControls;
