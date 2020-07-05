import { combineReducers, createStore, applyMiddleware } from "redux";
import feedReducer from "./feedReducer";
import savedReducer from "./savedReducer";
import profileReducer from './profileReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  profile: profileReducer,
  feed: feedReducer,
  saved: savedReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))