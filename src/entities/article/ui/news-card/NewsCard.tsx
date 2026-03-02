"use client";

import { Article } from "@/entities/article";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";
import { memo, useMemo, useState } from "react";

type Props = {
  article: Article;
  onPress: (article: Article) => void;
  className?: string;
};

function isValidImageUrl(url?: string | null) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function NewsCardComponent({ article, onPress, className }: Props) {
  const [imageFailed, setImageFailed] = useState(false);

  const formattedDate = useMemo(() => {
    return new Date(article.publishedAt).toLocaleDateString();
  }, [article.publishedAt]);

  const showImage = isValidImageUrl(article.urlToImage) && !imageFailed;

  return (
    <button
      type="button"
      onClick={() => onPress(article)}
      className={cn("w-full text-left", className)}
    >
      <Card className="overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md">
        <CardContent className="p-3">
          {showImage ? (
            <div className="mb-2.5 overflow-hidden rounded-md bg-muted">
              <img
                src={article.urlToImage!}
                alt={article.title}
                className="h-[180px] w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
              />
            </div>
          ) : (
            <div className="mb-2.5 flex h-[180px] w-full items-center justify-center rounded-md bg-muted">
              <span className="text-xs font-semibold text-muted-foreground">
                Без изображения
              </span>
            </div>
          )}

          <h3 className="mb-1.5 line-clamp-2 text-base font-bold text-foreground">
            {article.title}
          </h3>

          {article.description ? (
            <p className="mb-2.5 line-clamp-2 text-sm leading-5 text-muted-foreground">
              {article.description}
            </p>
          ) : null}

          <div className="flex items-center justify-between gap-3">
            <span className="min-w-0 flex-1 truncate text-xs font-semibold text-foreground/80">
              {article.source.name}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

export const NewsCard = memo(NewsCardComponent);
