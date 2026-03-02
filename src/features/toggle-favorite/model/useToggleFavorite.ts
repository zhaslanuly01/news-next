import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Article } from "@/entities/article";
import { selectIsFavoriteByUrl, toggleFavorite } from "@/entities/favorite";
import { sendFavoriteAddedNotification } from "@/shared/lib/notifications";

export function useToggleFavoriteArticle(article: Article) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavoriteByUrl(article.url));

  const favoritePayload = useMemo(
    () => ({
      id: article.url,
      url: article.url,
      title: article.title ?? "Без названия",
      description: article.description ?? null,
      content: article.content ?? null,
      author: article.author ?? null,
      publishedAt: article.publishedAt ?? "",
      urlToImage: article.urlToImage ?? null,
      sourceName: article.source?.name ?? "Не указан",
    }),
    [article]
  );

  const toggle = useCallback(async () => {
    const wasFavorite = isFavorite;

    dispatch(toggleFavorite(favoritePayload));

    if (!wasFavorite) {
      try {
        await sendFavoriteAddedNotification(article.title || "Статья");
      } catch (e) {
        console.log("Notification error:", e);
      }
    }
  }, [article.title, dispatch, favoritePayload, isFavorite]);

  return {
    isFavorite,
    toggle,
  };
}
