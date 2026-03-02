export type {
  Article,
  GetTopHeadlinesParams,
  NewsApiResponse,
  NewsSource,
  SearchEverythingParams,
} from "./model/article.types";

export {
  useGetTopHeadlinesQuery,
  useSearchEverythingQuery,
} from "./api/articleApi";

export { NewsCard } from "./ui/news-card/NewsCard";
