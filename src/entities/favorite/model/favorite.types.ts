export type FavoriteArticle = {
  id: string;
  url: string;
  title: string;
  description: string | null;
  content: string | null;
  author: string | null;
  publishedAt: string;
  urlToImage: string | null;
  sourceName: string;
};
