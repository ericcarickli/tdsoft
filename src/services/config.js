import axios from 'axios'

export const http = axios.create({
        baseURL: 'http://api.weatherbit.io/v2.0/'
})