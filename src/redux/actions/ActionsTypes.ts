import { Country } from '../reducers/ReducersTypes';
import { Article } from '../reducers/ReducersTypes';
import {
  SET_ARTICLES,
  SET_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  DELETE_ARTICLE,
  SAVE_ARTICLE,
  SUBSCRIBE,
  UNSUBSCRIBE,
  SET_COUNTRY,
  SET_THEME,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
} from '../constants';

export type AuthResponse = {
  data: {
    email: string,
    expiresIn: string,
    idToken: string,
    kind: string,
    localId: string,
    refreshToken: string
  },
  status: number,
  statusText: string
}

interface SetArticles {
  type: typeof SET_ARTICLES;
  payload: Article[];
}

interface SetError {
  type: typeof SET_ERROR;
  payload: string;
}

interface ShowLoader {
  type: typeof SHOW_LOADER;
}

interface HideLoader {
  type: typeof HIDE_LOADER;
}

interface DeleteArticle {
  type: typeof DELETE_ARTICLE;
  id: string;
}
interface SaveArticle {
  type: typeof SAVE_ARTICLE;
  payload: Article;
}

interface Subscribe {
  type: typeof SUBSCRIBE;
  name: string;
}

interface Unsubscribe {
  type: typeof UNSUBSCRIBE;
  name: string;
}

interface SetCountry {
  type: typeof SET_COUNTRY;
  country: Country;
}
interface SetTheme {
  type: typeof SET_THEME;
  theme: 'light' | 'dark';
}

interface AuthSucces {
  type: typeof AUTH_SUCCESS
  userId: string,
  token: string
}

interface Logout {
  type: typeof AUTH_LOGOUT
}

export type ActionTypes =
  | SetArticles
  | SetError
  | ShowLoader
  | HideLoader
  | DeleteArticle
  | SaveArticle
  | Subscribe
  | Unsubscribe
  | SetCountry
  | SetTheme
  | AuthSucces
  | Logout;