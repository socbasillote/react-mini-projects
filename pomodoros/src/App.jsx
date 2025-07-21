import { useState } from 'react'

import Timer from './components/Timer';
import './App.css'
import { useEffect } from 'react';

function App() {
  const focusTime = 60; //25 * 60; //25 mins

  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [focus, setFocus] = useState(true);

  useEffect(() => {
    let timer 

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    console.log(timer)
    
    return () => clearInterval(timer);
  }, [timeLeft, isRunning])


  const handleStart = () => {
    setIsRunning(prev => !prev)
  }
  
  return (
    <div>
      <h1>Pomodoro</h1>
        <Timer time={timeLeft}/>

      <button onClick={handleStart}>Start</button>
    </div>
  )
}

export default App
