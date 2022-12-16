import axios from "axios";

// const apiURLs = {
//     development: "http://localhost:3000",
//     production: "LINK DA API DEPLOYADA AQUI SEM BARRA NO FINAL",
//   };
const api = axios.create({ baseURL: "https://quiet-star-3608.fly.dev" });
// const api = axios.create({ baseURL: "http://localhost:8080" });

api.interceptors.request.use((config) => {
  const loggedInUserJSON = localStorage.getItem("userInfo");

  const parsedLoggedInUser = JSON.parse(loggedInUserJSON || '""');

  config.headers = { Authorization: `Bearer ${parsedLoggedInUser.data.token}` };

  return config;
});

export { api };
