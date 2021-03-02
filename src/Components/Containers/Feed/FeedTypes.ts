import { Article, Category } from '../../../redux/types/ReducersTypes'

export type MapStateTypes = {
  loading: boolean
  articles: null | Article[]
  error: null | string
  isAuthenticated: boolean
  savedArticles: null | Article[]
}

export type MapDispatchTypes = {
  requestArticles: (category?: Category, keyword?: string) => void
  toggleArticle: (article: Article) => void
}

export type PropsTypes = MapStateTypes & MapDispatchTypes
