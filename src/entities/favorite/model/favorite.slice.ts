import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteArticle } from "./favorite.types";

type FavoritesState = {
  items: FavoriteArticle[];
  initialized: boolean;
};

const initialState: FavoritesState = {
  items: [],
  initialized: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<FavoriteArticle[]>) {
      state.items = action.payload;
      state.initialized = true;
    },
    addFavorite(state, action: PayloadAction<FavoriteArticle>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.unshift(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<FavoriteArticle>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.unshift(action.payload);
      }
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;

export type FavoriteSchema = {
  favorites: FavoritesState;
};
