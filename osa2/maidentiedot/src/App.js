import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Components/Weather'


const App = () => {

  const [newCountry, setNewCountry ] = useState('')
  const [Countries, setCountries ] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const changeCountry = (event) => {
    event.preventDefault()
    setNewCountry(event.target.value)
  }

  const ButtonClicked = (country) => {
    setNewCountry(country.name)
  }

  const ShowCountries = ({Countries, newCountry}) => {
    if(newCountry.length > 0) {
      const filteredCountries = Countries.filter(country => country.name.toLowerCase().includes(newCountry.toLowerCase()))
      if(filteredCountries.length < 10 && filteredCountries.length !== 1) {
        return (
          filteredCountries.map(country => 
            <div key={country.name}>
              <p>{country.name}
                <button onClick={() => ButtonClicked(country)}>show</button>
              </p>
            </div>
          )
        )
      } else if(filteredCountries.length === 1){
        return (
          <div>
            <CountryDetails country={filteredCountries[0]}/>
          </div>
        )
      } else {
        return (
          <p>Too many matches, specify another filter</p>
        )
      }
    } else {
      return (
        null
      )
    }
  }
  
  const CountryDetails = ({country}) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language =>
            <li key ={language.name}>{language.name}</li>
          )}
        </ul>
        <img width="150" heigth="250" src={country.flag} alt="flag" ></img>
        <Weather capital={country.capital}/>
      </div>
    )
  }

  return (
    <div>
      <div>
        find countries <input value={newCountry} onChange={changeCountry}/>
      </div>
      <div>
        <ShowCountries Countries={Countries} newCountry={newCountry}/>
      </div>
    </div>
  )
}

export default App;
