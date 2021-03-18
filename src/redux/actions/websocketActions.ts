import { CurrencyRate } from '../../utilities/js/hooks'
import {
  SET_RATES,
  WS_CONNECT,
  WS_CONNECTED,
  WS_DISCONNECT,
  WS_DISCONNECTED,
} from '../types/constants'

export const requestRates = () => ({ type: WS_CONNECT } as const)
export const disconnectRates = () => ({ type: WS_DISCONNECT } as const)
export const wsConnected = () => ({ type: WS_CONNECTED } as const)
export const wsDisconnected = () => ({ type: WS_DISCONNECTED } as const)
export const setRates = (rates: CurrencyRate[]) => {
  return {
    type: SET_RATES,
    rates,
  } as const
}

type WSActions =
  | typeof requestRates
  | typeof wsConnected
  | typeof wsDisconnected
  | typeof setRates
  | typeof disconnectRates

export type WebsocketActions = ReturnType<WSActions>
