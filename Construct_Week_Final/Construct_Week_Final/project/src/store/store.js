import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice.js';
import filtersReducer from './slices/filtersSlice.js';
import favoritesReducer from './slices/favoritesSlice.js';
import comparisonReducer from './slices/comparisonSlice.js';
import authReducer from './slices/authSlice.js';
import adminReducer from './slices/adminSlice.js';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
    comparison: comparisonReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});