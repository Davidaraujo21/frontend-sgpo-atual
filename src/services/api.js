import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/"
      : "http://sgpo.eastus.cloudapp.azure.com:1337/api/",
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];
let requestsLimit = 0;

const processQueue = (token = null) => {
  failedQueue.forEach((req) => {
    req.headers["Authorization"] = "Bearer " + token;
  });
  requestsLimit = 0;
  failedQueue = [];
};

api.interceptors.response.use((res) =>
  {
    return res;
  },
  async (err) =>{
    const originalConfig = err.config;
    if(err.response?.status === 401 && !originalConfig._retry){

      if (isRefreshing) {
        failedQueue.push(originalConfig);
        requestsLimit++;
        if (requestsLimit > 50) return Promise.reject(err);
      }

      originalConfig._retry = true;
      isRefreshing = true

      const refreshToken = localStorage.getItem("refreshToken");
      try{
        const {data} = await api.post("refresh/", {refresh: refreshToken})
        const new_token = data.access
        localStorage.setItem("token", new_token)
        api.defaults.headers["Authorization"] = "Bearer " + new_token;
        originalConfig.headers["Authorization"] = "Bearer " + new_token;
        processQueue(new_token);
        return Promise.resolve(api(originalConfig));
      }catch(err){
        return Promise.reject(err);
      }
    }
  }
)

export default api;
