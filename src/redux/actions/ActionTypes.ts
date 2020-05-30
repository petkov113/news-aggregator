import { Country } from './../reducers/ReducersTypes';
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
  LOGIN,
  LOGOUT,
  SET_THEME,
} from '../constants';

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

interface Login {
  type: typeof LOGIN;
}

interface Logout {
  type: typeof LOGOUT;
}

interface SetTheme {
  type: typeof SET_THEME;
  theme: 'light' | 'dark';
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
  | Login
  | Logout
  | SetTheme;
