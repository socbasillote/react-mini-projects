
import React, {useEffect, useState} from 'react'

function PomodoroTracker() {
    const [username, setUsername] = useState(localStorage.getItem('pomodoroUser') || '');
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('pomodoroHistory');
        return saved ? JSON.parse(saved) : {};
    });

    const today = new Date.toISOString().slice(0, 10);

    useEffect(() => {
        if (username) {
            localStorage.setItem('pomodoroUser', username);
        }
    }, [username])

    // SAve history on change
    useEffect(() => {
        localStorage.setItem('pomodoroHistory', JSON.stringify(history));
    }, [history]);

    // Increase today's session count (you'll call this when focustimer completes)
    const completeFocusSession = () => {
        setHistory(prev => ({
            ...prev,
            [today]: (prev[today] || 0) + 1
        }));
    };

    return (
        <div>
            {!username ? (
                <input 
                    placeholder='Enter your name'
                    onBlur={(e) => setUsername(e.target.value)}
                />
            ) : (
                <>
                    <h2>Hi, {username} </h2>
                    <p>You've completed <strong>{history[today] || 0}</strong> Pomodoro(s) today</p>
                    <button onClick={completeFocusSession}>Simulate Focus Done</button>
                </>
            )}
        </div>
    )
}

export default PomodoroTracker