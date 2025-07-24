import React, {useContext} from 'react'

import SettingsContext from './SettingsContext';

function ThemedBox() {
    const { theme, fontSize } = useContext(SettingsContext);


    const styles = {
    padding: '2rem',
    marginTop: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    fontSize,
    backgroundColor: theme === 'dark' ? '#333' : '#eee',
    color: theme === 'dark' ? '#fff' : '#000',
  };

  return <div style={styles}>This box uses {theme} theme and {fontSize} font size.</div>;
}

export default ThemedBox