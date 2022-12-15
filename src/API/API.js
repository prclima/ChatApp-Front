import axios from "axios";

// const apiURLs = {
//     development: "http://localhost:3000",
//     production: "LINK DA API DEPLOYADA AQUI SEM BARRA NO FINAL",
//   };

const api = axios.create({ baseURL: "2a09:8280:1::6:b5fe" });

api.interceptors.request.use((config) => {
  const loggedInUserJSON = localStorage.getItem("userInfo");

  const parsedLoggedInUser = JSON.parse(loggedInUserJSON || '""');

  config.headers = { Authorization: `Bearer ${parsedLoggedInUser.data.token}` };

  return config;
});

export { api };
