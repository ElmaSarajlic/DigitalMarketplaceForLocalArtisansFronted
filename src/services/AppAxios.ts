import axios from 'axios';
import { BASE_URL } from '../constants';


const appAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});


appAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');

  if (token) {
      config.headers['Authorization']=`Bearer ${ token }`;
      console.log(config.headers.Authorization);
  }

  return config;
  
}, (error) => {
  return Promise.reject(error);
});


export default appAxios;