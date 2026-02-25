// import axios from "axios";

// const dashboardAxios = axios.create({
//   baseURL: import.meta.env.VITE_USER_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default dashboardAxios;

import axios from "axios";

const dashboardAxios = axios.create({
  baseURL: import.meta.env.VITE_USER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Add interceptor
dashboardAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Required location headers
    config.headers["X-Latitude"] = "22.5726";
    config.headers["X-Longitude"] = "88.3639";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default dashboardAxios;