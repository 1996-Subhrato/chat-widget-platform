import axios from 'axios';

// Create a reusable Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Essential for sending cookies (session/token) to Express
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor scaffold for unified error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Scaffold hook to catch status errors (e.g., redirect on 401 Unauthorized in future phases)
    const errMessage = error.response?.data?.error || error.message;
    console.error('[API Client Error]:', errMessage);
    return Promise.reject(error);
  }
);

export default api;
