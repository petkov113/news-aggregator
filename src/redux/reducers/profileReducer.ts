import { ActionTypes } from '../actions/ActionsTypes';
import { ProfileState } from './ReducersTypes';
import {
  SET_COUNTRY,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../constants';

const initialState: ProfileState = {
  isAuth: false,
  userId: null,
  token: null,
  country: { name: 'USA', code: 'us' },
  loading: false,
};

export default (state = initialState, action: ActionTypes): ProfileState => {
  switch (action.type) {
    case SET_COUNTRY:
      return { ...state, country: action.country };
    case AUTH_SUCCESS:
      return { ...state, isAuth: true, userId: action.userId, token: action.token };
    case AUTH_LOGOUT:
      return { ...state, isAuth: false };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
