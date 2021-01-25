import { ActionTypes } from '../actions/ActionsTypes'
import { ProfileState } from './ReducersTypes'
import {
  SET_REGION,
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
  region: { label: 'Europe', value: 'EU' },
  language: { label: 'English', value: 'en' },
  loading: false,
}

const reducer = (state = initialState, action: ActionTypes): ProfileState => {
  switch (action.type) {
    case SET_REGION:
      return { ...state, region: action.region }
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

export default reducer
