import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

export const aiApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error('[API Error]', err.response?.status, err.config?.url);
    return Promise.reject(err);
  }
);

export default api;
