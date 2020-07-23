import { Language, Region } from './../reducers/ReducersTypes';
import { CommentType } from './../../Components/Comments/Comments'
import { ThunkAction } from 'redux-thunk'
import { Article } from '../reducers/ReducersTypes'
import {
  SET_ARTICLES,
  SET_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  SUBSCRIBE,
  UNSUBSCRIBE,
  SET_REGION,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_SAVED,
  SET_COMMENTS,
  SET_NAME,
  SET_LANGUAGE,
} from '../constants'
import { RootState } from '../reducers/rootReducer'

export type ThunkAsync = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>
export type Thunk = ThunkAction<void, RootState, unknown, ActionTypes>
export type UserData = {
  name: null | string
  region: null | Region
  language: Language
}

export type AuthResponse = {
  data: {
    email: string
    expiresIn: string
    idToken: string
    kind: string
    localId: string
    refreshToken: string
  }
  status: number
  statusText: string
}

interface SetArticles {
  type: typeof SET_ARTICLES
  payload: Article[]
}

interface SetError {
  type: typeof SET_ERROR
  payload: string
}

interface SetSaved {
  type: typeof SET_SAVED
  payload: Article[]
}

interface ShowLoader {
  type: typeof SHOW_LOADER
}

interface HideLoader {
  type: typeof HIDE_LOADER
}

interface Subscribe {
  type: typeof SUBSCRIBE
  name: string
}

interface Unsubscribe {
  type: typeof UNSUBSCRIBE
  name: string
}

interface SetComments {
  type: typeof SET_COMMENTS
  payload: CommentType[] | null
}

interface SetRegion {
  type: typeof SET_REGION
  region: Region
}

interface SetName {
  type: typeof SET_NAME
  name: string
}

interface SetLanguage {
  type: typeof SET_LANGUAGE
  language: Language
}

interface AuthSucces {
  type: typeof AUTH_SUCCESS
  userId: string
  token: string
}

interface Logout {
  type: typeof AUTH_LOGOUT
}

export type ActionTypes =
  | SetArticles
  | SetError
  | ShowLoader
  | HideLoader
  | Subscribe
  | Unsubscribe
  | SetLanguage
  | SetRegion
  | SetSaved
  | SetName
  | SetComments
  | AuthSucces
  | Logout
