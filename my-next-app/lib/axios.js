import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/', // Your real backend base URL
});

// ✅ Automatically attach token if present
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;