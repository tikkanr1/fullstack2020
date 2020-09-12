import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const apiKey = process.env.REACT_APP_API_KEY
    const [weatherData, setWeatherData] = useState([])
    
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`).then(response => {
        setWeatherData(response.data)
        })
    }, [capital, apiKey])

    console.log(weatherData)

    if(weatherData.length === 0){
        return null
    } else {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature: {weatherData.current.temperature} Celcius</p>
                <img width="80" height="80" alt="icon" src={weatherData.current.weather_icons[0]}></img>
                <p>wind: {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
            </div>
        )
    }
}

export default Weather