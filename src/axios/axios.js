import axios from 'axios'

export const authAxios = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
})

export const userAxios = axios.create({
  baseURL: 'https://news-app-4c398.firebaseio.com/',
})

export const atriclesAxios = axios.create({
  baseURL: 'https://api.currentsapi.services/v1/',
})
