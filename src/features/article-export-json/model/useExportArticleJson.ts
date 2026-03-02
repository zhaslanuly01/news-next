import { useState } from "react";
import { Article } from "@/entities/article";

export function useExportArticleJson() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportJson = async (article: Article) => {
    setError(null);
    setIsLoading(true);

    try {
      const safeTitle = (article.title || "article")
        .replace(/[^\wа-яА-Я-_]+/g, "_")
        .slice(0, 40);

      const json = JSON.stringify(article, null, 2);
      const blob = new Blob([json], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${safeTitle}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      return `${safeTitle}.json`;
    } catch (e: any) {
      setError(e?.message || "Не удалось сохранить JSON");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { exportJson, isLoading, error };
}
