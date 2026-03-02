import React from "react";
import { Star } from "lucide-react";

import { Article } from "@/entities/article";
import { Button } from "@/shared/ui/button";
import { useToggleFavoriteArticle } from "../model/useToggleFavorite";

type Props = {
  article: Article;
  className?: string;
};

export const ToggleFavoriteArticleButton = React.memo(
  function ToggleFavoriteArticleButton({ article, className }: Props) {
    const { isFavorite, toggle } = useToggleFavoriteArticle(article);

    return (
      <Button
        type="button"
        onClick={toggle}
        className={className}
        variant={isFavorite ? "secondary" : "default"}
      >
        <Star className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        {isFavorite ? "Удалить из избранного" : "В избранное"}
      </Button>
    );
  }
);
