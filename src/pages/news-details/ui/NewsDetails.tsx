"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Article } from "@/entities/article";
import { Page } from "@/shared/ui/Page";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { NewsDetailsActions } from "@/widgets/news-details-actions";
import { NewsDetailsContent } from "@/widgets/news-details-content";

type Props = {
  articleUrl: string | null | undefined;
};

const SELECTED_ARTICLE_KEY = "selected_news_article";

function readSelectedArticleFromSession(): Article | null {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(SELECTED_ARTICLE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Article;
  } catch {
    return null;
  }
}

export default function NewsDetailsPageView({ articleUrl }: Props) {
  const [storedArticle, setStoredArticle] = useState<Article | null>(null);

  useEffect(() => {
    const article = readSelectedArticleFromSession();
    console.log(article);
    setStoredArticle(article);
  }, []);

  const article = useMemo(() => {
    if (!articleUrl) return null;
    if (!storedArticle) return null;

    return storedArticle.url === articleUrl ? storedArticle : null;
  }, [storedArticle, articleUrl]);

  const formattedDate = useMemo(() => {
    if (!article?.publishedAt) return "Дата не указана";
    return new Date(article.publishedAt).toLocaleString();
  }, [article?.publishedAt]);

  if (!articleUrl) {
    return (
      <Page contentClassName="p-3">
        <div className="flex min-h-[50vh] items-center justify-center rounded-xl border bg-background p-4">
          <p className="text-center text-sm font-semibold text-destructive">
            Некорректный URL статьи
          </p>
        </div>
      </Page>
    );
  }

  if (!article) {
    return (
      <Page>
        <div className="mx-auto w-full max-w-3xl p-3">
          <div className="space-y-3 rounded-xl border bg-background p-4">
            <p className="text-sm text-muted-foreground">
              Статья не найдена в локальном кэше. Возможно, страница была
              открыта напрямую или после обновления.
            </p>

            <Button asChild className="h-11 w-full">
              <a href={articleUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Открыть оригинал статьи
              </a>
            </Button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="mx-auto w-full max-w-3xl p-3">
        <div className="space-y-3">
          <NewsDetailsActions article={article} />
          <NewsDetailsContent article={article} formattedDate={formattedDate} />

          <Card className="rounded-xl">
            <CardContent className="p-3">
              <Button asChild className="h-11 w-full">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="text-white"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Открыть оригинал статьи
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
}
