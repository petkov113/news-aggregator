import { Article, APIResponseType, Category } from '../reducers/ReducersTypes'
import { SET_ARTICLES, SET_ERROR } from '../constants'
import { ActionTypes, ThunkAsync } from './ActionsTypes'
import { showLoader, hideLoader } from './commonActions'
import axios from '../../axios/axios'

export const requestArticles = (category: Category = 'all', keyword?: string): ThunkAsync => async (
  dispatch,
  getState
) => {
  const state = getState()
  let url: string
  const country = state.profile.country.code

  category !== 'all'
    ? (url = `top-headlines?country=${country}&category=${category}&pageSize=100&apiKey=${process.env.REACT_APP_API_KEY}`)
    : keyword
    ? (url = `everything?q=${keyword}&pageSize=30&sortBy=relevancy&apiKey=${process.env.REACT_APP_API_KEY}`)
    : (url = `top-headlines?country=${country}&pageSize=100&apiKey=${process.env.REACT_APP_API_KEY}`)

  dispatch(showLoader())
  try {
    const response = await axios.get<APIResponseType>(url)

    response.data.totalResults === 0
      ? dispatch(setError('Nothing has been found'))
      : dispatch(
          setArticles(
            response.data.articles.map((article) => ({
              ...article,
              id: article.publishedAt.concat(article.source.name),
            }))
          )
        )
  } catch (e) {
    dispatch(setError('Server error. Please, try again later.'))
  }
  dispatch(hideLoader())
}

const setArticles = (articles: Article[]): ActionTypes => {
  return {
    type: SET_ARTICLES,
    payload: articles,
  }
}

const setError = (error: string): ActionTypes => {
  return {
    type: SET_ERROR,
    payload: error,
  }
}
