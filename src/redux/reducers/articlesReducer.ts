import { FeedState } from '../types/ReducersTypes'
import { ActionTypes } from '../types/ActionsTypes'
import {
  SET_ARTICLES,
  SET_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_SAVED,
  AUTH_LOGOUT,
  SET_COMMENTS,
} from '../types/constants'

export const initialState: FeedState = {
  loading: false,
  articles: null,
  saved: null,
  error: null,
  comments: null,
}

const reducer = (state = initialState, action: ActionTypes): FeedState => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: [...action.payload],
        error: null,
      }
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
      }
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      }
    case SET_ERROR: {
      return {
        ...state,
        articles: null,
        error: action.payload,
      }
    }
    case SET_COMMENTS: {
      return {
        ...state,
        comments: action.payload,
      }
    }
    case SET_SAVED:
      return { ...state, saved: action.payload }
    case AUTH_LOGOUT:
      return { ...state, saved: null }
    default:
      return state
  }
}

export default reducer
