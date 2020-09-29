import React from 'react'

const Weather = ({weather}) => {

    if(weather !== null) {
    return (
        <div>
        <h2>Weather in {weather.location.country}</h2>
        <p><strong>temperature:</strong> {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} width='50px'></img>
        <p><strong>wind:</strong> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}</p>
        </div>
    )
    } else {
        return <p>Loading weather</p>
    }
}

export default Weather
