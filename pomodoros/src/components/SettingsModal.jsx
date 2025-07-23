import React from 'react'

import '../styles/SettingsModal.css'

function SettingsModal({
    onClose,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    setFocusDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    setLongBreakInterval
}) {
    const handleBackdropClick = (e) => {
        if (e.target.className === 'modal-backdrop') {
            onClose();
        }
    }
  return (
    <div className='modal-backdrop' onClick={handleBackdropClick}>
        <div className='settings-modal'>
            <h2>Timer Settings</h2>

            <label>
                Focus Duration (minutes);
                <input 
                    type='number'
                    value={focusDuration}
                    onChange={(e) => setFocusDuration(Number(e.target.value))}
                    min='1'
                />
            </label>

            <label>
                Short Break Duration (minutes)
                <input 
                    type='number'
                    value={shortBreakDuration}
                    onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                    min='1'
                />
            </label>

            <label>
                Long Break Duration (minutes)
                <input 
                    type='number'
                    value={longBreakDuration}
                    onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                    min='1'
                />
            </label>

            <label>
                Long Break Interval (sessions)
                <input 
                    type='number'
                    value={longBreakInterval}
                    onChange={(e) => setLongBreakInterval(Number(e.target.value))}
                    min='1'
                />
            </label>

            <button onClick={onClose} className='close-btn'>Close</button>
        </div>
        
    </div>
  )
}

export default SettingsModal