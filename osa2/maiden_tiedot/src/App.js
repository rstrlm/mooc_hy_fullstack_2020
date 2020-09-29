import React, { useState, useEffect } from 'react'
import axios from 'axios'
import weatherService from './service/weather.js'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])
    const [weather, setWeather] = useState(null);


    useEffect(() => {
        console.log('alustetaan maat');
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
            
    }, [])
    // console.log(countries)
    // console.log(filteredCountries)

    const handleFilterChange = (event) => {
        // console.log(event.target.value)
        setFilter(event.target.value)
        const filter = event.target.value
        handleFilterCountries({countries,filter})
    }

    const handleFilterButton = ({ country }) => {
        // console.log("value ",country.name)
        setFilter(country.name)
        const filter = country.name
        handleFilterCountries({countries,filter})
    }
    const handleFilterCountries = ({countries,filter}) => {
        if (filter.length > 0) {
            // console.log('filtteröidään');
            const filterCountries = filter.length > 0
                ? countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                : countries;
            setFilteredCountries(filterCountries)
            if (filterCountries.length === 1) {
                getWeather(filterCountries[0].name)
            } else {
                setWeather(null)
            }
        }
    }

    const getWeather = (country) => {
        weatherService
            .getWeather(country)
            .then(countryWeather => {
                setWeather(countryWeather)
                // console.log(countryWeather);
            });
    }

    return (
        <div>
            <p>Find countries <input value={filter} onChange={handleFilterChange} placeholder="search for..." /></p>
            <Countries filter={filter} countries={filteredCountries} weather={weather} button={handleFilterButton} />
        </div>
    )
}

export default App

/** 
 * Tää tehtävä aiheutti yllättävän paljon pähkäilyä ennen kuin sai kaikki varoitukset poies
 * ja ettei refrashattu sivua turhaan
 */