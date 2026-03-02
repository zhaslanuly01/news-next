"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { NewsDetailsPage } from "@/pages/news-details";

export default function NewsDetailsRoutePage() {
  const params = useParams<{ id: string }>();

  const articleUrl = useMemo(() => {
    if (!params?.id) return null;
    try {
      return decodeURIComponent(params.id);
    } catch {
      return null;
    }
  }, [params?.id]);

  return <NewsDetailsPage articleUrl={articleUrl} />;
}
