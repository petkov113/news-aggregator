import moment from 'moment'
import { Article, Category, Language, Region } from '../../redux/types/ReducersTypes'
import Keys from './keys'

export const toCapital = (el: string) => {
  return el.replace(/^\w/, (l) => l.toUpperCase())
}

export const createID = () => Math.random().toString(36).substr(2, 9)

export const getYesterday = () => moment().subtract(1, 'days').format()

export const getDate = () => moment().format('MMM Do YY')

export const createExpirationDate = (expirationDate: string) => {
  return new Date(new Date().getTime() + +expirationDate * 1000)
}

export const getNewsUrl = (region: Region, language: Language, category?: Category) => {
  return category
    ? `latest-news?country=${region.value}&language=${language.value}&category=${category}&apiKey=${Keys.API}`
    : `latest-news?country=${region.value}&language=${language.value}&apiKey=${Keys.API}`
}

export const getSearchUrl = (region: Region, language: Language) => {
  return `search?country=${region.value}&language=${
    language.value
  }&start_date=${getYesterday()}&apiKey=${Keys.API}`
}

export enum Errors {
  NOT_FOUND = 'Nothing has been found. Please change the region or the language.',
  SERVER = 'Server error. Please, try again later.',
  EMAIL_EXISTS = 'This email is already registered',
  EMAIL_INCORRECT = 'Email or password is incorrect',
  EMAIL_NOT_FOUND = "This email hasn't been registered yet",
}

export const saveAuthDataToLocalStorage = (
  idToken: string,
  localId: string,
  expirationDate: Date
) => {
  localStorage.setItem('token', idToken)
  localStorage.setItem('userId', localId)
  localStorage.setItem('expirationDate', expirationDate.toString())
}

export const removeAuthDataFromLocalStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
}

export const getAuthDataFromLocalStorage = () => {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const expirationDate = localStorage.getItem('expirationDate')
  return { token, userId, expirationDate }
}

export const testArticle = (article: Article, keyword: string) => {
  const regKeyword = new RegExp(`${keyword}`, 'g')
  return regKeyword.test(article.description) || regKeyword.test(article.title)
}
