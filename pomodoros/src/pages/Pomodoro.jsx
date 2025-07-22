import { useState, useEffect } from 'react'

import Timer from '../components/Timer';
import Controller from '../components/Controller';


function App() {
  const focusTime = 3; //25 * 60; //25 mins
  const shortBreak = 2; //5 * 60;
  const longBreak = 4;//15 * 60

  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);


  const [countInterval, setCountInterval] = useState(1);
  const [isFocus, setIsFocus] = useState(true); // true = focus, false = break

  const [activeMode, setActiveMode] = useState('pomodoro');

  const [username, setUsername] = useState(localStorage.getItem('pomodoroUser') || '');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('pomodoroHistory');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (username) {
      localStorage.setItem('pomodoroUser', username);
    }
  }, [username]);

  useEffect(() => {
    localStorage.setItem('pomodoroHistory', JSON.stringify(history));
  }, [history])

  const completeFocusSession = () => {
    const today = new Date().toISOString().slice(0, 10);
    setHistory(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + 1
    }));
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev =>  prev - 1);
      }, 1000);
    } 

    return () => clearInterval(timer);
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setTimeout(() => {
        handlePhase();
        setIsRunning(true);
      }, 1000);
    }
  }, [timeLeft, isRunning])


  useEffect(() => {
    if (activeMode === 'pomodoro') {
      document.body.style.backgroundColor = '#ff6b6b';
    } else if (activeMode === 'shortbreak') {
      document.body.style.backgroundColor = '#4ecdc4';
    } else if (activeMode === 'longbreak') {
      document.body.style.backgroundColor = '#1a535c';
    }
  }, [activeMode])
  
  const handlePhase = () => {
        if (isFocus) {
            if (countInterval === 4) {
              setTimeLeft(longBreak)
              setCountInterval(0)
              setIsFocus(false);
              completeFocusSession();
              setActiveMode('longbreak')
            } else {
              setTimeLeft(shortBreak)
              setActiveMode('shortbreak')
              setIsFocus(false);
              setCountInterval(count => count + 1)
              completeFocusSession();
              console.log('short break')
            }
            
        } else {
          setTimeLeft(focusTime)
          setIsFocus(true);
          setActiveMode('pomodoro')
          console.log('focus time')
        }

  }

  const handleStart = () => {
    setIsRunning(prev => !prev)

  }
  const handleNext = () => {
    setIsRunning(false)
    handlePhase();
  }
  const handleShortbreak = () => {
    setTimeLeft(shortBreak)
    setActiveMode('shortbreak')
  }
  const handleLongBreak = () => {
    setTimeLeft(longBreak)
    setActiveMode('longbreak')
  }
  const handlePomodoro = () => {
    if (isRunning) return
    setTimeLeft(focusTime)
    setActiveMode('pomodoro')
    setIsFocus(true)
  }
  
  return (
    <div>
      <h1>Pomodoro</h1>
      <Controller 
        pomodoro={handlePomodoro}
        shortbreak={handleShortbreak}
        longbreak={handleLongBreak}
        activeMode={activeMode}
      />
        <Timer time={timeLeft}/>
        <p>{countInterval} / 4</p>

      <button onClick={handleStart} className='strBtn'>{isRunning ? 'Pause' : 'Start'}</button>
      {isRunning ?
        <button onClick={handleNext} className='strBtn'>Next</button>
        : ''
    }

    </div>
  )
}

export default App
