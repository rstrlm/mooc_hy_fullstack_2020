import axios from 'axios'


const api_key = process.env.REACT_APP_API_KEY
const baseUrl = `http://api.weatherstack.com/current?access_key=${api_key}`

const getWeather = country => {
    const request = axios.get(`${baseUrl}&query=${country}`)
    return request.then(response => response.data)
}

export default { getWeather }