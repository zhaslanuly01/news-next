import { baseApi } from "@/shared/api/baseApi";
import { ENV } from "@/shared/config/env";
import {
  GetTopHeadlinesParams,
  NewsApiResponse,
  SearchEverythingParams,
} from "../model/article.types";

export const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<
      NewsApiResponse,
      GetTopHeadlinesParams | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams({
          apiKey: ENV.NEWS_API_KEY,
          country: params?.country ?? "us",
          page: String(params?.page ?? 1),
          pageSize: String(params?.pageSize ?? 20),
        });

        if (params?.category) queryParams.set("category", params.category);
        if (params?.q) queryParams.set("q", params.q);

        return `/top-headlines?${queryParams.toString()}`;
      },
      providesTags: ["Article"],
    }),

    searchEverything: builder.query<NewsApiResponse, SearchEverythingParams>({
      query: (params) => {
        const queryParams = new URLSearchParams({
          apiKey: ENV.NEWS_API_KEY,
          q: params.q,
          sortBy: params.sortBy ?? "publishedAt",
          page: String(params.page ?? 1),
          pageSize: String(params.pageSize ?? 20),
          language: params.language ?? "en",
        });

        if (params.from) queryParams.set("from", params.from);
        if (params.to) queryParams.set("to", params.to);

        return `/everything?${queryParams.toString()}`;
      },
      providesTags: ["Article"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTopHeadlinesQuery, useSearchEverythingQuery } = articleApi;
