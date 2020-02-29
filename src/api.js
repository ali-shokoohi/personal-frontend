import axios from 'axios';

const API = axios.create({
    baseURL: 'https://api.shokoohi.dev/'
})

export default API;
