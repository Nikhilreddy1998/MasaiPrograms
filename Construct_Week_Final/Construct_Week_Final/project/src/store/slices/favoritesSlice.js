import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem('propertyFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

const loadUserFavoritesFromStorage = () => {
  try {
    const userFavorites = localStorage.getItem('userFavorites');
    return userFavorites ? JSON.parse(userFavorites) : {};
  } catch {
    return {};
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
  } catch {
    // Handle storage error silently
  }
};

const saveUserFavoritesToStorage = (userFavorites) => {
  try {
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
  } catch {
    // Handle storage error silently
  }
};

const initialState = {
  favorites: loadFavoritesFromStorage(),
  userFavorites: loadUserFavoritesFromStorage(), // { userId: [propertyIds] }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { propertyId, userId } = action.payload;
      
      // Add to current user's favorites
      if (!state.favorites.includes(propertyId)) {
        state.favorites.push(propertyId);
        saveFavoritesToStorage(state.favorites);
      }
      
      // Track user-specific favorites for admin view
      if (userId) {
        if (!state.userFavorites[userId]) {
          state.userFavorites[userId] = [];
        }
        if (!state.userFavorites[userId].includes(propertyId)) {
          state.userFavorites[userId].push(propertyId);
          saveUserFavoritesToStorage(state.userFavorites);
        }
      }
    },
    removeFromFavorites: (state, action) => {
      const { propertyId, userId } = action.payload;
      
      // Remove from current user's favorites
      state.favorites = state.favorites.filter(id => id !== propertyId);
      saveFavoritesToStorage(state.favorites);
      
      // Remove from user-specific favorites
      if (userId && state.userFavorites[userId]) {
        state.userFavorites[userId] = state.userFavorites[userId].filter(id => id !== propertyId);
        saveUserFavoritesToStorage(state.userFavorites);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
      saveFavoritesToStorage([]);
    },
    setUserFavorites: (state, action) => {
      const { userId, favorites } = action.payload;
      state.userFavorites[userId] = favorites;
      saveUserFavoritesToStorage(state.userFavorites);
    },
    loadUserFavoritesOnLogin: (state, action) => {
      const { userId, favorites } = action.payload;
      state.favorites = favorites || [];
      saveFavoritesToStorage(state.favorites);
    }
  },
});

export const { 
  addToFavorites, 
  removeFromFavorites, 
  clearFavorites, 
  setUserFavorites,
  loadUserFavoritesOnLogin 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;