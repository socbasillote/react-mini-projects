import React, {useState} from 'react'
import SettingsModal from './SettingsModal';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


function Navbar({ 
    username, 
    setUsername,
    focusDuration,
    setFocusDuration,
    shortBreakDuration,
    setShortBreakDuration,
    longBreakDuration,
    setLongBreakDuration,
    longBreakInterval,
    setLongBreakInterval,
}) {
    
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUsername("");
            localStorage.removeItem("pomodoroUser");
            navigate('/login')
        } catch (err) {
            console.error('Logout failed:', err.message);
        }
        
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    }

    return (
        <div>

        
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
                    <button onClick={toggleModal}>Settings</button>
                </div>
                
            </nav>
            {/* 👇 Settings Modal */}
            {isModalOpen && (
                <SettingsModal
                onClose={toggleModal}
                focusDuration={focusDuration}
                setFocusDuration={setFocusDuration}
                shortBreakDuration={shortBreakDuration}
                setShortBreakDuration={setShortBreakDuration}
                longBreakDuration={longBreakDuration}
                setLongBreakDuration={setLongBreakDuration}
                longBreakInterval={longBreakInterval}
                setLongBreakInterval={setLongBreakInterval}
                />
            )}
        </div>
        
    )
}

export default Navbar