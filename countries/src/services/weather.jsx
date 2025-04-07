import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5'
const OPEN_WEATHER_API = import.meta.env.VITE_OPEN_WEATHER_API

const getWeather = (lat, lon) => {
    return axios.get(`${baseUrl}/weather`, {
        params: {
            lat: lat,
            lon: lon,
            appid: OPEN_WEATHER_API,
        }
    }).then(resp => {
        return {...resp.data, weatherIconUrl: `https://openweathermap.org/img/wn/${resp.data.weather[0].icon}@2x.png`}
    })
}

export default { getWeather }