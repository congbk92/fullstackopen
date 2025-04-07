import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"

const getAllCountryName = () => {
    return axios.get(`${baseUrl}/all`)
                .then(resp => resp.data.map(country => country.name.common))
}

const getCountryInfo = (country) => {
    return axios.get(`${baseUrl}/name/${country}`)
    .then(resp => resp.data)   
}

export default {getAllCountryName, getCountryInfo}