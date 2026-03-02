import { Article } from "@/entities/article";
import { ExportArticleJsonButton } from "@/features/article-export-json";
import { ToggleFavoriteArticleButton } from "@/features/toggle-favorite";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
  article: Article;
};

export function NewsDetailsActions({ article }: Props) {
  const router = useRouter();
  const handleGoToNewsList = useCallback(() => {
    router.push("/news-list");
  }, [router]);
  return (
    <Card className="rounded-xl">
      <CardContent className="p-3">
        <div className="overflow-x-auto">
          <div className="flex w-max gap-2">
            <Button
              type="button"
              onClick={handleGoToNewsList}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />К новостям
            </Button>

            <ToggleFavoriteArticleButton article={article} />

            <ExportArticleJsonButton article={article} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
