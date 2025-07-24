import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // make sure path is correct

function Login({ setUsername }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save username/email in app state and localStorage
      setUsername(user.email);
      localStorage.setItem('pomodoroUser', user.email);

      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">👋 Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 py-2 rounded text-sm font-medium"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-red-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;




/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login({ setUsername }) {
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false); // 🔁 Toggle mode
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    // For now: Just store in localStorage
    localStorage.setItem("pomodoroUser", name);
    setUsername(name);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isSignup ? "🍅 Sign Up" : "🍅 Login"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-zinc-400">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-red-400 hover:underline"
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
 */