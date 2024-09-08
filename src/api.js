
import axios from 'axios';

// Backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Create an Axios instance with the Authorization header
const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
});

export default axiosInstance;