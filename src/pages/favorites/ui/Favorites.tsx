"use client";

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  FavoriteArticle,
  FavoriteCard,
  removeFavorite,
  selectFavorites,
} from "@/entities/favorite";
import { useLogout } from "@/features/logout";
import { FileUploadCard } from "@/features/upload-file";
import { Page } from "@/shared/ui/Page";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

export default function FavoritesPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const { logout } = useLogout();

  const onOpenFavorite = useCallback(
    (item: FavoriteArticle) => {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          "selected_news_article",
          JSON.stringify(item)
        );
      }

      const id = encodeURIComponent(item.url);
      router.push(`/news/${id}`);
    },
    [router]
  );

  const onRemoveFavorite = useCallback(
    (articleId: string) => {
      dispatch(removeFavorite(articleId));
    },
    [dispatch]
  );

  const handleGoToNewsList = useCallback(() => {
    router.push("/news-list");
  }, [router]);

  return (
    <Page contentClassName="px-3 py-3">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Избранные</h1>
            <p className="text-sm text-muted-foreground">
              Сохранённые статьи и загрузка файлов
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGoToNewsList}
              className="shrink-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />К новостям
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={logout}
              className="shrink-0"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>

        <Card className="mb-3 rounded-xl">
          <CardContent className="p-3">
            <FileUploadCard />
          </CardContent>
        </Card>

        {favorites.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center rounded-xl border bg-background p-6">
            <div className="text-center">
              <h2 className="mb-1 text-lg font-bold">Избранные</h2>
              <p className="text-sm text-muted-foreground">
                Пока нет сохранённых статей
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {favorites.map((item) => (
              <FavoriteCard
                key={item.id}
                article={item}
                onOpen={onOpenFavorite}
                onRemove={onRemoveFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
