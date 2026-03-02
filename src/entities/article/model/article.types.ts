export type NewsSource = {
  id: string | null;
  name: string;
};

export type Article = {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type NewsApiResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: Article[];
  code?: string;
  message?: string;
};

export type GetTopHeadlinesParams = {
  country?: string;
  category?: string;
  q?: string;
  page?: number;
  pageSize?: number;
};

export type SearchEverythingParams = {
  q: string;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  page?: number;
  pageSize?: number;
  from?: string;
  to?: string;
  language?: string;
};
