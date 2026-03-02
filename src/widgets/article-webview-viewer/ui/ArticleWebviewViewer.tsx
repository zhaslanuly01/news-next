"use client";

import React, { useCallback, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

type Props = {
  url: string;
  onBack: () => void;
};

export function ArticleWebViewViewer({ url, onBack }: Props) {
  const [isLoadingWeb, setIsLoadingWeb] = useState(true);
  const [hasWebError, setHasWebError] = useState(false);

  const isValidHttpUrl = useMemo(() => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }, [url]);

  const handleLoadStart = useCallback(() => {
    setIsLoadingWeb(true);
    setHasWebError(false);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoadingWeb(false);
  }, []);

  const handleError = useCallback(() => {
    setHasWebError(true);
    setIsLoadingWeb(false);
  }, []);

  if (!isValidHttpUrl) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к статье
          </Button>
        </div>

        <Card className="rounded-xl">
          <CardContent className="flex min-h-[320px] items-center justify-center p-6">
            <div className="text-center">
              <p className="mb-2 text-sm font-semibold text-destructive">
                Некорректная ссылка статьи
              </p>
              <p className="break-all text-xs text-muted-foreground">{url}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к статье
        </Button>

        <Button type="button" variant="secondary" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Открыть в новой вкладке
          </a>
        </Button>
      </div>

      {/* Embedded viewer */}
      <Card className="relative overflow-hidden rounded-xl">
        <CardContent className="relative p-0">
          {isLoadingWeb && !hasWebError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/95">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-sm">Загрузка оригинала...</p>
              </div>
            </div>
          )}

          {hasWebError ? (
            <div className="flex min-h-[70vh] items-center justify-center p-6">
              <div className="max-w-md text-center">
                <p className="mb-2 text-sm font-semibold text-destructive">
                  Не удалось загрузить оригинальную статью
                </p>
                <p className="mb-4 break-all text-xs text-muted-foreground">
                  {url}
                </p>
                <Button asChild>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Открыть оригинал
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              src={url}
              title="Article preview"
              className="h-[75vh] w-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
