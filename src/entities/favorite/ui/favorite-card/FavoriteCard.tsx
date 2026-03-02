import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import Image from "next/image";
import React from "react";
import { FavoriteArticle } from "../../model/favorite.types";

type FavoriteCardProps = {
  article: FavoriteArticle;
  onOpen: (article: FavoriteArticle) => void;
  onRemove: (articleId: string) => void;
};

export const FavoriteCard = React.memo(function FavoriteCard({
  article,
  onOpen,
  onRemove,
}: FavoriteCardProps) {
  return (
    <Card className="overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md">
      <CardContent className="p-3 space-y-2">
        {!!article.urlToImage && (
          <div className="overflow-hidden rounded-md">
            <img
              src={article.urlToImage!}
              alt={article.title}
              className="h-[180px] w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <h3 className="text-base font-bold leading-5 text-foreground line-clamp-2">
          {article.title}
        </h3>

        {!!article.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.description}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <Button
            type="button"
            className="flex-1"
            onClick={() => onOpen(article)}
          >
            Открыть
          </Button>

          <Button
            type="button"
            variant="destructive"
            className="flex-1"
            onClick={() => onRemove(article.id)}
          >
            Удалить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
