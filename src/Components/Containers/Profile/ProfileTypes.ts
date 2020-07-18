import { Country, Language } from './../../../redux/reducers/ReducersTypes'
import { ActionTypes } from './../../../redux/actions/ActionsTypes'
import { AuthFunction } from '../../Form/AuthTypes'

export type MapStateTypes = {
  isAuthentiphicated: boolean
  loading: boolean
  user: { name: null | string; country: Country; language: Language }
}

export type MapDispatchTypes = {
  auth: AuthFunction
  sendCountry: (country: Country) => void
  logout: () => ActionTypes
  sendName: () => void
  setName: (name: string) => void
  getUserData: () => void
  sendLanguage: (language: Language) => void
}

export type Props = MapStateTypes & MapDispatchTypes
