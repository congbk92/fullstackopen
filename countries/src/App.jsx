import { useState, useEffect } from 'react'
import countryService from './services/country'
import weatherService from './services/weather'
import axios from 'axios'

const Search = ({filter, onChangeFilter}) => {
  return (
  <div>
    <p>find country:  <input value={filter} onChange={onChangeFilter}/> </p>
  </div>
  )
}

const Flag = ({flag}) => {
  return (
    <div>
      <p></p>
      <img src={flag.png} alt={flag.alt} />
    </div>
  )
}

const CountryDetail = ({countryName}) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    countryService.getCountryInfo(countryName).then(country => {
      console.log("country: ", country)
      const newCountry = {
        name: country.name.common,
        capital: country.capital ? country.capital[0] : country.name.common,
        area: country.area,
        languages: Object.values(country.languages),
        flags: country.flags,
        lat: country.latlng[0],
        lon: country.latlng[1],
      }
      weatherService.getWeather(newCountry.lat, newCountry.lon).then(data =>{
        console.log("weather: ", data)
        const countryWithWeather = {...newCountry,
          temp: data.main.temp,
          weatherIconUrl: data.weatherIconUrl,
          weatherDes: data.weather[0].description,
          wind: data.wind.speed
        }
        setCountry(countryWithWeather)
      })
    })
  }, [countryName])

  console.log("In Country component: ", country)
  if (!country) {
    return
  }
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h1>Languages</h1>
      {country.languages.map(language => <li key = {language}>{language}</li>)}
      <Flag flag={country.flags} />
      <p>Temperature {country.temp} Celsius</p>
      <img src={country.weatherIconUrl} alt={country.weatherDes} />
      <p>Wind {country.wind} m/s</p>
    </div>
  )
}

const Country = ({name, onShowClick}) => {
  return (
    <div>
      {name}<button onClick={onShowClick}>Show</button>
    </div>
  )
}

const App = () => {
  const [filterCountry, setFilterCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  
  const onChangeFilterCountry = (event) => {
    const filter = event.target.value
    setFilterCountry(filter)
    const newCountries = allCountries.filter(country => country.toUpperCase().includes(filter.toUpperCase()))  
    setCountries(newCountries)
  }

  useEffect(() => {
    countryService.getAllCountryName().then(data => {
      console.log("all countries ", data)
      const newAllCountries = data
      setAllCountries(newAllCountries)
      const newCountries = newAllCountries.filter(country => country.toUpperCase().includes(filterCountry.toUpperCase()))  
      setCountries(newCountries)
    })
  }, [])

  const onShowCountry = (country) => {
    console.log(`Clicked show ${country}`)
    setCountries([country])
  }

  if (countries.length === 1) {
    return (
      <div>
        <Search filter={filterCountry} onChangeFilter={onChangeFilterCountry} />
        <CountryDetail countryName={countries[0]} />
      </div>
    )
  } else if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        <Search filter={filterCountry} onChangeFilter={onChangeFilterCountry} />
        {countries.map(country => <Country key={country} name={country} onShowClick={() => onShowCountry(country)} />)}
      </div>
    )
  } else if (countries.length > 10){
    return (
      <div>
        <Search filter={filterCountry} onChangeFilter={onChangeFilterCountry} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else {
    return (
    <div>
        <Search filter={filterCountry} onChangeFilter={onChangeFilterCountry} />
    </div>
    )
  }
}

export default App
