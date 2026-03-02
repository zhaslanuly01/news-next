import Image from "next/image";

import { Article } from "@/entities/article";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useState } from "react";

type Props = {
  article: Article;
  formattedDate: string;
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

export function NewsDetailsContent({ article, formattedDate }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = isValidImageUrl(article.urlToImage) && !imageFailed;
  return (
    <div className="space-y-3">
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
      <h1 className="text-2xl font-bold leading-8 text-foreground">
        {article.title || "Без названия"}
      </h1>

      <Card className="rounded-xl">
        <CardContent className="space-y-1 p-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Источник:</span>{" "}
            {article.source?.name || "Не указан"}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Автор:</span>{" "}
            {article.author || "Не указан"}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Дата:</span>{" "}
            {formattedDate}
          </p>
        </CardContent>
      </Card>

      {!!article.description && (
        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Краткое описание</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm leading-6 text-foreground/90">
              {article.description}
            </p>
          </CardContent>
        </Card>
      )}

      {!!article.content && (
        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Полный текст</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="whitespace-pre-line text-sm leading-6 text-foreground/90">
              {article.content}
            </p>
          </CardContent>
        </Card>
      )}

      {!article.content && !!article.description && (
        <Card className="rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Текст статьи</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm leading-6 text-muted-foreground">
              Полный текст недоступен из API. Откройте оригинальную статью в
              браузере или во встроенном предпросмотре.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
