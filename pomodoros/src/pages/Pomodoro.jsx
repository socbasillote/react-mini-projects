import { useState, useEffect } from 'react'

import Timer from '../components/Timer';
import Controller from '../components/Controller';


import useUser from '../hooks/useUser';
import useHistory from '../hooks/useHistory';
import usePomodoroTimer from '../hooks/usePomodoroTimer';

function Pomodoro() {
  const { username } = useUser();
  const { completeFocusSession } = useHistory(username);

  // settings

  const [focusDuration, setFocusDuration] = useState(3);
  const [shortBreakDuration, setShortBreakDuration] = useState(2);
  const [longBreakDuration, setLongBreakDuration] = useState(4);
  const [longBreakInterval, setLongBreakInterval] = useState(4);

  const {
    timeLeft,
    isRunning,
    activeMode,
    countInterval,
    handleStart,
    handleNext,
    switchToPomodoro,
    switchToShortBreak,
    switchToLongBreak,
  } = usePomodoroTimer({
    focusTime: focusDuration,
    shortBreak: shortBreakDuration,
    longBreak: longBreakDuration,
    longBreakInterval: longBreakInterval,
    onSessionComplete: completeFocusSession
  });

  useEffect(() => {
    if (activeMode === 'pomodoro') {
      document.body.style.backgroundColor = '#ff6b6b';
    } else if (activeMode === 'shortbreak') {
      document.body.style.backgroundColor = '#4ecdc4';
    } else if (activeMode === 'longbreak') {
      document.body.style.backgroundColor = '#1a535c';
    }
  }, [activeMode])
  

  return (
    <div>
      <h1>Pomodoro</h1>
      <Controller 
        pomodoro={switchToPomodoro}
        shortbreak={switchToShortBreak}
        longbreak={switchToLongBreak}
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
