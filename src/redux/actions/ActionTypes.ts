import { SET_ARTICLES, SET_ERROR, SHOW_LOADER, HIDE_LOADER } from "./constants";
import { IArticle } from "../reducers/types";


interface setArticles {
  type: typeof SET_ARTICLES;
  payload: IArticle[];
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

export type ActionTypes = setArticles | SetError | ShowLoader | HideLoader;
