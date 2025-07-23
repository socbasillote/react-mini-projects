import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Pomodoro from './pages/Pomodoro'
import Navbar from './components/Navbar'

import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'

import './App.css';


function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const [username, setUsername] = useState(null);

  const [firebaseUser, setFirebaseUser] = useState(null);

  const [focusDuration, setFocusDuration] = useState(3);
  const [shortBreakDuration, setShortBreakDuration] = useState(2);
  const [longBreakDuration, setLongBreakDuration] = useState(4);
  const [longBreakInterval, setLongBreakInterval] = useState(4);

  useEffect(() => {
    if (!firebaseUser || !username ) return;

    // 2. Save to firestore if user is logged in
    const saveSettingsToFirestore = async () => {
      const settings = {
      focusDuration,
      shortBreakDuration,
      longBreakDuration,
      longBreakInterval
    };
    
      // 1. SAve to localStorage
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        await setDoc(
          userRef,
          { settings },
          { merge: true }
        )
      } catch (error) {
        console.error('Error saving settings to Firestore:', error.message);
      }
    };
    

    saveSettingsToFirestore();

  }, [firebaseUser, focusDuration, shortBreakDuration, longBreakDuration, longBreakInterval])

  useEffect(() => {
    const storedUser = localStorage.getItem('pomodoroUser');
    if (storedUser) setUsername(storedUser);
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          setFirebaseUser(user); // ← Always set this if user is present

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUsername(userData.name || '');
            localStorage.setItem('pomodoroUser', userData.name);
          } else {
            setUsername('');
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
          setFirebaseUser(user); // still keep the user
          setUsername('');       // maybe show default name or prompt
        }
      } else {
        setFirebaseUser(null);
        setUsername('');
        localStorage.removeItem('pomodoroUser');
      }
    });

    return () => unsubscribe();
  }, []);


  const notShowNavbar = location.pathname !== '/login';

  

  return (
    <>
      { notShowNavbar &&  
        <Navbar 
          username={username} 
          setUsername={setUsername} 
          firebaseUser={firebaseUser}
          focusDuration={focusDuration}
          setFocusDuration={setFocusDuration}
          shortBreakDuration={shortBreakDuration}
          setShortBreakDuration={setShortBreakDuration}
          longBreakDuration={longBreakDuration}
          setLongBreakDuration={setLongBreakDuration}
          longBreakInterval={longBreakInterval}
          setLongBreakInterval={setLongBreakInterval}
        />}

      <Routes>
        <Route 
          path='/' 
          element={
            <Pomodoro 
              username={username}
              focusDuration={focusDuration}
              shortBreakDuration={shortBreakDuration}
              longBreakDuration={longBreakDuration}
              longBreakInterval={longBreakInterval}
            />
          } 
        
        />
        <Route path='/login' element={<Login setUsername={setUsername}/>} />
        <Route path='/signup' element={<Signup setUsername={setUsername}/>} />
      </Routes>
    </>
      

  )
}

export default AppWrapper