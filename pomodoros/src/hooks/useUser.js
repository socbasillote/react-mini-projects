import React, {useState, useEffect} from 'react'

function useUser() {
    const [username, setUsername] = useState(localStorage.getItem('pomodoroUser') || '');

    useEffect(() => {
        if (username) {
            localStorage.setItem('pomodoroUser', username);
        }
    }, [username])

    const login = (name) => {
        setUsername(name);
        localStorage.setItem('pomodoroUser', name);
    }

    const logout = () => {
        setUsername('');
        localStorage.removeItem('pomodoroUser');
    }

    return {username, login, logout};
  
}

export default useUser