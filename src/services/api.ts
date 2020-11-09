import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://establishment-api.herokuapp.com' : 'http://localhost:8080',
})

export default api;