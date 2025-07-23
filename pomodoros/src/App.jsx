import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Pomodoro from './pages/Pomodoro'
import Navbar from './components/Navbar'

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

  useEffect(() => {
    const storedUser = localStorage.getItem('pomodoroUser');
    if (storedUser) setUsername(storedUser);
  }, [])

  const notShowNavbar = location.pathname !== '/login'

  return (
    <>
      {notShowNavbar &&  <Navbar username={username} setUsername={setUsername} />}
      <Routes>
        <Route path='/' element={<Navigate to='/pomodoro' /> } />
        <Route path='/login' element={<Login setUsername={setUsername}/>} />
        <Route  path='/pomodoro' element={ <Pomodoro username={username} /> }/>
      </Routes>
    </>
      

  )
}

export default AppWrapper