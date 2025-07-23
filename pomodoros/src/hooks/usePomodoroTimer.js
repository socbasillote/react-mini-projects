import { useState, useEffect } from 'react';

export default function usePomodoroTimer({ focusTime, shortBreak, longBreak, longBreakInterval, onSessionComplete }) {
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [countInterval, setCountInterval] = useState(1);
  const [activeMode, setActiveMode] = useState('pomodoro');

  // Timer countdown logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Auto-transition on session end
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setTimeout(() => {
        handlePhaseSwitch();
        setIsRunning(true);
      }, 1000);
    }
  }, [timeLeft, isRunning]);

  // Mode logic
  const handlePhaseSwitch = () => {
    if (isFocus) {
      if (countInterval === longBreakInterval) {
        setTimeLeft(longBreak);
        setCountInterval(0);
        setIsFocus(false);
        setActiveMode('longbreak');
      } else {
        setTimeLeft(shortBreak);
        setCountInterval(count => count + 1);
        setIsFocus(false);
        setActiveMode('shortbreak');
      }
      onSessionComplete?.();
    } else {
      setTimeLeft(focusTime);
      setIsFocus(true);
      setActiveMode('pomodoro');
    }
  };

  // Control functions
  const handleStart = () => setIsRunning(prev => !prev);
  const handleNext = () => {
    setIsRunning(false);
    handlePhaseSwitch();
  };

  const switchToPomodoro = () => {
    if (!isRunning) {
      setTimeLeft(focusTime);
      setIsFocus(true);
      setActiveMode('pomodoro');
    }
  };
  const switchToShortBreak = () => {
    setTimeLeft(shortBreak);
    setActiveMode('shortbreak');
  };
  const switchToLongBreak = () => {
    setTimeLeft(longBreak);
    setActiveMode('longbreak');
  };

  return {
    timeLeft,
    isRunning,
    activeMode,
    countInterval,
    handleStart,
    handleNext,
    switchToPomodoro,
    switchToShortBreak,
    switchToLongBreak,
  };
}
