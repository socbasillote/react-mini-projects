import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Pomodoro from './pages/Pomodoro';
import Navbar from './components/Navbar';

import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import './App.css';

// Wrapper needed because `useLocation()` must be inside <Router>
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  const [firebaseUser, setFirebaseUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [settings, setSettings] = useState({
    focusDuration: 3,
    shortBreakDuration: 2,
    longBreakDuration: 4,
    longBreakInterval: 4,
  });

  const [didFetchSettings, setDidFetchSettings] = useState(false);

  // Load stored username if available
  useEffect(() => {
    const storedUser = localStorage.getItem('pomodoroUser');
    if (storedUser) setUsername(storedUser);
  }, []);

  // Watch auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFirebaseUser(null);
        setUsername('');
        localStorage.removeItem('pomodoroUser');
        return;
      }

      setFirebaseUser(user);

      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const name = userData.name || '';
          const fetchedSettings = userData.settings || {};

          setUsername(name);
          localStorage.setItem('pomodoroUser', name);

          setSettings((prev) => ({
            ...prev,
            ...fetchedSettings,
          }));
        } else {
          setUsername('');
        }

        setDidFetchSettings(true);
      } catch (err) {
        console.error('Error fetching user document:', err);
        setUsername('');
        setDidFetchSettings(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync settings to Firestore
  useEffect(() => {
    if (!firebaseUser || !username || !didFetchSettings) return;

    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));

    const saveSettings = async () => {
      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        await setDoc(userRef, { settings }, { merge: true });
      } catch (err) {
        console.error('Error saving settings to Firestore:', err.message);
      }
    };

    const timeout = setTimeout(saveSettings, 1000); // debounce

    return () => clearTimeout(timeout);
  }, [firebaseUser, username, didFetchSettings, settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && (
        <Navbar
          username={username}
          setUsername={setUsername}
          firebaseUser={firebaseUser}
          {...settings}
          setFocusDuration={(v) => updateSetting('focusDuration', v)}
          setShortBreakDuration={(v) => updateSetting('shortBreakDuration', v)}
          setLongBreakDuration={(v) => updateSetting('longBreakDuration', v)}
          setLongBreakInterval={(v) => updateSetting('longBreakInterval', v)}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Pomodoro
              username={username}
              {...settings}
            />
          }
        />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/signup" element={<Signup setUsername={setUsername} />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
