import { NewsListPage } from "@/pages/news-list";

const PAGE_SIZE = 20;

type SearchParams = {
  q?: string;
  category?: string;
};

async function getTopHeadlinesServer(params: {
  page: number;
  pageSize: number;
  q?: string;
  category?: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  if (!apiKey) throw new Error("NEWS_API_KEY is not set");

  const url = new URL("https://newsapi.org/v2/top-headlines");
  url.searchParams.set("country", "us");
  url.searchParams.set("page", String(params.page));
  url.searchParams.set("pageSize", String(params.pageSize));

  if (params.q) url.searchParams.set("q", params.q);
  if (params.category) url.searchParams.set("category", params.category);

  const res = await fetch(url.toString(), {
    headers: { "X-Api-Key": apiKey },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`News API error: ${res.status}`);
  }

  return res.json();
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim() || undefined;
  const category = sp.category?.trim() || undefined;

  const data = await getTopHeadlinesServer({
    page: 1,
    pageSize: PAGE_SIZE,
    q,
    category,
  });

  return (
    <NewsListPage
      initialPage={1}
      initialArticles={data.articles ?? []}
      initialTotalResults={data.totalResults ?? 0}
      initialQuery={{
        q: q ?? "",
        category: category as any,
      }}
    />
  );
}
