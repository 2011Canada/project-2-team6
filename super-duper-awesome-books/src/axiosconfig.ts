import axios from 'axios';

const instance: any = axios.create({
    baseURL: 'http://localhost:8080/',
})

export default instance;