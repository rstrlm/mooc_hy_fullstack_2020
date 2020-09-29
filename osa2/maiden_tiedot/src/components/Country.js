import React from 'react'

const Country = ({country, button, one}) => {
    if(one) {
        return (
            <div>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h2>Spoken laguages</h2>
                <ul>
                {country.languages.map((languages) =>  
                    <li key={languages.name}>{languages.name}</li>)}
                </ul>
                <img src={country.flag} alt={'flag of ' + country.name} width='150px'></img>
            </div>
        )
    } else {
        return (
            <p>{country.name} <button onClick={() => button({country})} >show</button></p>
        )
    }
}
export default Country