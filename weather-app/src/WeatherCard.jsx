import React, {useState } from 'react'

function WeatherCard({ weather,handleConvert, conversion }) {
    
  const { name, main, weather: weatherDetails } = weather;

  

  let farenheitconversion = ((main.temp * 9 / 5) + 32).toFixed(2); 


  const icon = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`
  return (
    <div>
        <img src={icon} />
        <h2>{name}</h2>
        <h3>{conversion ? main.temp : farenheitconversion}</h3>
        <p>{weatherDetails[0].main} - {weatherDetails[0].description}</p>
        <button onClick={handleConvert}>Convert</button>
    </div>
  )
}

export default WeatherCard