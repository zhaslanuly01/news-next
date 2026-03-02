import React, { useCallback } from "react";
import { FileJson, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Article } from "@/entities/article";
import { Button } from "@/shared/ui/button";
import { useExportArticleJson } from "../model/useExportArticleJson";

type Props = {
  article: Article;
  className?: string;
};

export const ExportArticleJsonButton = React.memo(
  function ExportArticleJsonButton({ article, className }: Props) {
    const { exportJson, isLoading, error } = useExportArticleJson();

    const handlePress = useCallback(async () => {
      const uri = await exportJson(article);

      if (uri) {
        toast.success("JSON статьи сохранён");
        return;
      }

      toast.error(error || "Не удалось сохранить JSON");
    }, [article, error, exportJson]);

    return (
      <div className={className}>
        <Button
          type="button"
          onClick={handlePress}
          disabled={isLoading}
          variant="outline"
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Сохранение JSON...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FileJson className="h-4 w-4" />
              Скачать JSON статьи
            </span>
          )}
        </Button>

        {!!error && (
          <p className="mt-1.5 max-w-[260px] text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);
