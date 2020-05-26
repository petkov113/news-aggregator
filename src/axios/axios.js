import axios from 'axios'

const axiosInstance = axios.create({
  method: "get",
  baseURL:
    "https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/",
});

export default axiosInstance