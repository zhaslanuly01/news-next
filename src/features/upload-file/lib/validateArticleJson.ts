import { FavoriteArticle } from "@/entities/favorite";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNullableString(value: unknown): value is string | null {
  return typeof value === "string" || value === null;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeNullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function makeFavoriteId(url: string) {
  return `fav_${encodeURIComponent(url)}`;
}

export function isFavoriteArticle(value: unknown): value is FavoriteArticle {
  if (!isObject(value)) return false;

  return (
    isString(value.id) &&
    isString(value.url) &&
    isString(value.title) &&
    isNullableString(value.description) &&
    isNullableString(value.content) &&
    isNullableString(value.author) &&
    isString(value.publishedAt) &&
    isNullableString(value.urlToImage) &&
    isString(value.sourceName)
  );
}

export function parseImportedFavoriteArticle(
  value: unknown
): FavoriteArticle | null {
  if (isFavoriteArticle(value)) {
    return value;
  }

  if (!isObject(value)) return null;

  const source = value.source;
  const sourceName =
    isObject(source) && isString(source.name) ? source.name : null;

  if (
    isString(value.url) &&
    isString(value.title) &&
    isString(value.publishedAt) &&
    isString(sourceName)
  ) {
    return {
      id: isString(value.id) ? value.id : makeFavoriteId(value.url),
      url: value.url,
      title: value.title,
      description: normalizeNullableString(value.description),
      content: normalizeNullableString(value.content),
      author: normalizeNullableString(value.author),
      publishedAt: value.publishedAt,
      urlToImage: normalizeNullableString(value.urlToImage),
      sourceName,
    };
  }

  return null;
}
