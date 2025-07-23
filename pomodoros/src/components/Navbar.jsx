import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar({ username, setUsername }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        setUsername("");
        localStorage.removeItem("pomodoroUser");
    };

    return (
        <nav className='flex items-center justify-between px-6 py-4 bg-zinc-900 text-white shadow-md'>
            <div className="text-xl font-semibold">
                <span role='img' aria-label='logo'>🍅</span>Pomodoro
            </div>
            <div className="flex items-center gap-4">
                {username ? (
                    <>
                        <span className='font-medium text-sm'> {username}</span>
                        <button 
                            onClick={handleLogout}
                            className='bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm'
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleLogin}
                        className='bg-green-600 hover:bg-green-500 px-4 py-1.5 rounded text-sm'
                        
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar