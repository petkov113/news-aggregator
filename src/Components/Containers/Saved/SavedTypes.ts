import { CommentType } from './../../Comments/Comments';
import { Article } from '../../../redux/reducers/ReducersTypes'

export type MapStateTypes = {
  loading: boolean
  articles: null | Article[]
  error: null | string
  comments: null | CommentType[]
}

export type MapDispatchTypes = {
  requestSaved: () => void
  toggleArticle: (article: Article, refreshFeed?: boolean) => void
  saveComment: (message: string, id: string) => void
  getComments: (id: string) => void
}

export type PropsTypes = MapStateTypes & MapDispatchTypes
