/* import { useState, useEffect } from 'react'

import Timer from '../components/Timer';
import Controller from '../components/Controller';

import useUser from '../hooks/useUser';
import useHistory from '../hooks/useHistory';


function Pomodoro() {
  const focusTime = 3; //25 * 60; //25 mins
  const shortBreak = 2; //5 * 60;
  const longBreak = 4;//15 * 60

  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);


  const [countInterval, setCountInterval] = useState(1);
  const [isFocus, setIsFocus] = useState(true); // true = focus, false = break

  const [activeMode, setActiveMode] = useState('pomodoro');

  const {username, login, logout} = useUser();
  const { history, completeFocusSession} = useHistory(username);

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
        <p className='mt-5'>{countInterval} / 4</p>

      <div className='mt-10'>
          <button onClick={handleStart} className='strBtn'>{isRunning ? 'Pause' : 'Start'}</button>
            {isRunning ?
              <button onClick={handleNext} className='strBtn'>Next</button>
              : ''
          }
      </div>

    </div>
  )
}

export default Pomodoro
 */