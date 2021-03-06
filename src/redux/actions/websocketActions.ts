import { SET_RATES, WS_CONNECT, WS_CONNECTED, WS_DISCONNECT, WS_DISCONNECTED } from '../types/constants'

export const requestRates = () => ({ type: WS_CONNECT } as const)
export const disconnectRates = () => ({ type: WS_DISCONNECT } as const)
export const wsConnected = () => ({ type: WS_CONNECTED } as const)
export const wsDisconnected = () => ({ type: WS_DISCONNECTED } as const)

export const setRates = (rates: { [k: string]: string }) => {
  return {
    type: SET_RATES,
    rates,
  }
}

type WSActions = typeof requestRates | typeof wsConnected | typeof wsDisconnected | typeof setRates

export type WebsocketActions = ReturnType<WSActions>
