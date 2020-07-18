import { CommentType } from './../../Components/Comments/Comments'
export type Category =
  | 'all'
  | 'business'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology'

export type Country =
  | { label: 'USA'; value: 'US' }
  | { label: 'Russia'; value: 'RU' }
  | { label: 'Bulgaria'; value: 'BG' }
  
export type Language =
  | { label: 'English'; value: 'EN' }
  | { label: 'Русский'; value: 'RU' }
  | { label: 'Български'; value: 'BG' }

export type APIResponseType = {
  articles: Article[]
  totalResults: number
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
  source: { id: null | string; name: string }
  title: string
  url: string
  urlToImage: string
  description: string
  publishedAt: string
  id: string
  isSaved: boolean
  content: string
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
  country: Country
  loading: boolean
  language: Language
}>
