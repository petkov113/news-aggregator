export type Category =
  | "all"
  | "business"
  | "entertainment"
  | "health"
  | "science"
  | "sports"
  | "technology";

export type Country = "ru" | "bg" | "us" | "ro" | "au" | "bg";

export type APIResponseType = {
    articles: IArticle[]; 
    status: string; 
    totalResults: number
}

export interface IArticle {
  source: { id: null | string, name: string};
  title: string;
  url: string;
  urlToImage: string;
  description: string;
}

type FeedState = Readonly<{
  loading: boolean;
  country: Country;
  articles: null | IArticle[];
  error: null | string;
}>;

export type StateTypes = FeedState;
