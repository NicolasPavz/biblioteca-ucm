import axios from "axios";

const API = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API,
});

// Interceptor para agregar el token en cada request cuando sea neceario
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;