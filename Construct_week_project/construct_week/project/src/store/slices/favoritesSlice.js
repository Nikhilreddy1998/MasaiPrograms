import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem('propertyFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
  } catch {
    // Handle storage error silently
  }
};

const initialState = {
  favorites: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const propertyId = action.payload;
      if (!state.favorites.includes(propertyId)) {
        state.favorites.push(propertyId);
        saveFavoritesToStorage(state.favorites);
      }
    },
    removeFromFavorites: (state, action) => {
      const propertyId = action.payload;
      state.favorites = state.favorites.filter(id => id !== propertyId);
      saveFavoritesToStorage(state.favorites);
    },
    clearFavorites: (state) => {
      state.favorites = [];
      saveFavoritesToStorage([]);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;