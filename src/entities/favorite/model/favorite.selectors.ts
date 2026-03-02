import { FavoriteSchema } from "./favorite.slice";

export const selectFavorites = (state: FavoriteSchema) => state.favorites.items;

export const selectIsFavoriteByUrl = (url: string) => (state: FavoriteSchema) =>
  state.favorites.items.some((item) => item.url === url);
