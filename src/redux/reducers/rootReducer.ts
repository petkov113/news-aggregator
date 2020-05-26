import { combineReducers } from "redux";
import feedReducer from "./feedReducer";

const rootReducer = combineReducers({
  feed: feedReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
