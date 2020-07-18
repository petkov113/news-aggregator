import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://news-app-4c398.firebaseio.com/',
})

export default axiosInstance