import { SET_RATES, WS_CONNECTED, WS_DISCONNECTED } from '../types/constants'
import { WebsocketActions } from '../actions/websocketActions'
import { CyrrencyState, Status } from '../types/WebsocketTypes'

export const initialState: CyrrencyState = {
  status: Status.DISCONNECTED,
  rates: null,
}

const reducer = (state = initialState, action: WebsocketActions): CyrrencyState => {
  switch (action.type) {
    case SET_RATES:
      return { ...state, rates: { ...action.rates } }
    case WS_CONNECTED:
      return { ...state, status: Status.CONNECTED }
    case WS_DISCONNECTED:
      return { ...state, status: Status.DISCONNECTED }
    default:
      return state
  }
}

export default reducer
