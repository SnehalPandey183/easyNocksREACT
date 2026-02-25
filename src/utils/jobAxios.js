// import axios from "axios";

// const jobAxios = axios.create({
//   baseURL: import.meta.env.VITE_BOOKING_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default jobAxios;

import axios from "axios";

const jobAxios = axios.create({
  baseURL: import.meta.env.VITE_BOOKING_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Add interceptor
jobAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add location headers if required by backend
    config.headers["X-Latitude"] = "22.5726";
    config.headers["X-Longitude"] = "88.3639";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default jobAxios;