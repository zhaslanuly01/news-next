import { FavoriteArticle } from "./favorite.types";

const FAVORITES_KEY = "favorite_articles_v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export async function loadFavoritesFromStorage(): Promise<FavoriteArticle[]> {
  try {
    if (!isBrowser()) return [];

    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as FavoriteArticle[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveFavoritesToStorage(items: FavoriteArticle[]) {
  try {
    if (!isBrowser()) return;

    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  } catch {
    // можно показать toast/log
  }
}
