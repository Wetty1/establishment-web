import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'
})

export default api;