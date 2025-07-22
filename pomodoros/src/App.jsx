import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Pomodoro from './pages/Pomodoro'
import Navbar from './components/Navbar'

import './App.css';

function App() {
  const [username, setUsername] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem('PomodoroUser');
    if (storedUser) setUsername(storedUser);
  })

  return (
    <Router>
      {username && <Navbar username={username} setUsername={setUsername} />}

      <Routes>
        <Route 
          path='/'
          element={
            username ? <Navigate to='/pomodoro' /> : <Navigate to='/login' />
          }
        />
        <Route 
          path='/login'
          element={<Login setUsername={setUsername}/>} 
        />
        <Route 
          path='/pomodoro'
          element={
            username ? <Pomodoro username={username} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  )
}

export default App