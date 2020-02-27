import axios from 'axios';

const API = axios.create({
    baseURL: 'http://192.168.43.136:8000/'
})

export default API;