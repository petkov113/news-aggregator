import { validateAuthor, validateDescription, validateImgSrc } from '../../utilities/js/validation'
import { SET_ARTICLES, SET_ERROR, SET_SAVED, SET_COMMENTS } from '../types/constants'
import { Errors, getDate, getNewsUrl, getSearchUrl, testArticle } from '../../utilities/js/utils'
import { Article, APIResponseType, Category } from '../types/ReducersTypes'
import requestStore, { createRequestObject } from '../../axios/requestStore'
import { CommentApiResponse, CommentType } from './../../Components/Comments/Comments'
import { atriclesAxios, userAxios } from '../../axios/axios'
import { ActionTypes, ThunkAsync } from '../types/ActionsTypes'
import { showLoader, hideLoader } from './commonActions'
import axios from 'axios'

export const requestArticles = (
  category: Category = Category.ALL,
  keyword?: string
): ThunkAsync => async (dispatch, getState) => {
  const { language, region, userId } = getState().profile
  const source = axios.CancelToken.source()

  const request = createRequestObject(source)
  requestStore.addRequest(request)

  let url: string
  if (category !== Category.ALL) {
    url = getNewsUrl(region, language, category)
  } else if (keyword) {
    url = getSearchUrl(region, language)
  } else {
    url = getNewsUrl(region, language)
  }

  dispatch(showLoader())
  try {
    const response = await atriclesAxios.get<APIResponseType>(url, { cancelToken: source.token })
    const { news } = response.data

    if (news.length < 1) {
      dispatch(setError(Errors.NOT_FOUND))
    } else if (keyword) {
      const articles = news.filter((article) => testArticle(article, keyword))
      articles.length > 0 ? dispatch(setArticles(articles)) : dispatch(setError(Errors.NOT_FOUND))
    } else {
      let articles = news.map((article) => ({
        ...article,
        description: validateDescription(article.description),
        author: validateAuthor(article.author),
        image: validateImgSrc(article.image),
        isSaved: false,
      }))
      if (userId) {
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
    dispatch(setError(Errors.SERVER))
  } finally {
    requestStore.removeRequest(request)
    dispatch(hideLoader())
  }
}

export const toggleArticle = (article: Article, refreshFeed = true): ThunkAsync => async (
  dispatch,
  getState
) => {
  const { userId, token } = getState().profile
  const { articles: feedAritcles, saved: savedArticles } = getState().articles
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
    await userAxios.patch(`/users/${userId}.json?auth=${token}`, { articles })
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
  const { userId, token } = getState().profile
  try {
    const response = await userAxios.get<Article[]>(`/users/${userId}/articles.json?auth=${token}`)
    response.data && dispatch(setSaved(response.data))
  } catch (error) {
    console.log(error)
  }
}

export const getComments = (id: string): ThunkAsync => async (dispatch) => {
  dispatch(showLoader())
  try {
    const response = await userAxios.get<CommentApiResponse>(`/comments/${id}.json`)
    if (response.data) {
      const comments = Object.entries(response.data).reduce<CommentType[]>((acc, el) => {
        const comment: CommentType = {
          id: el[0],
          message: el[1].message,
          date: el[1].date,
          author: el[1].author,
        }
        return [...acc, comment]
      }, [])
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
    date: getDate(),
  }
  try {
    await userAxios.post(`/comments/${articleId}.json`, { ...comment })
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
