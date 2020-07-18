import { combineReducers, createStore, applyMiddleware } from "redux";
import articlesReducer from './articlesReducer'
import profileReducer from './profileReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  profile: profileReducer,
  articles: articlesReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))