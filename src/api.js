import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development'
const myBaseURL = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

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
