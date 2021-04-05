import { SET_RATES, WS_CONNECTED, WS_DISCONNECTED } from '../types/constants'
import { WebsocketActions } from '../actions/websocketActions'
import { Status } from '../types/WebsocketTypes'

export const initialState: CurrencyReducerState = {
  status: Status.DISCONNECTED,
  bitcoin: null,
  ethereum: null,
  monero: null,
}

const reducer = (state = initialState, action: WebsocketActions): CurrencyReducerState => {
  switch (action.type) {
    case SET_RATES:
      return {
        ...state,
        bitcoin:
          Number(action.rates.find((el) => el.currency === 'bitcoin')?.rate) || state.bitcoin,
        ethereum:
          Number(action.rates.find((el) => el.currency === 'ethereum')?.rate) || state.ethereum,
        monero: Number(action.rates.find((el) => el.currency === 'monero')?.rate) || state.monero,
      }
    case WS_CONNECTED:
      return { ...state, status: Status.CONNECTED }
    case WS_DISCONNECTED:
      return { ...state, status: Status.DISCONNECTED }
    default:
      return state
  }
}

export default reducer

type CurrencyReducerState = {
  status: Status
  bitcoin: number | null
  ethereum: number | null
  monero: number | null
}
