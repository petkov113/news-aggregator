import { Language, Region } from './../reducers/ReducersTypes'
import { AUTH_SUCCESS, AUTH_LOGOUT, SET_NAME, SET_LANGUAGE, SET_REGION } from '../constants'
import { ActionTypes, AuthResponse, ThunkAsync, Thunk, UserData } from './ActionsTypes'
import { showLoader, hideLoader } from './commonActions'
import { FormikValues } from 'formik'
import { AuthFunction } from '../../Components/Form/AuthTypes'
import { authAxios, userAxios } from '../../axios/axios'

export const auth: AuthFunction = (
  values: FormikValues,
  setStatus: (status: any) => void,
  isLogin: boolean
): ThunkAsync => async (dispatch) => {
  dispatch(showLoader())
  const authData = {
    email: values.email,
    password: values.password,
    returnSecureToken: true,
  }
  let url

  isLogin
    ? (url = `:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`)
    : (url = `:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`);

  try {
    const response: AuthResponse = await authAxios.post(url, authData)
    const { expiresIn, idToken, localId } = response.data

    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)

    localStorage.setItem('token', idToken)
    localStorage.setItem('userId', localId)
    localStorage.setItem('expirationDate', expirationDate.toString())

    dispatch(authSuccess(localId, idToken))
  } catch (e) {
    let warning
    switch (e.response.data.error.message) {
      case 'EMAIL_EXISTS':
        warning = 'This email is already registered'
        break
      case 'EMAIL_NOT_FOUND':
        warning = "This email haven't been registered yet"
        break
      default:
        warning = 'Email or password is incorrect'
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
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT,
  }
}

export const autoLogin = (): Thunk => (dispatch) => {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const expirationDate = localStorage.getItem('expirationDate')

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
  const id = getState().profile.userId
  const token = getState().profile.token
  try {
    await userAxios.patch(`/users/${id}.json?auth=${token}`, {
      region,
    })
  } catch (e) {
    console.log(e)
  }
}

export const sendName = (): ThunkAsync => async (dispatch, getState) => {
  const userId = getState().profile.userId
  const name = getState().profile.name
  const token = getState().profile.token
  try {
    await userAxios.patch(`/users/${userId}.json?auth=${token}`, { name })
  } catch (e) {
    console.log(e)
  }
}

export const sendLanguage = (language: Language): ThunkAsync => async (dispatch, getState) => {
  dispatch(setLanguage(language))
  const userId = getState().profile.userId
  const token = getState().profile.token
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
      response.data.name && dispatch(setName(response.data.name))
      response.data.region && dispatch(setRegion(response.data.region))
      response.data.language && dispatch(setLanguage(response.data.language))
    }
  } catch (e) {
    console.log(e)
  }
  dispatch(hideLoader())
}
