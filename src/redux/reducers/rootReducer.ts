import { combineReducers } from "redux";
import feedReducer from "./feedReducer";
import savedReducer from "./savedReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  app: appReducer,
  feed: feedReducer,
  saved: savedReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
