import React from 'react'
import Country from './Country'
import Weather from './Weather'

const Countries = ({countries, weather, button}) => {

    if(countries.length>10) {
        return (
            <p>Too many machest, specify another filter</p>
        )
    } else if (countries.length<=10 && countries.length>1){
        return (
            <div>
                {countries.map((country) => 
                    <Country key={country.name} country={country} button={button}/>)}
            </div>
        )
    } else if (countries.length === 1) {
        const one = true
        const country = countries[0]
        return (
            <div>
                <Country key={country.name} country={country} one={one}/>    
                <Weather weather={weather}/>        
            </div>
        )
    } 
    else {
        return (<p>We didn't find any matches</p>)
    }
}

export default Countries