import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development'
const myBaseURL = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

console.log("MODE:", import.meta.env.MODE);
console.log("LOCAL:", import.meta.env.VITE_API_BASE_URL_LOCAL);
console.log("DEPLOY:", import.meta.env.VITE_API_BASE_URL_DEPLOY);
console.log("Using baseURL:", myBaseURL);

const api = axios.create({
  baseURL: myBaseURL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
