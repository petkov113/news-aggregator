import { ActionTypes } from './../actions/ActionTypes';
import { SavedState } from './ReducersTypes';
import {
  SHOW_LOADER,
  HIDE_LOADER,
  SUBSCRIBE,
  UNSUBSCRIBE,
  SAVE_ARTICLE,
  DELETE_ARTICLE,
} from '../constants';

const initialState: SavedState = {
  loading: false,
  savesArticles: null,
  error: null,
};

export default (state = initialState, action: ActionTypes): SavedState => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SUBSCRIBE:
      return { ...state, loading: false };
    case UNSUBSCRIBE:
      return { ...state, loading: false };
    case SAVE_ARTICLE:
      return { ...state, loading: false };
    case DELETE_ARTICLE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
