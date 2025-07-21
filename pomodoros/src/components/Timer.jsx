import React, {useState} from 'react'

function Timer({time}) {

  /* const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs};`
  } */
  return (
    <div>
       {time}
    </div>
  )
}

export default Timer