import React, { useState } from 'react'
import SettingsContext from './SettingsContext'

function SettingsProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [fontSize, setFontSize] = useState('16px');

    const toggleTheme = () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    const increaseFont = () =>
        setFontSize((prev) => 
        parseInt(prev) > 10 ? `${parseInt(prev) + 2}px` : prev );

    const decreaseFont = () => 
        setFontSize((prev) => 
            parseInt(prev) > 10 ? `${parseInt(prev) - 2}px` : prev);

    const settings = {
        theme,
        toggleTheme,
        fontSize,
        increaseFont,
        decreaseFont,
    };
  return (
    <SettingsContext.Provider value={settings}>
        {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider