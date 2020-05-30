import { Article, Category } from "../../redux/reducers/ReducersTypes";

export type MapStateTypes = {
  loading: boolean;
  articles: null | Article[];
  error: null | string;
};

export type MapDispatchTypes = {
  requestArticles: (category?: Category, keyword?: string) => void;
};

export type PropsTypes = MapStateTypes & MapDispatchTypes 