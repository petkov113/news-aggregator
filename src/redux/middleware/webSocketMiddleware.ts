import {
  setRates,
  WebsocketActions,
  wsConnected,
  wsDisconnected,
} from '../actions/websocketActions'
import { Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { WS_CONNECT, WS_DISCONNECT } from '../types/constants'
import { RootState } from '../reducers/rootReducer'
import { CurrencyRate } from '../../utilities/js/hooks'

const socketMiddleware: Middleware = (store) => (next) => (action: WebsocketActions) => {
  let socket: WebSocket | null = null
  switch (action.type) {
    case WS_CONNECT:
      socket && socket!.close()
      socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero')
      socket.onmessage = onMessage(store)
      socket.onclose = onClose(store)
      socket.onopen = onOpen(store)
      break
    case WS_DISCONNECT:
      socket && socket!.close()
      socket = null
      break
    default:
      return next(action)
  }
}

export default socketMiddleware

const onOpen = (store: MiddlewareAPI<Dispatch<WebsocketActions>, RootState>) => () => {
  store.dispatch(wsConnected())
}

const onClose = (store: MiddlewareAPI<Dispatch<WebsocketActions>, RootState>) => () => {
  store.dispatch(wsDisconnected())
}

const onMessage = (store: MiddlewareAPI<Dispatch<WebsocketActions>, RootState>) => (
  event: MessageEvent
) => {
  if (event && event.data) {
    const payload: { [k: string]: string } = JSON.parse(event.data)
    const rates = Object.entries(payload).map<CurrencyRate>((el) => ({
      currency: el[0],
      rate: el[1],
    }))
    store.dispatch(setRates(rates))
  }
}
