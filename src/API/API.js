import axios from "axios";

// const apiURLs = {
//     development: "http://localhost:3000",
//     production: "LINK DA API DEPLOYADA AQUI SEM BARRA NO FINAL",
//   };
  
  const api = axios.create({ baseURL: "177.32.234.5:8081" });
  
  api.interceptors.request.use((config) => {
    const loggedInUserJSON = localStorage.getItem("userInfo");
    
  
    const parsedLoggedInUser = JSON.parse(loggedInUserJSON || '""');
    
    
      config.headers = { Authorization: `Bearer ${parsedLoggedInUser.data.token}`};
    
  
    return config;
  });
  
  export { api };