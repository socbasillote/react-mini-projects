import React from 'react'

function Controller({ pomodoro, shortbreak, longbreak, activeMode }) {

    /* 
        pomodoro
        short break
        long break
    */


  return (
    <div className='controller-buttons'>
        <button onClick={pomodoro} className={activeMode === 'pomodoro' ? 'active' : ''}>Pomodoro</button>
        <button onClick={shortbreak} className={activeMode === 'shortbreak' ? 'active' : ''}>Short Break</button>
        <button onClick={longbreak} className={activeMode === 'longbreak' ? 'active' : ''}>Long Break</button>
    </div>
  )
}

export default Controller