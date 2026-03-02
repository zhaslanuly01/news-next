export type NewsDetailsSource = "NewsList" | "Favorites";

export type NewsDetailsRouteArticle = {
  url: string;
  title: string;
  description?: string | null;
  content?: string | null;
  author?: string | null;
  publishedAt?: string;
  urlToImage?: string | null;
  source?: {
    id?: string | null;
    name?: string;
  };
};

export type RootTabParamList = {
  NewsList: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  NewsDetails: {
    article: NewsDetailsRouteArticle;
    from: NewsDetailsSource;
  };
};
