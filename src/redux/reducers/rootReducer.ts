import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import webSocketMiddleware from '../middleware/webSocketMiddleware'
import articlesReducer from './articlesReducer'
import profileReducer from './profileReducer'
import currencyReducer from './currencyReducer'
import thunk from 'redux-thunk'

const middleware = [thunk, webSocketMiddleware]

export const rootReducer = combineReducers({
  profile: profileReducer,
  articles: articlesReducer,
  currencies: currencyReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))
