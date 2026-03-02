"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Loader2, RefreshCw } from "lucide-react";

import { Article, NewsCard } from "@/entities/article";
import { useGetTopHeadlinesQuery } from "@/entities/article/api/articleApi";
import { Category, DateFilter } from "@/features/news-filters";
import { useDebounce } from "@/shared/lib/hooks";
import { sendLocalNewsNotification } from "@/shared/lib/notifications";
import { Button } from "@/shared/ui/button";
import { ErrorView, Loader, Page } from "@/shared/ui";
import { NewsFiltersPanel } from "@/widgets/news-filter-panel";

const PAGE_SIZE = 20;

export default function NewsListPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshingLocal, setIsRefreshingLocal] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const seenUrlsRef = useRef<Set<string>>(new Set());
  const isFirstLoadRef = useRef(true);
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadMoreLockedRef = useRef(false);

  const queryArgs = useMemo(
    () => ({
      country: "us" as const,
      pageSize: PAGE_SIZE,
      page,
      q: debouncedQuery || undefined,
      category,
    }),
    [page, debouncedQuery, category]
  );

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetTopHeadlinesQuery(queryArgs);

  const filteredArticles = useMemo(() => {
    if (dateFilter === "all") return articles;

    const now = new Date();
    const start = new Date();

    if (dateFilter === "today") {
      start.setHours(0, 0, 0, 0);
    }

    if (dateFilter === "7days") {
      start.setDate(now.getDate() - 7);
      start.setHours(0, 0, 0, 0);
    }

    return articles.filter((article) => {
      const publishedAt = new Date(article.publishedAt);
      return publishedAt >= start;
    });
  }, [articles, dateFilter]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshingLocal(true);
    setHasMore(true);
    isLoadMoreLockedRef.current = false;

    try {
      if (page === 1) {
        await refetch();
      } else {
        setPage(1);
      }
    } finally {
      if (page === 1) setIsRefreshingLocal(false);
    }
  }, [page, refetch]);

  const handleLoadMore = useCallback(() => {
    if (isLoadMoreLockedRef.current) return;

    if (
      isLoading ||
      isFetching ||
      isLoadingMore ||
      isRefreshingLocal ||
      !hasMore
    ) {
      return;
    }

    isLoadMoreLockedRef.current = true;
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  }, [hasMore, isFetching, isLoading, isLoadingMore, isRefreshingLocal]);

  const onPressArticle = useCallback(
    (article: Article) => {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          "selected_news_article",
          JSON.stringify(article)
        );
      }

      const id = encodeURIComponent(article.url);
      router.push(`/news/${id}`);
    },
    [router]
  );
  const handleGoToFavorites = useCallback(() => {
    router.push(`/favorites`);
  }, [router]);
  useEffect(() => {
    if (!data) return;

    const incoming = data.articles ?? [];

    setArticles((prev) => {
      if (page === 1) return incoming;

      const seen = new Set(prev.map((a) => a.url));
      const uniqueIncoming = incoming.filter((a) => !seen.has(a.url));

      return [...prev, ...uniqueIncoming];
    });

    const totalResults = data.totalResults ?? 0;
    setHasMore(page * PAGE_SIZE < totalResults);

    setIsLoadingMore(false);
    setIsRefreshingLocal(false);
    isLoadMoreLockedRef.current = false;
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
    setIsLoadingMore(false);
    isLoadMoreLockedRef.current = false;
  }, [debouncedQuery, category]);

  useEffect(() => {
    if (!data?.articles?.length) return;

    const incoming = data.articles;
    const newArticles = incoming.filter((a) => !seenUrlsRef.current.has(a.url));

    incoming.forEach((a) => seenUrlsRef.current.add(a.url));

    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }

    if (newArticles.length > 0) {
      sendLocalNewsNotification({
        title: "Новые новости",
        body:
          newArticles.length === 1
            ? `1 новая статья: ${newArticles[0].title}`
            : `${newArticles.length} новых статей доступны`,
      });
    }
  }, [data]);

  useEffect(() => {
    const target = loadMoreSentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [handleLoadMore]);

  if (isLoading && page === 1) return <Loader />;

  if (isError && articles.length === 0) {
    return (
      <Page contentClassName="p-3">
        <ErrorView message={`Не удалось загрузить новости`} />
        <div className="mt-3">
          <Button onClick={() => refetch()} className="w-full sm:w-auto">
            Повторить
          </Button>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="mx-auto w-full max-w-4xl">
        <NewsFiltersPanel
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
          category={category}
          onChangeCategory={setCategory}
          dateFilter={dateFilter}
          onChangeDateFilter={setDateFilter}
        />

        <div className="px-3 pb-5">
          <div className="mb-3 flex items-center justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshingLocal || (isFetching && page === 1)}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  isRefreshingLocal || (isFetching && page === 1)
                    ? "animate-spin"
                    : ""
                }`}
              />
              Обновить
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGoToFavorites}
            >
              Избранные статьи
            </Button>
          </div>

          {filteredArticles.length === 0 && !isLoading && !isFetching ? (
            <div className="flex items-center justify-center rounded-xl border bg-background px-4 py-10">
              <p className="text-sm text-muted-foreground">Нет новостей</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredArticles.map((item) => (
                <NewsCard
                  key={item.url}
                  article={item}
                  onPress={onPressArticle}
                />
              ))}
            </div>
          )}

          <div className="py-4">
            {isLoadingMore ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : !hasMore && filteredArticles.length > 0 ? (
              <p className="text-center text-xs text-muted-foreground">
                Больше новостей нет
              </p>
            ) : null}
          </div>

          <div ref={loadMoreSentinelRef} className="h-1 w-full" />
        </div>
      </div>
    </Page>
  );
}
