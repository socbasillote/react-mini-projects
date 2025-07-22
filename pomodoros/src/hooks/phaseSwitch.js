/*   export const handlePhase = (
        timeLeft,
        setTimeLeft,
        isFocus,
        setIsFocus,
        countInterval,
        setCountInterval,
        shortBreak,
        longBreak,
        focusTime
    ) => {
    
      if (timeLeft === 0) {
        setIsFocus(prev => !prev)
        if (isFocus) {
            if (countInterval === 4) {
              setTimeLeft(longBreak)
              console.log('long break')
              setCountInterval(0)
            } else {
              setTimeLeft(shortBreak)
              console.log('short break')
            }
            
        } else {
          setTimeLeft(focusTime)
          setCountInterval(count => count + 1)
          console.log('focus time')
        }
      } 
  }


  const phasing = () => {
    handlePhase(timeLeft, 
        setTimeLeft,
        isFocus,
        setIsFocus,
        countInterval,
        setCountInterval,
        shortBreak,
        longBreak,
        focusTime
      )
  } */