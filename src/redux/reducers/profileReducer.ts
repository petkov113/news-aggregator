import { ActionTypes } from '../actions/ActionsTypes'
import { ProfileState } from './ReducersTypes'
import {
  SET_COUNTRY,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_NAME,
  SET_LANGUAGE,
} from '../constants'

export const initialState: ProfileState = {
  isAuth: false,
  userId: null,
  name: null,
  token: null,
  country: { label: 'USA', value: 'US' },
  language: { label: 'English', value: 'EN' },
  loading: false,
}

export default (state = initialState, action: ActionTypes): ProfileState => {
  switch (action.type) {
    case SET_COUNTRY:
      return { ...state, country: action.country }
    case SET_LANGUAGE:
      return { ...state, language: action.language }
    case SET_NAME:
      return { ...state, name: action.name }
    case AUTH_SUCCESS:
      return { ...state, isAuth: true, userId: action.userId, token: action.token }
    case AUTH_LOGOUT:
      return { ...state, ...initialState }
    case SHOW_LOADER:
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    default:
      return state
  }
}
