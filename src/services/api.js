import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8000/api/" : "http://sgpo.eastus.cloudapp.azure.com:8000/api/",
});


export default api;