import { FeedState } from './ReducersTypes';
import { ActionTypes } from "../actions/ActionsTypes";
import {
  SET_ARTICLES,
  SET_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
} from "../constants";

const initialState: FeedState = {
	loading: false,
	articles: null,
	error: null,
};

export default (state = initialState, action: ActionTypes): FeedState => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: [...action.payload],
        error: null,
      };
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    case SET_ERROR: {
      return {
        ...state,
        articles: null,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
