import { CommentType } from './../../Components/Comments/Comments'
import { Article, APIResponseType, Category } from '../reducers/ReducersTypes'
import { SET_ARTICLES, SET_ERROR, SET_SAVED, SET_COMMENTS } from '../constants'
import { ActionTypes, ThunkAsync } from './ActionsTypes'
import { showLoader, hideLoader } from './commonActions'
import { authAxios, atriclesAxios } from '../../axios/axios'
import moment from 'moment'

export const requestArticles = (category: Category = 'all', keyword?: string): ThunkAsync => async (
  dispatch,
  getState
) => {
  const language = getState().profile.language.value
  const country = getState().profile.region.value
  let url: string
  category !== 'all'
    ? (url = `latest-news?country=${country}&language=${language}&category=${category}&apiKey=${process.env.REACT_APP_API_KEY}`)
    : keyword
    ? (url = `search?country=${country}&language=${language}&start_date=${moment()
        .subtract(1, 'days')
        .format()}&apiKey=${process.env.REACT_APP_API_KEY}`)
    : (url = `latest-news?country=${country}&language=${language}&apiKey=${process.env.REACT_APP_API_KEY}`)

  dispatch(showLoader())
  try {
    const response = await atriclesAxios.get<APIResponseType>(url)
    if (response.data.news.length === 0)
      dispatch(setError('Nothing has been found. Please change the region or the language.'))
    else if (keyword) {
      const regKeyword = new RegExp(`${keyword}`, 'g')
      const articles = response.data.news.filter(
        (article) => regKeyword.test(article.description) || regKeyword.test(article.title)
      )
      articles.length > 0
        ? dispatch(setArticles(articles))
        : dispatch(setError('Nothing has been found.'))
    } else {
      let articles = response.data.news.map((article) => ({
        ...article,
        description: validateDescription(article.description),
        author: validateAuthor(article.author),
        image: article.image === 'None' ? './placeholder.jpg' : validateImgSrc(article.image),
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
    console.log(e)
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
    await authAxios.patch(`/users/${userId}.json`, { articles })
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
    const response = await authAxios.get<{ articles: Article[] }>(`/users/${userId}.json`)
    response.data.articles && dispatch(setSaved(response.data.articles))
  } catch (error) {
    console.log(error)
  }
}

export const getComments = (id: string): ThunkAsync => async (dispatch) => {
  dispatch(showLoader())
  try {
    const response = await authAxios.get<{ [id: string]: CommentType }>(`/comments/${id}.json`)
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
    await authAxios.post(`/comments/${articleId}.json`, { ...comment })
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

const validateImgSrc = (url: null | string): string => {
  const imagesBlacklist = new RegExp(
    /(.*kubrick.*)|(.*wthr.*)|(.*nydailynews.*)|(.*statesman.*)|(.*arabnews.*)|(.*washingtonpost.*)/
  )
  return url && !imagesBlacklist.test(url) ? url : './placeholder.jpg'
}

const validateAuthor = (author: null | string): string => {
  const authorBlacklist = new RegExp(/.*arxiv.*/)
  return author && !authorBlacklist.test(author) ? author.toUpperCase() : ''
}

const validateDescription = (description: null | string): string => (description ? description : '')
