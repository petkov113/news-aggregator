import { CommentType } from './../../Components/Comments/Comments'
import { Article, APIResponseType, Category } from '../reducers/ReducersTypes'
import { SET_ARTICLES, SET_ERROR, SET_SAVED, SET_COMMENTS } from '../constants'
import { ActionTypes, ThunkAsync } from './ActionsTypes'
import { showLoader, hideLoader } from './commonActions'
import moment from 'moment'
import axios from '../../axios/axios'

export const requestArticles = (category: Category = 'all', keyword?: string): ThunkAsync => async (
  dispatch,
  getState
) => {
  let url: string
  category !== 'all'
    ? (url = `${category}.json`)
    : keyword // for NEWSAPI
    ? (url = 'search.json')
    : (url = 'all.json')

  dispatch(showLoader())
  try {
    const response = await axios.get<APIResponseType>(`/articles/${url}`)
    if (response.data.totalResults === 0) dispatch(setError('Nothing has been found'))
    else {
      let articles = response.data.articles.map((article) => ({
        ...article,
        content: article.content ?? 'Read on the source',
        title: article.title.replace(/-\s.*/, ''),
        id: article.publishedAt.concat(article.source.name).replace(/\s/g, ''),
        isSaved: false,
      }))

      if (getState().profile.userId) {
        await dispatch(requestSaved())
        const savedArticles = getState().articles.saved
        if (savedArticles) {
          articles = articles.map((article) => ({
            ...article,
            isSaved: savedArticles.find((el) => el.id === article.id) ? true : false,
          }))
        }
      }
      dispatch(setArticles(articles))
    }
  } catch (e) {
    dispatch(setError('Server error. Please, try again later.'))
  }
  dispatch(hideLoader())
}

export const toggleArticle = (article: Article, refreshFeed = true): ThunkAsync => async (
  dispatch,
  getState
) => {
  const userId = getState().profile.userId
  const feedAritcles = getState().articles.articles
  const savedArticles = getState().articles.saved
  let articles = [article]

  if (savedArticles) {
    const isSaved = savedArticles.find((item) => item.id === article.id)
    if (isSaved) {
      articles = savedArticles.filter((el) => el.id !== article.id)
    } else {
      articles = [article, ...savedArticles]
    }
  }

  dispatch(setSaved(articles))

  if (refreshFeed) {
    feedAritcles &&
      dispatch(
        setArticles(
          feedAritcles.map((el) => {
            return el.id === article.id ? { ...el, isSaved: !el.isSaved } : el
          })
        )
      )
  }

  try {
    await axios.patch(`/users/${userId}.json`, { articles })
  } catch (e) {
    console.log(e)
  }
}

const setSaved = (articles: Article[]): ActionTypes => {
  return {
    type: SET_SAVED,
    payload: articles,
  }
}

export const requestSaved = (): ThunkAsync => async (dispatch, getState) => {
  const userId = getState().profile.userId
  try {
    const response = await axios.get<Pick<APIResponseType, 'articles'>>(`/users/${userId}.json`)
    response.data.articles && dispatch(setSaved(response.data.articles))
  } catch (error) {
    console.log(error)
  }
}

export const getComments = (id: string): ThunkAsync => async (dispatch) => {
  dispatch(showLoader())
  try {
    const response = await axios.get<{ [id: string]: CommentType }>(`/comments/${id}.json`)
    if (response.data) {
      const comments = Object.entries(response.data).reduce((acc, el) => {
        const comment: CommentType = {
          id: el[0],
          message: el[1].message,
          date: el[1].date,
          author: el[1].author,
        }
        return [...acc, comment]
      }, [] as CommentType[])
      dispatch(setComments(comments))
    } else {
      dispatch(setComments(null))
    }
  } catch (e) {
    console.log(e)
  }
  dispatch(hideLoader())
}

export const saveComment = (message: string, articleId: string): ThunkAsync => async (
  dispatch,
  getState
) => {
  dispatch(showLoader())
  const comment: Omit<CommentType, 'id'> = {
    author: getState().profile.name ?? 'Anonymous',
    message,
    date: moment().format('MMM Do YY'),
  }
  try {
    await axios.post(`/comments/${articleId}.json`, { ...comment })
    dispatch(getComments(articleId))
  } catch (e) {
    console.log(e)
  }
  dispatch(hideLoader())
}

const setArticles = (articles: Article[]): ActionTypes => {
  return {
    type: SET_ARTICLES,
    payload: articles,
  }
}

const setComments = (comments: CommentType[] | null): ActionTypes => {
  return {
    type: SET_COMMENTS,
    payload: comments,
  }
}

const setError = (error: string): ActionTypes => {
  return {
    type: SET_ERROR,
    payload: error,
  }
}

// https://api.currentsapi.services/v1/latest-news?country=US&apiKey=c9SCRSA_4i0oyXRWXT-SNTX4NYJm-JlB_-YRLO5gt8Wkdan3
// https://api.currentsapi.services/v1/latest-news?country=ru&language=ru&apiKey=c9SCRSA_4i0oyXRWXT-SNTX4NYJm-JlB_-YRLO5gt8Wkdan3
