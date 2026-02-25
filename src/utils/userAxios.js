// // src/utils/userAxios.js

// import axios from "axios";

// const userAxios = axios.create({
//   baseURL: import.meta.env.VITE_USER_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Attach token automatically
// userAxios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default userAxios;


import axios from "axios";

const userAxios = axios.create({
  baseURL: import.meta.env.VITE_USER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

userAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Kolkata Coordinates
    config.headers["X-Latitude"] = "22.5726";
    config.headers["X-Longitude"] = "88.3639";

    return config;
  },
  (error) => Promise.reject(error)
);

export default userAxios;