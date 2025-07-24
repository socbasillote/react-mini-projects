import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // make sure this path is correct


function Signup({ setUsername }) {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();


    if (!email || !password) {
      setError('Email and password are required');
      return;
    }


    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      // Save to firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: user.email,
        createdAt: new Date(),
      })
      // Save username/email in app state and localStorage
      setUsername(name);
      localStorage.setItem('pomodoroUser', name);

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">🍅 Sign Up</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input 
            type='text'
            placeholder='Name'
            className="px-4 py-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-red-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
