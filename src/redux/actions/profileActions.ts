import { AUTH_SUCCESS, AUTH_LOGOUT, SET_NAME, SET_LANGUAGE, SET_REGION } from '../types/constants'
import { ActionTypes, AuthResponse, ThunkAsync, Thunk, UserData } from '../types/ActionsTypes'
import {
  Errors,
  createExpirationDate,
  saveAuthDataToLocalStorage,
  getAuthDataFromLocalStorage,
  removeAuthDataFromLocalStorage,
} from '../../utilities/js/utils'
import { showLoader, hideLoader } from './commonActions'
import { authAxios, userAxios } from '../../axios/axios'
import { Language, Region } from '../types/ReducersTypes'
import { AuthFunction } from '../../Components/Form/AuthTypes'
import Keys from '../../utilities/js/keys'

export const auth: AuthFunction = (values, setStatus, isLogin): ThunkAsync => async (dispatch) => {
  dispatch(showLoader())

  const authData = {
    email: values.email,
    password: values.password,
    returnSecureToken: true,
  }

  let url: string
  if (isLogin) {
    url = `:signInWithPassword?key=${Keys.AUTH}`
  } else {
    url = `:signUp?key=${Keys.AUTH}`
  }

  try {
    const response: AuthResponse = await authAxios.post(url, authData)
    const { expiresIn, idToken, localId } = response.data
    const expirationDate = createExpirationDate(expiresIn)

    saveAuthDataToLocalStorage(idToken, localId, expirationDate)

    dispatch(authSuccess(localId, idToken))
  } catch (e) {
    let warning: string
    switch (e.response.data.error.message) {
      case 'EMAIL_EXISTS':
        warning = Errors.EMAIL_EXISTS
        break
      case 'EMAIL_NOT_FOUND':
        warning = Errors.EMAIL_NOT_FOUND
        break
      default:
        warning = Errors.EMAIL_INCORRECT
    }
    setStatus({ generall: warning })
  }
  dispatch(hideLoader())
}

const authSuccess = (userId: string, token: string): ActionTypes => {
  return {
    type: AUTH_SUCCESS,
    userId,
    token,
  }
}

export const logout = (): ActionTypes => {
  removeAuthDataFromLocalStorage()
  return {
    type: AUTH_LOGOUT,
  }
}

export const autoLogin = (): Thunk => (dispatch) => {
  const { token, userId, expirationDate } = getAuthDataFromLocalStorage()

  if (!token || !userId || !expirationDate) {
    dispatch(logout())
  } else {
    const formattedDate = new Date(expirationDate)
    if (formattedDate <= new Date()) dispatch(logout())
    else {
      dispatch(authSuccess(userId, token))
      dispatch(getUserData())
      dispatch(autoLogout((formattedDate.getTime() - new Date().getTime()) / 1000))
    }
  }
}

const autoLogout = (time: number): Thunk => (dispatch) => {
  setTimeout(() => {
    dispatch(logout())
  }, time * 1000)
}

export const setRegion = (region: Region): ActionTypes => {
  return {
    type: SET_REGION,
    region,
  }
}

export const sendRegion = (region: Region): ThunkAsync => async (dispatch, getState) => {
  dispatch(setRegion(region))
  const { userId, token } = getState().profile
  try {
    await userAxios.patch(`/users/${userId}.json?auth=${token}`, {
      region,
    })
  } catch (e) {
    console.log(e)
  }
}

export const sendName = (): ThunkAsync => async (_, getState) => {
  const { userId, name, token } = getState().profile
  try {
    await userAxios.patch(`/users/${userId}.json?auth=${token}`, { name })
  } catch (e) {
    console.log(e)
  }
}

export const sendLanguage = (language: Language): ThunkAsync => async (dispatch, getState) => {
  dispatch(setLanguage(language))
  const { userId, token } = getState().profile
  try {
    await userAxios.patch(`/users/${userId}.json?auth=${token}`, { language })
  } catch (e) {
    console.log(e)
  }
}

export const setName = (name: string): ActionTypes => {
  return {
    type: SET_NAME,
    name,
  }
}

export const setLanguage = (language: Language): ActionTypes => {
  return {
    type: SET_LANGUAGE,
    language,
  }
}

export const getUserData = (): ThunkAsync => async (dispatch, getState) => {
  dispatch(showLoader())
  const id = getState().profile.userId
  if (!id) {
    dispatch(hideLoader())
    return
  }
  const token = getState().profile.token
  try {
    const response = await userAxios.get<UserData>(`/users/${id}.json?auth=${token}`)

    if (response.data) {
      const { name, region, language } = response.data
      name && dispatch(setName(name))
      region && dispatch(setRegion(region))
      language && dispatch(setLanguage(language))
    }
  } catch (e) {
    console.log(e)
  }
  dispatch(hideLoader())
}
