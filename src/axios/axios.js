import axios from 'axios'

const axiosInstance = axios.create({
  method: "get",
  baseURL:
    "http://newsapi.org/v2/",
});

export default axiosInstance