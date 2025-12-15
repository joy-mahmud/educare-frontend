import axios from "axios";
import { studentLogout } from "../utils/helpers/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
});

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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      studentLogout(); // auto redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
