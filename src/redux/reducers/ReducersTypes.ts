export type Category =
  | 'all'
  | 'business'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export type Theme = 'light' | 'dark'

  export type Country =
  | { name: 'USA'; code: 'us' }
  | { name: 'Russia'; code: 'ru' }
  | { name: 'Bulgaria'; code: 'bg' }
  | { name: 'Romania'; code: 'ro' }
  | { name: 'Austria'; code: 'au' }
  | { name: 'Great Britain'; code: 'gb' }
  | { name: 'Italy'; code: 'it' };

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

export type ProfileState = Readonly<{
  isAuth: boolean;
  userId: null | string;
  token: null | string;
  country: Country;
  theme: Theme;
  loading: boolean;
}>;
