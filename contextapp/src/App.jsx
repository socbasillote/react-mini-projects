import { useContext } from 'react'
import SettingsProvider from './SettingsProvider'
import SettingsControls from './SettingsControls'
import ThemedBox from './ThemedBox'

import './App.css'



function App() {
  return (
    <SettingsProvider>
      <div className="app">
        <h1>Theme Toggle with Context</h1>
        <SettingsControls />
        <ThemedBox />
      </div>
    </SettingsProvider>
  );
}

export default App
