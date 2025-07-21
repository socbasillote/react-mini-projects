import { useState } from 'react'
import WeatherCard from './WeatherCard';
import Spinner from './Spinner';
import { API_KEY } from './keys';
<<<<<<< HEAD
=======

>>>>>>> 1d8c07674820c9814518e2ab64a071789d7f729c
import './App.css'



function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [conversion, setConversion] = useState(true);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
        `
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  }
  
  const handleConversion = (e) => {
    setConversion(prev => !prev)
  }

  return (
    <>
      <div>
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit} id='aform'>
          <input 
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>

        {loading && <Spinner />}
        {error && <p className='error'>{error}</p>}
        {weather && <WeatherCard weather={weather} conversion={conversion} handleConvert={handleConversion}/>}
      </div>
    </>
  )
}

export default App
