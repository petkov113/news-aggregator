import { combineReducers } from "redux";
import feedReducer from "./feedReducer";
import savedReducer from "./savedReducer";
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  feed: feedReducer,
  saved: savedReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
