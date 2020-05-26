import { IArticle, Category, Country } from "../../redux/reducers/types";

export type MapStateTypes = {
  loading: boolean;
  country: Country;
  articles: null | IArticle[];
  error: null | string;
};

export type MapDispatchTypes = {
  requestArticles: (category?: Category, keyword?: string) => void;
};

export type PropsTypes = MapStateTypes & MapDispatchTypes 