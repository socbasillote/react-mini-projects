import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Login({ setUsername }) {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();


        if (!name.trim()) return;

        localStorage.setItem("pomodoroUser", name);
        setUsername(name);
        navigate("/");
    }

    
    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <div className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4 text-center">🍅 Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-500 py-2 rounded text-sm font-medium"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login