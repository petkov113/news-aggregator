import { CommentType } from './../../Components/Comments/Comments'
export type Category =
  | 'all'
  | 'business'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology'

export type Region =
  | { label: 'USA'; value: 'US' }
  | { label: 'Russia'; value: 'RU' }
  | { label: 'Europe'; value: 'EU' }
  
export type Language =
  | { label: 'English'; value: 'en' }
  | { label: 'Русский'; value: 'ru' }
  | { label: 'German'; value: 'de' }

export type APIResponseType = {
  news: Article[]
}

export type receivedArticle = {
  source: { id: null | string; name: string }
  title: string
  url: string
  urlToImage: string
  description: string
  publishedAt: string
}

export type Article = {
  author: string
  title: string
  url: string
  image: string
  description: string
  published: string
  id: string
  isSaved: boolean
}

export type FeedState = Readonly<{
  loading: boolean
  articles: null | Article[]
  error: null | string
  saved: null | Article[]
  comments: null | CommentType[]
}>

export type SavedState = Readonly<{
  loading: boolean
  savedArticles: Article[]
  error: null | string
}>

export type ProfileState = Readonly<{
  isAuth: boolean
  userId: null | string
  name: null | string
  token: null | string
  region: Region
  loading: boolean
  language: Language
}>
