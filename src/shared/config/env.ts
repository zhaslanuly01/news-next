export const ENV = {
  NEWS_API_BASE_URL:
    process.env.NEXT_PUBLIC_NEWS_API_BASE_URL || "https://newsapi.org/v2",
  NEWS_API_KEY: process.env.NEXT_PUBLIC_NEWS_API_KEY || "",
};

if (!ENV.NEWS_API_KEY) {
  console.warn(
    "[ENV] NEXT_PUBLIC_NEWS_API_KEY is missing. Add it to your .env file."
  );
}
