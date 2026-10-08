import axios from "axios";

const API_URL =
  "http://192.168.1.5:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("vyora_token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {
      localStorage.removeItem("vyora_token");
      localStorage.removeItem("vyora_user");
    }

    return Promise.reject(error);
  }
);

export default api;