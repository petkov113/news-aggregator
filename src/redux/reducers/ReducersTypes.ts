export type Category =
  | 'all'
  | 'business'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export type Country = 'ru' | 'bg' | 'us' | 'ro' | 'au' | 'bg';

export type APIResponseType = {
  articles: Article[];
  status: string;
  totalResults: number;
};

export type receivedArticle = {
  source: { id: null | string; name: string };
  title: string;
  url: string;
  urlToImage: string;
  description: string;
  publishedAt: string;
};

export type Article = {
  source: { id: null | string; name: string };
  title: string;
  url: string;
  urlToImage: string;
  description: string;
  publishedAt: string;
  id: string;
};

export type FeedState = Readonly<{
  loading: boolean;
  articles: null | Article[];
  error: null | string;
}>;

export type SavedState = Readonly<{
  loading: boolean;
  savesArticles: null | Article[];
  error: null | string;
}>;

export type AppState = Readonly<{
  isAuth: boolean;
  userId: null | string;
  country: Country;
  theme: 'light' | 'dark';
}>;
