import { ActionTypes } from './../actions/ActionTypes';
import { AppState } from './ReducersTypes';
import { SET_COUNTRY, LOGIN, LOGOUT, SET_THEME } from '../constants';

const initialState: AppState = {    
    isAuth: false,
    userId: null,
    country: 'us',
    theme: 'light'
}

export default (state = initialState, action: ActionTypes): AppState => {
    switch (action.type) {

    case SET_COUNTRY:
        return { ...state, country: action.country }
    case LOGIN:
        return { ...state, isAuth: true }
    case LOGOUT:
        return { ...state, isAuth: false }
    case SET_THEME:
        return { ...state, theme: action.theme }
    default:
        return state
    }
}
