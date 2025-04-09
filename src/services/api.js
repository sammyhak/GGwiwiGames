import axios from "axios";
import { getBackendErrorMessage } from "../utils/error";

// export const baseURL = "http://localhost:5000";
export const baseURL = "https://client-bet-geqy.onrender.com";

const api = axios.create({
  baseURL: baseURL + "/api",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    } else if (error.request) {
      console.error("API No Response:", error.request);
    } else {
      console.error("API Request Error:", error.message);
    }
    return Promise.reject(getBackendErrorMessage(error));
  }
);

export default api;
